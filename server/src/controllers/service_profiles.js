const lora_app_server = require('../services/API/lora_app_server');
const db_service_profile = require("../services/database/service_profile_db");
const compare = require("../services/compare");
const VError = require("verror");

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
            "serviceProfile": {
                "name": data.service_profile_name,
                "organizationID": `${data.network_id}`,
                "networkServerID": `${data.network_server_id}`,
                "addGWMetaData": data.add_gw_metadata,
                "reportDevStatusBattery": data.report_device_status_battery,
                "reportDevStatusMargin": data.report_device_status_margin, 
                "nwkGeoLoc": data.network_geo_location,
                "devStatusReqFreq": data.device_status_req_frequency,
                "drMin": data.dr_min,
                "drMax": data.dr_max
            }
        }
    } else if (type == 2) {//Update form
        request = {
            "serviceProfile": {
                "name": data.service_profile_name,
                //"organizationID": `${data.network_id}`,
                //"networkServerID": `${data.network_server_id}`,
                "addGWMetaData": data.add_gw_metadata,
                "reportDevStatusBattery": data.report_device_status_battery,
                "reportDevStatusMargin": data.report_device_status_margin,
                "nwkGeoLoc": data.network_geo_location,
                "devStatusReqFreq": data.device_status_req_frequency,
                "drMin": data.dr_min,
                "drMax": data.dr_max
            }
        }
    }
    return request;
}

function convert_names_service_profiles(service_profiles) {
  let service_profiles_return = [];
  let service_profile = {
    service_profile_created_at: null,
    service_profile_id_lora: null,
    service_profile_name: null,
    network_server_id: null,
    network_id: null,
    service_profile_updated_at: null
  };
  for (let i = 0; i < service_profiles.length; i++) {
    service_profile.service_profile_created_at = service_profiles[i].createdAt;
    service_profile.service_profile_id_lora = service_profiles[i].id;
    service_profile.service_profile_name = service_profiles[i].name;
    service_profile.network_server_id = service_profiles[i].networkServerID;
    service_profile.network_id = service_profiles[i].organizationID;
    service_profile.service_profile_updated_at = service_profiles[i].updatedAt;
    service_profiles_return[i] = service_profile;
    service_profile = {
      service_profile_created_at: null,
      service_profile_id_lora: null,
      service_profile_name: null,
      network_server_id: null,
      network_id: null,
      service_profile_updated_at: null
    };
  }
  return service_profiles_return;
}  

function convert_names_service_profiles_single(service_profiles) {
  let service_profile = {
    service_profile_name: service_profiles.name,
    service_profile_id_lora: service_profiles.id,
    network_id: service_profiles.organizationID,
    network_server_id: service_profiles.networkServerID,
    add_gw_metadata: service_profiles.addGWMetaData,
    report_device_status_battery: service_profiles.reportDevStatusBattery,
    report_device_status_margin: service_profiles.reportDevStatusMargin,
    network_geo_location: service_profiles.nwkGeoLoc,
    device_status_req_frequency: service_profiles.devStatusReqFreq,
    dr_min: service_profiles.drMin,
    dr_max: service_profiles.drMax
  };
  return service_profile;
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
        throw new VError("%s", err.message);
    }
}

async function get_service_profiles(req) {
  //We fetch from the db twice because if after we compare one is added then we add it to the database and this new record will not be reflected
  //in the current version of service_profiles_db
  try {
    let request_body = service_profile_api_request_data(null, 0);
    let service_profiles_lora = await lora_app_server.get_service_profiles(request_body)
      .catch(err => {
        //Error getting service profiles from lora app server
          throw new VError("%s", err.message);
      });
    service_profiles_lora = convert_names_service_profiles(service_profiles_lora.data.result);
    let service_profiles_db = await db_service_profile.get_service_profile()
      .catch(err => {
        //Error getting service profiles from database
          throw new VError("%s", err.message);
      });
    await compare.compare_service_profile(service_profiles_lora, service_profiles_db);
    service_profiles_db = await db_service_profile.get_service_profile()
      .catch(err => {
        //Error getting service profiles from database
          throw new VError("%s", err.message);
      });
    service_profiles_lora = parse(service_profiles_lora, service_profiles_db);
    return service_profiles_lora;
  }catch (err) {
    throw err;
    //Error getting gateway profiles from lora app server
  }
}
function error_message(current_error_message, previous_error) {
    let error = new VError("%s : %s", current_error_message, previous_error);
    return error;
}

