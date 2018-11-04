const lora_app_server = require('../services/API/lora_app_server');

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
            created_at: null,
            service_profile_id: null,
            service_profile_name: null,
            network_server_id: null,
            network_id: null,
            updated_at: null,
         };
    for (let i = 0; i < service_profiles.length; i++) {
        service_profile.created_at = service_profiles[i].createdAt;
        service_profile.service_profile_id = service_profiles[i].id;
        service_profile.service_profile_name = service_profiles[i].name;
        service_profile.network_server_id = service_profiles[i].networkServerID;
        service_profile.network_id = service_profiles[i].organizationID;
        service_profile.updated_at = service_profiles[i].updatedAt;
        service_profiles_return[i] = service_profile;
        service_profile = {
            created_at: null,
            service_profile_id: null,
            service_profile_name: null,
            network_server_id: null,
            network_id: null,
            updated_at: null,
        };

    }
    return service_profiles_return;
}  
module.exports = {
    get: async function(req, res){
        try{
            let data_api = service_profile_api_request_data(null, 0);
            let service_profiles = await lora_app_server.get_service_profiles(data_api,req.params.network_id)
            .catch(err => {
                throw err;
                //Error getting service profiles from the Lora App Server
            })
            service_profiles= service_profiles.data.result;
            service_profiles = convert_names_service_profiles(service_profiles);
            service_profiles = JSON.stringify(service_profiles);
            res.status(200).send({service_profiles});
        }catch(err) {
            console.log(err);
            //Error trying to request service profiles from lora app server
        }
    }   

}