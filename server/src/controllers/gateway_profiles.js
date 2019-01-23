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
        let extra_channels = create_gateway_profile_extra_channels(data.gateway_profile_bandwidth, data.gateway_profile_frequency, data.gateway_profile_modulation, data.gateway_profile_spreading_factors, data.gateway_profile_bit_rate)
        //create form
        request = {
            "gatewayProfile": {
                "channels": data.gateway_profile_channels,
                "extraChannels": extra_channels,
                "name": `${data.gateway_profile_name}`,
                "networkServerID": `${data.network_server_id_lora}`,
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

function convert_names_gateway_profiles_single(gateway_profile){
    let gateway_profile_return;
    if(gateway_profile.extraChannels.length > 0){
        gateway_profile_return = {
            gateway_profile_name: gateway_profile.name,
            gateway_profile_id_lora: gateway_profile.id,
            network_server_id_lora: gateway_profile.networkServerID,
            gateway_profile_channels: gateway_profile.channels,
            gateway_profile_modulation: gateway_profile.extraChannels[0].modulation,
            gateway_profile_bandwidth: gateway_profile.extraChannels[0].bandwidth,
            gateway_profile_frequency: gateway_profile.extraChannels[0].frequency,
            gateway_profile_spreading_factors: gateway_profile.extraChannels[0].spreadingFactors,
            gateway_profile_bit_rate: gateway_profile.extraChannels[0].bitrate,
          }; 
    }else{
        gateway_profile_return = {
            gateway_profile_name: gateway_profile.name,
            gateway_profile_id_lora: gateway_profile.id,
            network_server_id_lora: gateway_profile.networkServerID,
            gateway_profile_channels: gateway_profile.channels
        }
    }
      return gateway_profile_return;
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

function create_gateway_profile_extra_channels(bandwidth, frequency, modulation, spreding_factors, bit_rate){
//this takes in an array cooresponding to each of the attributes in the extra_channel array and creates an array of objects to be used for the apis
/*     let gateway_profile_extra_channel = [];
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
    return gateway_profile_extra_channel; */
    if(modulation == '0'){
        return []
    }else{
        if(modulation == "LORA"){
            let holder = {
                "bandwidth": bandwidth,
                "frequency": frequency,
                "modulation": `${modulation}`,
                "spreadingFactors": spreding_factors,
                "bitrate": 0
            };
            let array = [];
            array.push(holder)
            return array;
        }else if(modulation =="FSK"){
            let holder = {
                "bandwidth": bandwidth,
                "frequency": frequency,
                "modulation": `${modulation}`,
                "spreadingFactors": [],
                "bitrate": bit_rate,
            };
            let array = [];
            array.push(holder)
            return array;
        }
    }
}

function error_message(current_error_message, previous_error) { 
    let error = new VError("%s : %s", current_error_message, previous_error);
    return error;
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
            console.log(err);[0]
            res.status(500).send({ message: "Failed to get gateway profiles", type: 'error' });
        }
    },
    get_one_gateway_profile: async function (req, res) {
        try {
            let gateway_profiles = await lora_app_server.get_gateway_profile_one(req.params.gateway_profile_id_lora)
                .catch(err => {
                    //Error getting gateway profile from lora app server
                    throw new VError("%s", err.message);
                });
            gateway_profiles = convert_names_gateway_profiles_single(gateway_profiles.data.gatewayProfile);
            res.status(200).send({ gateway_profiles: gateway_profiles, message: 'Gateway Profile fetched', type: 'success' });
        } catch (err) {
            console.log(err);
            //Error trying to request gateway profile from lora app server
            res.status(500).send({ message: "Failed to get gateway profile", type: 'error' });
        }
    },
    create_gateway_profile: async function(req, res){
        let error_location = null; //0=lora, 1=lora 2=db
        try {
            let data = req.body.gateway_profile;
            let request_body = gateway_profiles_request_data(data, 1);
            let result = await lora_app_server.create_gateway_profiles(request_body)
                .catch(err => {
                    //error creating service profile on lora app server
                    error_location = 0;
                    throw error_message("create gateway profile : lora app server", err.message);
                });
            await db_gateway_profile.create_gateway_profile(result.data.id, data.gateway_profile_name, data.network_server_id_lora, 'data.network_can_have_gateways')
                .catch(err => {
                    //error creating gateway_profile on db
                    error_location = 1;
                    throw error_message("create gateway profile : database", err.message);
                });
            res.status(201).send({ message: 'Gateway Profile created', type: 'success' });
        } catch (err) {
            //error_handler.error_logger(req, err);
            //e_l =0 (problem creating service profile on lora app server)
            //e_l =1 (problem creating service profile in database)
            //other = (unknown error/exception)
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to create gateway profile on LoRa App Server", type: 'error' });
            } else if (error_location == 1) {
                res.status(200).send({ message: "Failed to create gateway profile in Database", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    update_gateway_profile: async function(req, res){
        let error_location = null; //0=lora, 1=lora 2=db
        try {
            let data = req.body.gateway_profile;
            let request_body = gateway_profiles_request_data(data, 1);
            let result = await lora_app_server.update_gateway_profiles(request_body, req.params.gateway_profile_id_lora)
                .catch(err => {
                    //error updating gateway profile on lora app server
                    error_location = 0;
                    throw error_message("update gateway profile : lora app server", err.message);
                });
            await db_gateway_profile.update_gateway_profile_all_parameters(data, req.params.gateway_profile_id_lora)
                .catch(err => {
                    //error updating gateway profile in database
                    error_location = 1;
                    throw error_message("update gateway profile : database", err.message);
                })
            res.status(200).send({ message: 'Gateway Profile updated', type: 'success' });
        } catch (err) {
            //error_handler.error_logger(req, err);
            //e_l =0 (problem updating gateway profile on lora app server)
            //e_l =2 (problem updating gateway profile on db)
            //other = (unknown error/exception)
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to update gateway profile", type: 'error' });
            } else if (error_location == 1) {
                res.status(200).send({message: "Failed to update gateway profile in database", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    delete_gateway_profile: async function (req, res) {
        let error_location = null; //0=lora, 1=lora 2=db
        let gateway_profiles_lora, gateway_profiles;
        try {
            await lora_app_server.delete_gateway_profiles(req.params.gateway_profile_id_lora)
                .catch(err => {
                    //error deleting gateway_profile from lora app server
                    error_location = 0;
                    throw error_message("delete gateway profile : lora app server", err.message);
                });
            let request_body = gateway_profiles_request_data(null, 0);
            gateway_profiles_lora = await lora_app_server.get_gateway_profiles(request_body)
                .catch(err => {
                    //Error getting gateway profiles from lora app server
                    error_location = 1;
                    throw error_message("get service profile : lora app server", err.message);
                });
            gateway_profiles_lora = convert_names_gateway_profiles(gateway_profiles_lora.data.result);
            await db_gateway_profile.update_gateway_profile("gateway_profile_deleted", 1, req.params.gateway_profile_id_lora)
                .catch(err => {
                    //error updating deleted coloum from db
                    error_location = 2;
                    throw error_message("delete gateway profile : lora app server", err.message);
                });
            let gateway_profiles_db = await db_gateway_profile.get_gateway_profile()
                .catch(err => {
                    //Error getting gateway profiles from database
                    let error = new VError("%s", err.message);
                    throw error;
                });
            gateway_profiles = parse(gateway_profiles_lora, gateway_profiles_db);
            res.status(200).send({ gateway_profiles: gateway_profiles, message: 'Gateway Profile deleted', type: 'success' });
        }catch(err){
            //e_l =0 (problem deleteing gateway profile)
            //e_l =1 (gateway profile deleted.. failed to fetch gateway profile)
            //e_l =2 (gateway profile deleted.. gateway profile fetched.. failed to delete gateway profile on db)
            //other = (unknown error/exception)
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to delete gateway profile", type: 'error' });
            }else if (error_location == 1) {
                res.status(200).send({ message: "Gateway Profile deleted. Failed to fetch gateway_profiles", type: 'info' })
            }
            else if (error_location == 2) {
                res.status(200).send({ gateway_profiles_lora: gateway_profiles_lora, message: "Gateway Profile deleted. Error updating gateway_profiles in database", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    }
}