module.exports = {
    get: async function(req, res){
        try{
            let service_profiles = await get_service_profiles()
                .catch(err => {
                    //Error getting service profiles from the Lora App Server
                    throw error.error_message("get service-profiles : lora app server", err.message);
                })
            res.status(200).send({ service_profiles: service_profiles, message: 'Service Profiles fetched', type: 'success'});
        }catch(err) {
            console.log(err);
            //Error trying to request service profiles from lora app server
            res.status(500).send({ message: "Failed to get service profiles", type: 'error' });
        }
    },
    get_one_service_profile: async function (req, res) {
        try {
            let service_profiles = await lora_app_server.get_service_profile_one(req.params.service_profile_id_lora)
                .catch(err => {
                    //Error getting service profile from lora app server
                    throw new VError("%s", err.message);
                });
            service_profiles = convert_names_service_profiles_single(service_profiles.data.serviceProfile);
            res.status(200).send({ service_profiles: service_profiles, message: 'Service Profile fetched', type: 'success' });
        } catch (err) {
            console.log(err);
            //Error trying to request service profile from lora app server
            res.status(500).send({ message: "Failed to get service profile", type: 'error' });
        }
    },
    create_service_profile: async function(req, res){
        let error_location = null; //0=lora, 1=lora 2=db
        try {
            let data = req.body.service_profile;
            let request_body = service_profile_api_request_data(data, 1);
            let result = await lora_app_server.create_service_profiles(request_body)
                .catch(err => {
                    //error creating service profile on lora app server
                    error_location = 0;
                    throw error_message("create service profile : lora app server", err.message);
                });
            await db_service_profile.create_service_profile(result.data.id, data.service_profile_name, data.network_server_id, 'data.network_can_have_gateways')
                .catch(err => {
                    //error creating service_profile on db
                    error_location = 1;
                    throw error_message("create service profile : database", err.message);
                });
            res.status(201).send({ message: 'Service Profile created', type: 'success' });
        } catch (err) {
            //error_handler.error_logger(req, err);
            //e_l =0 (problem creating service profile on lora app server)
            //e_l =1 (problem creating service profile in database)
            //other = (unknown error/exception)
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to create service profile on LoRa App Server", type: 'error' });
            } else if (error_location == 1) {
                res.status(200).send({ message: "Failed to create service profile in Database", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    update_service_profile: async function(req, res){
        let error_location = null; //0=lora, 1=lora 2=db
        try {
            let data = req.body.service_profile;
            let request_body = service_profile_api_request_data(data, 2);
            let result = await lora_app_server.update_service_profiles(request_body, req.params.service_profile_id_lora)
                .catch(err => {
                    //error updating service profile on lora app server
                    error_location = 0;
                    throw error_message("update service profile : lora app server", err.message);
                });
            await db_service_profile.update_service_profile_all_parameters(data, req.params.service_profile_id_lora)
                .catch(err => {
                    //error updating service profile in database
                    error_location = 1;
                    throw error_message("update service profile : database", err.message);
                })
            res.status(200).send({ message: 'Service Profile updated', type: 'success' });
        } catch (err) {
            //error_handler.error_logger(req, err);
            //e_l =0 (problem updating service profile on lora app server)
            //e_l =2 (problem updating service profile on db)
            //other = (unknown error/exception)
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to update service profile", type: 'error' });
            } else if (error_location == 1) {
                res.status(200).send({message: "Failed to update service profile in database", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    delete_service_profile: async function (req, res) {
        let error_location = null; //0=lora, 1=lora 2=db
        let service_profiles;
        try {
            await lora_app_server.delete_service_profiles(req.params.service_profile_id_lora)
                .catch(err => {
                    //error deleting service_profile from lora app server
                    error_location = 0;
                    if (err.message == 'Request failed with status code 412'){
                        error_location = 1;
                    }
                    throw error_message("delete service profile : lora app server", err.message);
                });
            let request_body = service_profile_api_request_data(null, 0);
            service_profiles = await lora_app_server.get_service_profiles(request_body)
                .catch(err => {
                    //Error getting service profiles from lora app server
                    error_location = 2;
                    throw error_message("get service profile : lora app server", err.message);
                });
            service_profiles = convert_names_service_profiles(service_profiles.data.result);
            await db_service_profile.update_service_profile("service_profile_deleted", 1, req.params.service_profile_id_lora)
                .catch(err => {
                    //error updating deleted coloum from db
                    error_location = 3;
                    throw error_message("delete service profile : lora app server", err.message);
                });
            let service_profiles_db = await db_service_profile.get_service_profile()
                .catch(err => {
                    //Error getting service profiles from database
                    let error = new VError("%s", err.message);
                    throw error;
                });
            service_profiles = parse(service_profiles, service_profiles_db);
            res.status(200).send({ service_profiles: service_profiles, message: 'Service Profile deleted', type: 'success' });
        }catch(err){
            //e_l =0 (problem deleteing service profile)
            //e_l =1 (service profile deleted.. failed to fetch service profile)
            //e_l =2 (service profile deleted.. service profile fetched.. failed to delete service profile on db)
            //other = (unknown error/exception)
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to delete service profile", type: 'error' });
            } else if (error_location == 1) {
                res.status(412).send({ message: "Delete Sub-Network that uses Service Profile to be deleted", type: 'info' })
            }else if (error_location == 2) {
                res.status(200).send({ service_profiles: service_profiles, message: "Service Profile deleted. Failed to fetch service_profiles", type: 'info' })
            }
            else if (error_location == 3) {
                res.status(200).send({ service_profiles: service_profiles, message: "Service Profile deleted. Error updating service_profiles in database", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    }

}