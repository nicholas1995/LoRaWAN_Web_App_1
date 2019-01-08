const lora_app_server = require("../services/API/lora_app_server");
const db_gateway_profile = require("../services/database/gateway_profile_db");
const compare = require("../services/compare");
const error = require("../services/errors");
const VError = require("verror");

function gateway_profiles_request_data(data, type) {
    let request;
    if (type == 0) {
        //get form
        request = {
            limit: 100
            //offset: null,
            //search: null
        };
    }/*  else if (type == 1) {
    //create form
    request = {
      organization: {
        canHaveGateways: data.can_have_gateways,
        displayName: `${data.display_name}`,
        name: `${data.network_name}`
      }
    };
  } else if (type == 2) {
    //Update form
    request = {
      organization: {
        canHaveGateways: data.can_have_gateways,
        displayName: `${data.display_name}`,
        name: `${data.network_name}`
      }
    };
  } */
    return request;
}


function convert_names_gateway_profiles(gateway_profiles) {
    let gateway_profiles_return = [];
    let gateway_profile = {
        created_at_time_stamp: null,
        gateway_profile_id_lora: null,
        gateway_profile_name: null,
        network_server_id: null,
        network_server_name: null,
        updated_at_time_stamp: null
    };
    for (let i = 0; i < gateway_profiles.length; i++) {
        gateway_profile.created_at_time_stamp = gateway_profiles[i].createdAt;
        gateway_profile.gateway_profile_id_lora = gateway_profiles[i].id;
        gateway_profile.gateway_profile_name = gateway_profiles[i].name;
        gateway_profile.network_server_id = gateway_profiles[i].networkServerID;
        gateway_profile.network_server_name = gateway_profiles[i].networkServerName;
        gateway_profile.updated_at_time_stamp = gateway_profiles[i].updatedAt;
        gateway_profiles_return[i] = gateway_profile;
        gateway_profile = {
            created_at_time_stamp: null,
            gateway_profile_id_lora: null,
            gateway_profile_name: null,
            network_server_id: null,
            network_server_name: null,
            updated_at_time_stamp: null
        };
    }
    return gateway_profiles_return;
}

function parse(gateway_profile_lora, gateway_profile_db) {
    try {
        for (let i = 0; i < gateway_profile_lora.length; i++) {
          for (let j = 0; j < gateway_profile_db.length; j++) {
              if (gateway_profile_lora[i].gateway_profile_id_lora == gateway_profile_db[j].gateway_profile_id_lora) {
                gateway_profile_lora[i]["gateway_profile_id"] = gateway_profile_db[j].gateway_profile_id;
              }
          }
        }
        return gateway_profile_lora;
    } catch (err) {
        throw new VError("%s", err.message);
    }
}

async function get_gateway_profiles(req) { //We fetch from the db twice because if after we compare one is added then we add it to the database and this new record will not be reflected
    //in the current version of gateway_profiles_db
    try {
        let request_body = gateway_profiles_request_data(null, 0);
        let gateway_profiles_lora = await lora_app_server.get_gateway_profiles(request_body)
            .catch(err => {
                //Error getting gateway profiles from lora app server
                throw new VError("%s", err.message);
            });
        gateway_profiles_lora = convert_names_gateway_profiles(gateway_profiles_lora.data.result);
        let gateway_profiles_db = await db_gateway_profile.get_gateway_profile()
            .catch(err => {
                //Error getting gateway profiles from database
                throw new VError("%s", err.message);
            })
        await compare.compare_gateway_profile(gateway_profiles_lora, gateway_profiles_db);
        gateway_profiles_db = await db_gateway_profile.get_gateway_profile()
            .catch(err => {
                //Error getting gateway profiles from database
                throw new VError("%s", err.message);
            })
        gateway_profiles_lora = parse(gateway_profiles_lora, gateway_profiles_db)
        return gateway_profiles_lora;
    } catch (err) {
        throw err;
        //Error getting gateway profiles from lora app server
    }
}
module.exports = {
    get: async function (req, res) {
        let gateway_profiles_lora;
        try {
            gateway_profiles_lora = await get_gateway_profiles(req)
                .catch(err => {
                    //Error getting gateway_profiles from lora app server
                    throw error.error_message("get gateway profiles", err.message);
                });
            res.status(200).send({ gateway_profiles_lora: gateway_profiles_lora, message: 'Gateway profiles fetched', type: 'success' });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Failed to get gateway profiles", type: 'error' });
        }
    }
}