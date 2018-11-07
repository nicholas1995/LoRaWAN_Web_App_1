const lora_app_server = require("../services/API/lora_app_server");

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
        created_at: null,
        gateway_profile_id: null,
        gateway_profile_name: null,
        network_server_id: null,
        network_server_name: null,
        updated_at: null
    };
    for (let i = 0; i < gateway_profiles.length; i++) {
        gateway_profile.created_at = gateway_profiles[i].createdAt;
        gateway_profile.gateway_profile_id = gateway_profiles[i].id;
        gateway_profile.gateway_profile_name = gateway_profiles[i].name;
        gateway_profile.network_server_id = gateway_profiles[i].networkServerID;
        gateway_profile.network_server_name = gateway_profiles[i].networkServerName;
        gateway_profile.updated_at = gateway_profiles[i].updatedAt;
        gateway_profiles_return[i] = gateway_profile;
        gateway_profile = {
            created_at: null,
            gateway_profile_id: null,
            gateway_profile_name: null,
            network_server_id: null,
            network_server_name: null,
            updated_at: null
        };
    }
    return gateway_profiles_return;
}

async function get_gateway_profiles(req) {
    try {
        let request_body = gateway_profiles_request_data(null, 0);
        let gateway_profiles = await lora_app_server.get_gateway_profiles(request_body, req.params.network_server_id)
            .catch(err => {
                throw err;
                //Error getting gateway profiles from lora app server
            });
        gateway_profiles = convert_names_gateway_profiles(gateway_profiles.data.result);
        return gateway_profiles;
    } catch (err) {
        throw err;
        //Error getting gateway profiles from lora app server
    }
}
module.exports = {
    get: async function (req, res) {
        try {
            let gateway_profiles_lora = await get_gateway_profiles(req)
                .catch(err => {
                    throw err;
                    //Error getting gateway_profiles from lora app server
                });
            gateway_profiles_lora = JSON.stringify(gateway_profiles_lora);
            res.status(200).send({ gateway_profiles_lora });
        } catch (err) {
            console.log(err);
        }
    }
}