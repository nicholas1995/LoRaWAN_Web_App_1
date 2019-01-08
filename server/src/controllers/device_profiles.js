const lora_app_server = require("../services/API/lora_app_server");
const db_device_profile = require("../services/database/device_profile_db");
const compare = require("../services/compare");
const error = require("../services/errors");
const VError = require("verror");

function device_profile_api_request_data(data, type) {
    let request;
    if (type == 0) {//get form 
        request = {
            limit: 100,
            //offset: null,
            //search: null
        }
    }
/*     else if (type == 1) {//create form
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
    } */
    return request;
}

function convert_names_device_profiles(device_profiles) {
    let device_profiles_return = [];
    let device_profile = {
        device_profile_created_at: null,
        device_profile_id_lora: null,
        device_profile_name: null,
        network_server_id: null,
        network_id: null,
        device_profile_updated_at: null
    };
    for (let i = 0; i < device_profiles.length; i++) {
        device_profile.device_profile_created_at = device_profiles[i].createdAt;
        device_profile.device_profile_id_lora = device_profiles[i].id;
        device_profile.device_profile_name = device_profiles[i].name;
        device_profile.network_server_id = device_profiles[i].networkServerID;
        device_profile.network_id = device_profiles[i].organizationID;
        device_profile.device_profile_updated_at = device_profiles[i].updatedAt;
        device_profiles_return[i] = device_profile;
        device_profile = {
            device_profile_created_at: null,
            device_profile_id_lora: null,
            device_profile_name: null,
            network_server_id: null,
            network_id: null,
            device_profile_updated_at: null
        };
    }
    return device_profiles_return;
}

function parse(device_profile_lora, device_profile_db) {
    try {
        for (let i = 0; i < device_profile_lora.length; i++) {
            for (let j = 0; j < device_profile_db.length; j++) {
                if (device_profile_lora[i].device_profile_id_lora == device_profile_db[j].device_profile_id_lora) {
                    device_profile_lora[i]["device_profile_id"] = device_profile_db[j].device_profile_id;
                }
            }
        }
        return device_profile_lora;
    } catch (err) {
        throw new VError("%s", err.message);
    }
}

async function get_device_profiles(req) { //We fetch from the db twice because if after we compare one is added then we add it to the database and this new record will not be reflected
    //in the current version of device_profiles_db
    try {
        let request_body = device_profile_api_request_data(null, 0);
        let device_profiles_lora = await lora_app_server.get_device_profiles(request_body)
            .catch(err => {
                //Error getting device profiles from lora app server
                throw new VError("%s", err.message);
            });
        device_profiles_lora = convert_names_device_profiles(device_profiles_lora.data.result);
        let device_profiles_db = await db_device_profile.get_device_profile()
            .catch(err => {
                //Error getting device profiles from database
                throw new VError("%s", err.message);
            })
        await compare.compare_device_profile(device_profiles_lora, device_profiles_db);
        device_profiles_db = await db_device_profile.get_device_profile()
            .catch(err => {
                //Error getting device profiles from database
                throw new VError("%s", err.message);
            })
        device_profiles_lora = parse(device_profiles_lora, device_profiles_db)
        return device_profiles_lora;
    } catch (err) {
        throw err;
        //Error getting device profiles from lora app server
    }
}

module.exports = {
    get: async function (req, res) {
        let device_profiles_lora;
        try {
            device_profiles_lora = await get_device_profiles(req)
                .catch(err => {
                    //Error getting device_profiles from lora app server
                    throw error.error_message("get device profiles", err.message);
                });
            res.status(200).send({ device_profiles_lora: device_profiles_lora, message: 'Device profiles fetched', type: 'success' });
        } catch (err) {
            //console.log(err);
            res.status(500).send({ message: "Failed to get device profiles", type: 'error' });
        }
    },
    get_specified_sub_network: async function (req, res) {//This fetches the device profiles from a particular sub-net and returns without comparing 
        try {
            let request_body = device_profile_api_request_data(null, 0);
            let device_profiles_lora = await lora_app_server.get_device_profiles_specified_sub_network(request_body, req.params.sub_network_id)
                .catch(err => {
                    //Error getting device profiles from lora app server
                    throw new VError("%s", err.message);
                });
            device_profiles_lora = convert_names_device_profiles(device_profiles_lora.data.result);
            let device_profiles_db = await db_device_profile.get_device_profile()
                .catch(err => {
                    //Error getting device profiles from database
                    throw new VError("%s", err.message);
                })
            device_profiles_lora = parse(device_profiles_lora, device_profiles_db)
            res.status(200).send({ device_profiles_lora: device_profiles_lora, message: 'Device profiles fetched', type: 'success' });
        } catch (err) {
            //console.log(err);
            res.status(500).send({ message: "Failed to get device profiles", type: 'error' });
        }
    }
}