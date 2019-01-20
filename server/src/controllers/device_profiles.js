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
    else if (type == 1) {//create form
        request = {
            "deviceProfile": {
                "networkServerID": `${data.network_server_id}`,
                "organizationID": `${data.network_id}`,

                "name": `${data.device_profile_name}`, 
                "macVersion": `${data.mac_version}`, //LoRaWAN MAC version
                "regParamsRevision": `${data.reg_params_revision}`, //LoRaWAN Regional Parameters version
                "maxEIRP": data.max_eirp, //Max EIRP
                "supportsJoin": data.supports_join,
                "rxDelay1": data.rx_delay_1,
                "rxDROffset1": data.rx_dr_offset_1,
                "rxDataRate2": data.rx_dr_2,
                "rxFreq2": data.rx_frequency_2,
                "factoryPresetFreqs": data.factory_preset_frequencies,
                "supportsClassB": data.supports_class_b,
                "classBTimeout": data.class_b_timeout,
                "pingSlotPeriod": data.ping_slot_period,
                "pingSlotDR": data.ping_slot_dr,
                "pingSlotFreq": data.ping_slot_frequency,
                "supportsClassC": data.supports_class_c,
                "classCTimeout": data.class_c_timeout,
                //"maxDutyCycle": data.max_duty_cycle, NOT SUPPORTED BY LORA APP SERVER
                //"rfRegion": `${data.rf_region}`,  AUTOMTICALLY SET BY LORA APP SERVER
                //"supports32BitFCnt": data.supports_32_bit_fcnt,  NOT SUPPORTED BY LORA APP SERVER
            }
          
        }
    } else if (type == 2) {//Update form
        request = {
            "deviceProfile": {
                "networkServerID": `${data.network_server_id}`,
                "organizationID": `${data.network_id}`,

                "name": `${data.device_profile_name}`, 
                "macVersion": `${data.mac_version}`, //LoRaWAN MAC version
                "regParamsRevision": `${data.reg_params_revision}`, //LoRaWAN Regional Parameters version
                "maxEIRP": data.max_eirp, //Max EIRP
                "supportsJoin": data.supports_join,
                "rxDelay1": data.rx_delay_1,
                "rxDROffset1": data.rx_dr_offset_1,
                "rxDataRate2": data.rx_dr_2,
                "rxFreq2": data.rx_frequency_2,
                "factoryPresetFreqs": data.factory_preset_frequencies,
                "supportsClassB": data.supports_class_b,
                "classBTimeout": data.class_b_timeout,
                "pingSlotPeriod": data.ping_slot_period,
                "pingSlotDR": data.ping_slot_dr,
                "pingSlotFreq": data.ping_slot_frequency,
                "supportsClassC": data.supports_class_c,
                "classCTimeout": data.class_c_timeout,
                //"maxDutyCycle": data.max_duty_cycle, NOT SUPPORTED BY LORA APP SERVER
                //"rfRegion": `${data.rf_region}`,  AUTOMTICALLY SET BY LORA APP SERVER
                //"supports32BitFCnt": data.supports_32_bit_fcnt,  NOT SUPPORTED BY LORA APP SERVER
            }
        }
    }
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

