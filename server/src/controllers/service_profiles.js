const lora_app_server = require('../services/API/lora_app_server');
const db_service_profile = require("../services/database/service_profile_db");
const compare = require("../services/compare");

const error = require("../services/errors");

function service_profile_api_request_data(data, type) {
    let request;
    if (type == 0) {//get form 
        request = {
            limit: 100,
            //offset: null,
            //search: null
        }
    }
    else if (type == 1) {//create form
        request = {
            "organization": {
                "canHaveGateways": data.can_have_gateways,
                "displayName": `${data.display_name}`,
                "name": `${data.name}`
            }
        }
    } else if (type == 2) {//Update form
        request = {
            "organization": {
                "canHaveGateways": data.can_have_gateways,
                "displayName": `${data.display_name}`,
                "name": `${data.name}`
            }
        }
    }
    return request;
}

function convert_names_service_profiles(service_profiles) {
    let service_profiles_return = [];
    let service_profile = {
            created_at_time_stamp: null,
            service_profile_id_lora: null,
            service_profile_name: null,
            network_server_id: null,
            network_id: null,
            updated_at_time_stamp: null,
         };
    for (let i = 0; i < service_profiles.length; i++) {
        service_profile.created_at_time_stamp = service_profiles[i].createdAt;
        service_profile.service_profile_id_lora = service_profiles[i].id;
        service_profile.service_profile_name = service_profiles[i].name;
        service_profile.network_server_id = service_profiles[i].networkServerID;
        service_profile.network_id = service_profiles[i].organizationID;
        service_profile.updated_at_time_stamp = service_profiles[i].updatedAt;
        service_profiles_return[i] = service_profile;
        service_profile = {
            created_at_time_stamp: null,
            service_profile_id_lora: null,
            service_profile_name: null,
            network_server_id: null,
            network_id: null,
            updated_at_time_stamp: null,
        };

    }
    return service_profiles_return;
}  

function parse(service_profile_lora, service_profile_db) {
    try {
        for (let i = 0; i < service_profile_lora.length; i++) {
          for (let j = 0; j < service_profile_db.length; j++) {
              if (service_profile_lora[i].service_profile_id_lora == service_profile_db[j].service_profile_id_lora) {
                  service_profile_lora[i]["service_profile_id"] = service_profile_db[j].service_profile_id;
              }
          }
        }
        return service_profile_lora;
    } catch (err) {
        let error = new VError("%s", err.message);
        throw error;
    }
}

async function get_service_profiles(req) {
  //We fetch from the db twice because if after we compare one is added then we add it to the database and this new record will not be reflected
  //in the current version of service_profiles_db
  try {
    let request_body = service_profile_api_request_data(null, 0);
    let service_profiles_lora = await lora_app_server.get_service_profiles(request_body)
      .catch(err => {
        //Error getting gateway profiles from lora app server
        let error = new VError("%s", err.message);
        throw error;
      });
    service_profiles_lora = convert_names_service_profiles(service_profiles_lora.data.result);
    let service_profiles_db = await db_service_profile.get_service_profile()
      .catch(err => {
        //Error getting service profiles from database
        let error = new VError("%s", err.message);
        throw error;
      });
    await compare.compare_service_profile(service_profiles_lora, service_profiles_db);
    service_profiles_db = await db_service_profile.get_service_profile()
      .catch(err => {
        //Error getting service profiles from database
        let error = new VError("%s", err.message);
        throw error;
      });
    service_profiles_lora = parse(service_profiles_lora, service_profiles_db);
    return service_profiles_lora;
  }catch (err) {
    throw err;
    //Error getting gateway profiles from lora app server
  }
}

module.exports = {
    get: async function(req, res){
        try{
            let service_profiles = await get_service_profiles()
                .catch(err => {
                    //Error getting service profiles from the Lora App Server
                    throw error.error_message("get service-profiles : lora app server", err.message);
                })
            service_profiles = JSON.stringify(service_profiles);
            res.status(200).send({service_profiles});
        }catch(err) {
            console.log(err);
            //Error trying to request service profiles from lora app server
            res.status(500).send({ message: "Failed to get service profiles", type: 'error' });
        }
    }   

}