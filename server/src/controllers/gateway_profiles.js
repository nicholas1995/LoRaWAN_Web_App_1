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
    } else if (type == 1) {
    //create form
    request = {
        gatewayProfile: {
            channels: data.gateway_profile_channels,
            extraChannels: data.gateway_profile_extra_channels,
            id: `${data.gateway_profile_id_lora}`,
            name: `${data.gateway_profile_name}`,
            networkServerID: `${data.network_server_id_lora}`,
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
  }
    return request;
}


function convert_names_gateway_profiles(gateway_profiles) {
    let gateway_profiles_return = [];
    let gateway_profile = {
        gateway_profile_created_at: null,
        gateway_profile_id_lora: null,
        gateway_profile_name: null,
        network_server_id: null,
        network_server_name: null,
        updated_at_time_stamp: null
    };
    for (let i = 0; i < gateway_profiles.length; i++) {
        gateway_profile.gateway_profile_created_at = gateway_profiles[i].createdAt;
        gateway_profile.gateway_profile_id_lora = gateway_profiles[i].id;
        gateway_profile.gateway_profile_name = gateway_profiles[i].name;
        gateway_profile.network_server_id = gateway_profiles[i].networkServerID;
        gateway_profile.network_server_name = gateway_profiles[i].networkServerName;
        gateway_profile.gateway_profile_updated_at = gateway_profiles[i].updatedAt;
        gateway_profiles_return[i] = gateway_profile;
        gateway_profile = {
            gateway_profile_created_at: null,
            gateway_profile_id_lora: null,
            gateway_profile_name: null,
            network_server_id: null,
            network_server_name: null,
            gateway_profile_updated_at: null
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

function create_gateway_profile_extra_channels(bandwidth, bitrate, frequency, modulation, spreding_factors){
//this takes in an array cooresponding to each of the attributes in the extra_channel array and creates an array of objects to be used for the apis
    let gateway_profile_extra_channel = [];
    let object_holder; // this is a object to create the template for the objects to go into the array
    let length = bandwidth.length;
    for(let i =0; i< length; i++){
        object_holder = {
            "bandwidth": bandwidth[i],
            "bitrate": bitrate[i],
            "frequency": frequency[i],
            "modulation": `${modulation[i]}`,
            "spreadingFactors": spreding_factors[i]
        }
        gateway_profile_extra_channel.push(object_holder);
        object_holder = null;
    }   
    return gateway_profile_extra_channel;
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
    },
    get_one_gateway_profile: async function (req, res) {
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
    create_gateway_profile: async function(req, res){
        console.log('hereeeeeee')
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
    update_gateway_profile: async function(req, res){
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
    delete_gateway_profile: async function (req, res) {
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