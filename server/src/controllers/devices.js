const lora_app_server = require("../services/API/lora_app_server");
const db = require("../services/database/devices_db");
const compare = require("../services/compare");

function device_api_request_data(data, type) {
    let request;
    if (type == 0) {//get form 
        request = {
            limit: 100,
            //offset: null,
            //search: null
        }
    }
    else if (type == 1) {//create form
        if(data.reference_altitude ==""){
            request = {
                "device": {
                    "name": `${data.device_name}`,
                    "devEUI": `${data.device_eui}`,
                    "description": `${data.description}`,
                    "applicationID": `${data.sub_network_id}`,
                    "deviceProfileID": `${data.device_profile_id}`,
                    "skipFCntCheck": data.skip_frame_counter
                }
            }
        }else{
            request = {
                "device": {
                    "name": `${data.device_name}`,
                    "devEUI": `${data.device_eui}`,
                    "description": `${data.description}`,
                    "applicationID": `${data.sub_network_id }`,
                    "deviceProfileID": `${data.device_profile_id}`,
                    "referenceAltitude": data.reference_altitude,
                    "skipFCntCheck": data.skip_frame_counter
                }
            }
       }
    } else if (type == 2) {//Update form
        request = {
            "device": {
                "name": `${data.device_name}`,
                "devEUI": `${data.device_eui}`,
                "description": `${data.description}`,
                "applicationID": `${data.sub_network_id}`,
                "deviceProfileID": `${data.device_profile_id}`,
                "skipFCntCheck": data.skip_frame_counter
            }
        }
    }
    return request;
}

function convert_names_devices(devices) {
  let devices_return = [];
  let device = {
      sub_network_id: null,
      description: null,
      device_eui: null,
      device_profile_id: null,
      device_profile_name: null,
      device_status_battery: null,
      device_status_battery_level: null,
      device_status_battery_level_unavailable: null,
      device_status_external_power_source: null,
      device_status_margin: null,
      last_seen_at: null,
      device_name: null
  };
    for (let i = 0; i < devices.length; i++) {
        device.sub_network_id = devices[i].applicationID;
        device.description = devices[i].description;
        device.device_eui = devices[i].devEUI;
        device.device_profile_id = devices[i].deviceProfileID;
        device.device_profile_name = devices[i].deviceProfileName;
        device.device_status_battery = devices[i].deviceStatusBattery;
        device.device_status_battery_level = devices[i].deviceStatusBatteryLevel;
        device.device_status_battery_level_unavailable = devices[i].deviceStatusBatteryLevelUnavailable;
        device.device_status_external_power_source = devices[i].deviceStatusExternalPowerSource;
        device.device_status_margin = devices[i].deviceStatusMargin;
        device.last_seen_at = devices[i].lastSeenAt;
        device.device_name = devices[i].name;
        devices_return[i] = device;
        device = {
            sub_network_id: null,
            description: null,
            device_eui: null,
            device_profile_id: null,
            device_profile_name: null,
            device_status_battery: null,
            device_status_battery_level: null,
            device_status_battery_level_unavailable: null,
            device_status_external_power_source: null,
            device_status_margin: null,
            last_seen_at: null,
            device_name: null
        };
  }
    return devices_return;
}

async function get_devices(){
    try{
        let request_params = device_api_request_data(null, 0);
        let devices_lora = await lora_app_server.get_devices(request_params)
            .catch(err => {
                //Error getting devices from lora app server
                throw err;
            });
        devices_lora = convert_names_devices(devices_lora.data.result);
        return devices_lora;
    }catch(err){
        throw err;
    }
}
module.exports = {
    get: async function(req, res){
        try{
            let devices_lora = await get_devices()
            .catch(err => {
              throw err;
              //Error getting devices from lora app server
            });
            let devices_db = await db.get()
                .catch(err => {
                    throw {
                        err: err,
                        info: 'ERRRRROROROROROROOROR'
                    };
                });
            await compare.devices(devices_lora, devices_db)
                .catch(err => {
                    throw {
                        err: err,
                        info: 'ERRRRROROROROROROOROR'
                    };
                });
            devices_lora = JSON.stringify(devices_lora);
            res.status(200).send({devices_lora});
        }catch(err){
            console.log(err);
        }
    },
    create: async function(req, res){
        try{
            let data = JSON.parse(req.body.data);
            let request_body = device_api_request_data(data, 1);
            result = await lora_app_server.create_devices(request_body)
            .catch(err => {
                //Error creating device on lora app server
                throw err;
            });
            await db.create(data.device_eui, data.device_name, data.sub_network_id)
            .catch(err => {
                //Error creating device on database
                throw err;
            });
            let devices_lora = await get_devices()
                .catch(err => {
                    throw err;
                    //Error getting devices from lora app server
                });
            devices_lora = JSON.stringify(devices_lora);
            res.status(200).send({ devices_lora });
            
        }catch(err){
            console.log(err); 
        }
    },
    update: async function(req, res){
        try{
            let data = JSON.parse(req.body.data);
            let request_data = device_api_request_data(data, 2);
            let result = await lora_app_server.update_devices(request_data, req.params.device_eui)
            .catch(err => {
                throw err;
            })
            await db.update_networks_all_parameters(data, req.params.device_eui)
            .catch(err => {
                throw err;
            })
            let devices_lora = await get_devices()
            .catch(err => {
                throw err;
                //Error getting devices from lora app server
            });
            devices_lora = JSON.stringify(devices_lora);
            res.status(200).send({ devices_lora });
        }catch(err){
            console.log(err)
        }
    },
    delete: async function(req, res){
        try{
            let result = await lora_app_server.delete_devices(req.params.device_eui)
                .catch(err => {
                    throw err;
                    //Error delete subnetwork form lora app server
                });
            await db.update('deleted',1,req.params.device_eui)
                .catch(err => {
                    //Error deleting device from database
                    throw err;
                });
            let devices_lora = await get_devices()
                .catch(err => {
                    throw err;
                    //Error getting devices from lora app server
                });
            devices_lora = JSON.stringify(devices_lora);
            res.status(200).send({ devices_lora });
        }catch(err){
            console.log(err);
        }
    }
}