function convert_names_device_profiles_single(device_profile){
    let device_profile_return = {
        device_profile_name: device_profile.name,
        device_profile_id_lora: device_profile.id,
        network_id: device_profile.organizationID,
        network_server_id: device_profile.networkServerID,
        mac_version: device_profile.macVersion,
        reg_params_revision: device_profile.regParamsRevision,
        max_eirp: device_profile.maxEIRP,
        supports_join: device_profile.supportsJoin,
        rx_delay_1: device_profile.rxDelay1,
        rx_dr_offset_1: device_profile.rxDROffset1,
        rx_dr_2: device_profile.rxDataRate2,
        rx_frequency_2: device_profile.rxFreq2,
        factory_preset_frequencies: device_profile.factoryPresetFreqs,
        supports_class_b: device_profile.supportsClassB,
        class_b_timeout: device_profile.classBTimeout,
        ping_slot_period: device_profile.pingSlotPeriod,
        ping_slot_dr: device_profile.pingSlotDR,
        ping_slot_frequency: device_profile.pingSlotFreq,
        supports_class_c: device_profile.supportsClassC,
        class_c_timeout: device_profile.classCTimeout,
      };
      return device_profile_return;
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

function error_message(current_error_message, previous_error) { 
    let error = new VError("%s : %s", current_error_message, previous_error);
    return error;
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
    get_one: async function (req, res) {
        try {
            let device_profiles = await lora_app_server.get_device_profile_one(req.params.device_profile_id_lora)
                .catch(err => {
                    //Error getting device profile from lora app server
                    throw new VError("%s", err.message);
                });
            device_profiles = convert_names_device_profiles_single(device_profiles.data.deviceProfile);
            res.status(200).send({ device_profiles: device_profiles, message: 'Device Profile fetched', type: 'success' });
        } catch (err) {
            console.log(err);
            //Error trying to request device profile from lora app server
            res.status(500).send({ message: "Failed to get device profile", type: 'error' });
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
    },
    create_device_profile: async function(req,res){
        let error_location = null; //0=lora, 1=lora 2=db
        try{ //PING SLOT PERIOD NOT WORKING
            let data = req.body.device_profile;
            let request_body = device_profile_api_request_data(data, 1);
            let result = await lora_app_server.create_device_profiles(request_body)
                .catch(err => {
                    //error creating device profile on lora app server
                    error_location = 0;
                    throw error_message("create device profile : lora app server", err.message);
                });
            await db_device_profile.create_device_profile(data.network_id, result.data.id, data.device_profile_name, data.network_server_id,  'null')
                .catch(err => {
                    //error creating service_profile on db
                    error_location = 1;
                    throw error_message("create device profile : database", err.message);
                });
            res.status(201).send({ message: 'Device Profile created', type: 'success' });
        }catch(err){
            //error_handler.error_logger(req, err);
            //e_l =0 (problem creating device profile on lora app server)
            //e_l =1 (problem creating device profile in database)
            //other = (unknown error/exception)
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to create device profile on LoRa App Server", type: 'error' });
            } else if (error_location == 1) {
                res.status(200).send({ message: "Failed to create device profile in Database", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    update_device_profile: async function(req, res){
        let error_location = null; //0=lora, 1=lora 2=db
        try {
            let data = req.body.device_profile;
            let request_body = device_profile_api_request_data(data, 2);
            let result = await lora_app_server.update_device_profiles(request_body, req.params.device_profile_id_lora)
                .catch(err => {
                    //error updating device profile on lora app server
                    error_location = 0; 
                    throw error_message("update device profile : lora app server", err.message);
                });
            await db_device_profile.update_device_profile_all_parameters(data, req.params.device_profile_id_lora)
                .catch(err => {
                    //error updating device profile in database
                    error_location = 1;
                    throw error_message("update device profile : database", err.message);
                })
            res.status(200).send({ message: 'Device Profile updated', type: 'success' });
        } catch (err) {
            //error_handler.error_logger(req, err);
            //e_l =0 (problem updating device profile on lora app server)
            //e_l =2 (problem updating device profile on db)
            //other = (unknown error/exception)
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to update device profile", type: 'error' });
            } else if (error_location == 1) {
                res.status(200).send({message: "Failed to update device profile in database", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    delete_device_profile: async function(req, res){
        let error_location = null; //0=lora, 1=lora 2=db
        let device_profiles;
        try {
            await lora_app_server.delete_device_profiles(req.params.device_profile_id_lora)
                .catch(err => {
                    //error deleting device_profile from lora app server
                    error_location = 0;
                    throw error_message("delete device profile : lora app server", err.message);
                });
            let request_body = device_profile_api_request_data(null, 0);
            device_profiles = await lora_app_server.get_device_profiles(request_body)
                .catch(err => {
                    //Error getting device profiles from lora app server
                    error_location = 1;
                    throw error_message("get device profile : lora app server", err.message);
                });
            device_profiles = convert_names_device_profiles(device_profiles.data.result);
            await db_device_profile.update_device_profile("device_profile_deleted", 1, req.params.device_profile_id_lora)
                .catch(err => {
                    //error updating deleted coloum from db
                    error_location = 2;
                    throw error_message("delete device profile : lora app server", err.message);
                });
            let device_profiles_db = await db_device_profile.get_device_profile()
                .catch(err => {
                    //Error getting device profiles from database
                    let error = new VError("%s", err.message);
                    throw error;
                });
            device_profiles = parse(device_profiles, device_profiles_db);
            res.status(200).send({ device_profiles: device_profiles, message: 'Device Profile deleted', type: 'success' });
        }catch(err){
            //e_l =0 (problem deleteing device profile)
            //e_l =1 (device profile deleted.. failed to fetch device profile)
            //e_l =2 (device profile deleted.. device profile fetched.. failed to delete device profile on db)
            //other = (unknown error/exception)
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to delete device profile", type: 'error' });
            }else if (error_location == 1) {
                res.status(200).send({ device_profiles: device_profiles, message: "Device Profile deleted. Failed to fetch device_profiles", type: 'info' })
            }
            else if (error_location == 2) {
                res.status(200).send({ device_profiles: device_profiles, message: "Device Profile deleted. Error updating device_profiles in database", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    }
}