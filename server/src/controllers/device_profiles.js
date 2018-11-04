const lora_app_server = require("../services/API/lora_app_server");

function device_profile_api_request_data(data, type) {
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

function convert_names_device_profiles(device_profiles) {
    let device_profiles_return = [];
    let device_profile = {
        created_at: null,
        device_profile_id: null,
        device_profile_name: null,
        network_server_id: null,
        network_id: null,
        updated_at: null
    };
    for (let i = 0; i < device_profiles.length; i++) {
        device_profile.created_at = device_profiles[i].createdAt;
        device_profile.device_profile_id = device_profiles[i].id;
        device_profile.device_profile_name = device_profiles[i].name;
        device_profile.network_server_id = device_profiles[i].networkServerID;
        device_profile.network_id = device_profiles[i].organizationID;
        device_profile.updated_at = device_profiles[i].updatedAt;
        device_profiles_return[i] = device_profile;
        device_profile = {
            created_at: null,
            device_profile_id: null,
            device_profile_name: null,
            network_server_id: null,
            network_id: null,
            updated_at: null
        };
    }
    return device_profiles_return;
}


module.exports = {
    get: async function (req, res) {
        try {
            let request_params = device_profile_api_request_data(null, 0);
            let device_profiles = await lora_app_server.get_device_profiles(request_params, req.params.sub_network_id)
            .catch(err => {
                throw err;
            });
            device_profiles = convert_names_device_profiles(device_profiles.data.result);
            device_profiles = JSON.stringify(device_profiles);
            res.status(200).send({ device_profiles });
        } catch (err) {
            console.log(err)
            //Error trying to request service profiles from lora app server
        }
    }

}