const lora_app_server = require("../services/API/lora_app_server");
const db = require("../services/database/devices_db");
const DB_VESSEL_DEVICE = require("../services/database/vessel_device_db");
const DB_VESSEL = require("../services/database/vessels_db");
const DB_DEVICE_UPLINK = require("../services/database/device_rx_db");
const compare = require("../services/compare");
const error = require("../services/errors");
const VError = require("verror");

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
                device: {
                    "name": `${data.device_name}`,
                    "devEUI": `${data.device_eui}`,
                    "description": `${data.device_description}`,
                    "applicationID": `${data.sub_network_id}`,
                    "deviceProfileID": `${data.device_profile_id_lora}`,
                    "skipFCntCheck": data.skip_frame_counter
                }
            }
        }else{
            request = {
                "device": {
                    "name": `${data.device_name}`,
                    "devEUI": `${data.device_eui}`,
                    "description": `${data.device_description}`,
                    "applicationID": `${data.sub_network_id }`,
                    "deviceProfileID": `${data.device_profile_id_lora}`,
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
                "description": `${data.device_description}`,
                "applicationID": `${data.sub_network_id}`,
                "deviceProfileID": `${data.device_profile_id_lora}`,
                "referenceAltitude": data.reference_altitude,
                "skipFCntCheck": data.skip_frame_counter
            }
        }
    } else if (type == 3) {//Device Activation form 
        request = {
            "deviceActivation": {
                "devEUI": `${data.device_eui}`,
                "devAddr": `${data.dev_addr}`,
                "appSKey": `${data.app_s_key}`,
                "nwkSEncKey": `${data.nwk_s_enc_key}`,
                "sNwkSIntKey": `${data.nwk_s_enc_key}`,
                "fNwkSIntKey": `${data.nwk_s_enc_key}`,
                "fCntUp": data.f_cnt_up,
                "nFCntDown": data.n_f_cnt_down
            }
        }
    }
    return request;
}

function convert_names_devices(devices) {
  let devices_return = [];
  let device = {
      sub_network_id: null,
      device_description: null,
      device_eui: null,
      device_profile_id_lora: null,
      device_profile_name: null,
      device_status_battery: null,
      device_status_battery_level: null,
      device_status_battery_level_unavailable: null,
      device_status_external_power_source: null,
      device_status_margin: null,
      last_seen_at: null,
      device_name: null,
      deleted: 0 //this is here so when we are editing the users who are fishers we will only be able to assign them to current devices
  };
    for (let i = 0; i < devices.length; i++) {
        device.sub_network_id = devices[i].applicationID;
        device.device_description = devices[i].description;
        device.device_eui = devices[i].devEUI;
        device.device_profile_id_lora = devices[i].deviceProfileID;
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
            device_description: null,
            device_eui: null,
            device_profile_id_lora: null,
            device_profile_name: null,
            device_status_battery: null,
            device_status_battery_level: null,
            device_status_battery_level_unavailable: null,
            device_status_external_power_source: null,
            device_status_margin: null,
            last_seen_at: null,
            device_name: null,
            deleted: 0
        };
  }
    return devices_return;
}

function convert_name_device_single(result) {
    let device = {
        sub_network_id: result.device.applicationID,
        device_description: result.device.description,
        device_eui: result.device.devEUI,
        device_profile_id_lora: result.device.deviceProfileID,
        device_name: result.device.name,
        reference_altitude: result.device.referenceAltitude,
        skip_frame_counter: result.device.skipFCntCheck,
        device_status_battery: result.deviceStatusBattery,
        device_status_margin: result.deviceStatusMargin,
        last_seen_at: result.lastSeenAt,
/*         device_accuracy: result.location.accuracy,
        device_altitude: result.location.altitude,
        device_latitude: result.location.latitude,
        device_longitude: result.location.longitude,
        device_location_source: result.location.source,     */    
    }
    return device;
}

function convert_names_device_activation(result) {
  let device_activation = {
      device_eui: result.deviceActivation.devEUI,
      dev_addr: result.deviceActivation.devAddr,
      app_s_key: result.deviceActivation.appSKey,
      nwk_s_enc_key: result.deviceActivation.nwkSEncKey,
      f_cnt_up: result.deviceActivation.fCntUp,
      n_f_cnt_down: result.deviceActivation.nFCntDown,
    /*      s_nwk_s_int_key: result.deviceActivation.sNwkSIntKey:,
            f_nwk_s_int_key: result.deviceActivation.fNwkSIntKey:,
            a_f_cnt_down: result.deviceActivation.aFCntDown:,     */
  };
    return device_activation;
}

async function get_devices(){
    try{
        let request_params = device_api_request_data(null, 0);
        let devices_lora = await lora_app_server.get_devices(request_params)
            .catch(err => {
                //Error getting devices from lora app server
                let error = new VError("%s", err.message);
                throw error;
            });
        devices_lora = convert_names_devices(devices_lora.data.result);
        return devices_lora;
    }catch(err){
        throw err;
    }
}
async function get_device_activation(device_eui) {
    try {
        let device_activation = await lora_app_server.get_devices_activation(device_eui)
            .catch(err => {
                //Error getting device activation from lora app server
                let error = new VError("%s", err.message);
                throw error;
            });
        device_activation = convert_names_device_activation(device_activation.data);
        return device_activation;
    } catch (err) {
        throw err;
    }
}

function parse_vessel_to_device_data(vessel_device, devices_lora, devices_db) {
    try {
        for (let i = 0; i < devices_lora.length; i++){
            for(let j = 0; j< devices_db.length; j++){
                if(devices_lora[i].device_eui == devices_db[j].device_eui){
                    devices_lora[i]["device_id"] = devices_db[j].device_id;
                }
            }
            if (vessel_device.length == 0){
                devices_lora[i]["vessel_id"] = "Null";
            }else{
                for (let j = 0; j < vessel_device.length; j++) {
                    if (devices_lora[i].device_eui == vessel_device[j].device_eui) {
                        devices_lora[i]["vessel_id"] = vessel_device[j].vessel_id;
                    break;
                  } else {
                        devices_lora[i]["vessel_id"] = "Null";
                  }
                }
            }
        }
        return devices_lora;
    } catch (err) {
        throw err;
    }
}
async function add_device_to_default_vessel(device_id, device_eui, sub_network_id){
    try{
        let default_vessel = await DB_VESSEL.get_default_vessel_specified_sub_network(sub_network_id)
            .catch(err => {
                //Error fetching the default vessel for a given sub_network
                throw error_message("get default vessel for sub-network : database", err.message);
            });
        await DB_VESSEL_DEVICE.create(device_id, device_eui, default_vessel[0].vessel_id)
            .catch(err => {
                //Error creating vessel device relationship 
                throw error_message("create vessel device relationship : database", err.message);
            });
        console.log("Device vessel relationship created. Default vessel");
    }catch(err){
        throw err;
    }
}
module.exports = {
    get: async function(req, res){
        let error_location = null; //0=lora, 1=db
        let devices_lora, vessel_device_relationships_db;
        try{
            devices_lora = await get_devices()
                .catch(err => {
                //Error getting devices from lora app server
                    error_location = 0;
                    throw error.error_message("get devices : lora app server", err.message);
                });
            //console.log("Devices fetched from the lora app server");
            let devices_db = await db.get_not_deleted()
                .catch(err => {
                    //error getting devices from db
                    error_location = 1;
                    throw error.error_message("get devices : database", err.message);
                });
            //console.log("Devices fetched from the database");
            let devices_added = await compare.devices(devices_lora, devices_db)
                .catch(err => {
                    //Error comparing devices
                    error_location = 1;
                    throw error.error_message("get devices : database", err.message);
                });
            if(devices_added.length > 0 ){
                devices_db = await db.get_not_deleted()
                    .catch(err => {
                        //error getting devices from db
                        error_location = 1;
                        throw error.error_message("get devices : database", err.message);
                    });
                for(let i = 0; i< devices_added.length; i++){
                    for(let j = 0; j< devices_db.length; j++){
                        if(devices_added[i] == devices_db[j].device_eui){
                            await add_device_to_default_vessel(`${devices_db[j].device_id}`, devices_db[j].device_eui, devices_db[j].sub_network_id)
                                .catch(err => {
                                    //Error adding devices created on lora app server to default vessel
                                    throw error.error_message("add device created on lora app server to default vessel", err.message);
                                });
                        }
                    }
                }
            }
            //console.log("Devices information on lora app sevrer and database compared");
            vessel_device_relationships_db = await DB_VESSEL_DEVICE.get_not_deleted()
                .catch(err => {
                    //Error getting vessel device relationships currently implemented
                    error_location = 2;
                    throw error.error_message("get devices : getting vessel devices relationships : database", err.message);
                })
            //console.log('Vessel deivce realtionships currently implemented fetched');
            devices_lora = parse_vessel_to_device_data(vessel_device_relationships_db, devices_lora, devices_db);
            //console.log("Vessel assigned to device parsed");
            res.status(200).send({ devices_lora: devices_lora, message: 'Devices fetched', type: 'success' });
        }catch(err){
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to get devices", type: 'error' });
            } else if (error_location == 1) {
                res.status(200).send({ devices_lora: devices_lora, message: "Error updating devices in database", type: 'info' })
            } else if (error_location == 2) {
                res.status(200).send({ devices_lora: devices_lora, message: "Error pasing vessel ID to deivce data", type: 'info' })
            }  else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    get_one: async function(req, res){
        try{
            let device = await lora_app_server.get_device_one(req.params.device_eui)
            .catch(err => {
                //Error getting device from lora app server
                throw error.error_message("get device : lora app server", err.message);
              }
            );
            device = convert_name_device_single(device.data);
            res.status(200).send({ device });
        }catch(err){
            console.log(err);
            res.status(500).send({ message: "Failed to get device", type: 'error' });
        }
    },
    get_database: async function(req, res){
        try{
            let vessels = req.params.vessels;
            let devices = await DB_VESSEL_DEVICE.get_all_given_vessels(vessels)
                .catch(err => {
                    //Error getting vessel device relationships currently implemented
                    error_location = 2;
                    throw error.error_message("get devices : getting vessel devices relationships : database",err.message);
                });
            res.status(200).send({ devices: devices, message: 'Devices fetched', type: 'success' });
        }catch(err){
            console.log(err);
            res.status(500).send({ message: "Failed to get device", type: 'error' });
        }
    },
    get_self: async function (req, res) {
        try {
            let user_vessel_info = JSON.parse(req.params.user_vessel_info);
             let devices = await DB_VESSEL_DEVICE.get_device_self(user_vessel_info) 
                .catch(err => {
                    //Error getting vessel device relationships currently implemented
                    error_location = 2; 
                    throw error.error_message("get devices : getting vessel devices relationships : database", err.message);
                });
            res.status(200).send({ devices: devices, message: 'Devices fetched', type: 'success' }); 
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Failed to get device", type: 'error' });
        }
    },
    get_map_initial: async function(req, res){
        //Get devices that are not deleted in the database ->
        //get the most recent device data for the devices not deleted
        let error_location = 0;
        try {
            let device_data = [];
            if(req.access == 'all'){
                let devices_db = await db.get()
                    .catch(err => {
                        //error getting devices from db
                        error_location = 0;
                        throw error.error_message("get devices : database", err.message);
                    });
                for(let i =0; i< devices_db.length; i++){
                    await DB_DEVICE_UPLINK.get_most_recent_specified_device(devices_db[i].device_id)
                    .then(result => {
                        if(result.length > 0){
                            device_data.push(result[0])
                        }
                    }).catch(err => {
                            //Error getting the most recent device uplink record
                            throw err;
                    });                    
                }
            }else if(req.access == 'self'){

            }
/*             let user_vessel_info = JSON.parse(req.params.user_vessel_info);
            let devices = await DB_VESSEL_DEVICE.get_device_self(user_vessel_info)
                .catch(err => {
                    //Error getting vessel device relationships currently implemented
                    error_location = 2;
                    throw error.error_message("get devices : getting vessel devices relationships : database", err.message);
                }); */
            res.status(200).send({ device_data: device_data, message: 'Devices fetched', type: 'success' });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Failed to get device", type: 'error' });
        }
    },
    get_map_refresh: async function(req, res){ 
        try{
            let device_data = await DB_DEVICE_UPLINK.get_most_recent_specified_device(req.params.device_id)
                .catch(err => {
                    //Error getting the most recent device uplink record
                    throw err;
                });
            res.status(200).send({ device_data: device_data, message: 'Devices data', type: 'success' }); 
        }catch(err){
            console.log(err)
        }
    },
    create: async function(req, res){
        let error_location = null; //0=lora, 1=lora 2=db
        let devices_lora;
        try{
            let data = req.body.device;
            let request_body = device_api_request_data(data, 1);
            await lora_app_server.create_devices(request_body)
                .catch(err => {
                    //Error creating device on lora app server
                    error_location = 0;
                    throw error.error_message("create device : lora app server", err.message);
                });
            //console.log('Device created on lora app server')
            await db.create(data.sub_network_id, data.device_profile_id_lora, data.device_eui, data.device_name, data.device_description)
                .catch(err => {
                    //Error creating device on database
                    error_location = 2;
                    throw error.error_message("create device : database", err.message);
                }); 
            //console.log('Device created in database')
            let device_added = await db.get_newest()
                .catch(err => {
                    //Error creating relationship between vessel and device
                    error_location = 3;
                    throw error.error_message("create device : vessel device relationship : database", err.message);
                });
            if(data.vessel_id){ //Device assigned to vessel 
                await DB_VESSEL_DEVICE.create(device_added[0].device_id, data.device_eui, data.vessel_id)
                    .catch(err => {
                        //Error creating relationship between vessel and device
                        error_location = 4;
                        throw error.error_message("create device : vessel device relationship : database", err.message);
                    });
                //console.log("Device vessel relationship created");
            }else{ //Device not assigned to vessel so it will be assigned to the default vessel
                await add_device_to_default_vessel(device_added[0].device_id, data.device_eui, data.sub_network_id)
                    .catch(err => {
                        //Error creating vessel device relationship 
                        throw error_message("create vessel device relationship : database", err.message);
                    });
            }
            res.status(201).send({ message: 'Device created', type: 'success' });
        }catch(err){
            console.log(err); 
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to create device", type: 'error' });
            } else if (error_location == 1) {
                res.status(201).send({ message: "Device created. Failed to fetch devices", type: 'info' })
            } else if (error_location == 2) {
                res.status(200).send({ message: "Device created. Error creating device in database", type: 'info' })
            } else if (error_location == 3) {
                res.status(200).send({ message: "Device created on lora app server and database. Error creating relationship between device and vessel", type: 'info' })
            } else if (error_location == 4) {
                res.status(200).send({ message: "Device created on lora app server and database. Error creating relationship between device and vessel", type: 'info' })
            } else if (error_location == 5) {
                res.status(200).send({ message: "Device created on lora app server and database. Error parsing vessel ID to device data", type: 'info' })
            }  else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    update: async function(req, res){
        let error_location = null; //0=lora, 1=lora 2=db
        try{
            let data = req.body.device;
            let request_data = device_api_request_data(data, 2);
            await lora_app_server.update_devices(request_data, req.params.device_eui)
                .catch(err => {
                    //Error updating device on lora app server 
                    error_location = 0;
                    throw error.error_message("update device : lora app server", err.message);
                });
            console.log('Device updated on lora app server');
            await DB_VESSEL_DEVICE.delete_given_deivce_eui(data.device_eui)
                .catch(err => {
                    //Error deleteing current relationship between that device and any previous vessel
                    error_location = 3;
                    throw error.error_message("create device : delete vessel device relationship : database", err.message);
                });
            //Relationship between device and any vessel deleted
            if (data.vessel_id) {
                console.log("Device vessel relationship exists");
                await DB_VESSEL_DEVICE.create(data.device_id, data.device_eui, data.vessel_id)
                    .catch(err => {
                        //Error creating relationship between vessel and device
                        error_location = 4;
                        throw error.error_message("create device : vessel device relationship : database", err.message);
                    });
                console.log("Device vessel relationship created");
            } else { //Device not assigned to vessel so it will be assigned to the default vessel
                await add_device_to_default_vessel(data.device_id, data.device_eui, data.sub_network_id)
                    .catch(err => {
                        //Error creating vessel device relationship 
                        throw error_message("create vessel device relationship : database", err.message);
                    });
            }
            await db.update_all_parameters(data, req.params.device_eui)
                .catch(err => {
                    //Error updating device record in the database
                    error_location = 2;
                    throw error.error_message("update device : database", err.message);   
                })
            res.status(201).send({ message: 'Device updated.', type: 'success' });
        }catch(err){
            console.log(err)
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to update device", type: 'error' });
            } else if (error_location == 1) {
                res.status(200).send({ message: "Device updated. Failed to fetch devices", type: 'info' })
            } else if (error_location == 2) {
                res.status(200).send({ message: "Device updated. Error updating device in database", type: 'info' })
            } else { 
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    delete: async function(req, res){
        let error_location = null; //0=lora, 1=lora 2=db
        let devices_lora;
        try{
            await lora_app_server.delete_devices(req.params.device_eui)
                .catch(err => {
                    //Error delete device form lora app server
                    error_location = 0;
                    throw error.error_message("delete device : lora app server", err.message);
                });
            //console.log('Device deleted from lora app server. Device_EUI: ' + req.params.device_eui)
            devices_lora = await get_devices()
                .catch(err => {
                    //Error getting devices from lora app server
                    error_location = 1;
                    throw error.error_message("delete device : lora app server", err.message);
                });
            //console.log('Devices fetched from lora app server')
            await db.update('device_deleted',1,req.params.device_eui)
                .catch(err => {
                    //Error deleting device from database
                    error_location = 2;
                    throw error.error_message("delete device : database", err.message);
                });
            //console.log("Device deleted parameter set high in database. Device_EUI: " + req.params.device_eui);
            await DB_VESSEL_DEVICE.delete_given_deivce_eui(req.params.device_eui)
                .catch(err => {
                    //Error deleting relationship between device and vessel from database
                    error_location = 3;
                    throw error.error_message("delete device : delete device vessel relationship: database", err.message);
                });
            //console.log("Device vessel relationship deleted parameter set high in database. Device_EUI: " + req.params.device_eui);
            vessel_device_relationships_db = await DB_VESSEL_DEVICE.get_not_deleted()
                .catch(err => {
                    //Error getting vessel device relationships that are not deleted
                    error_location = 4;
                    throw error.error_message("get devices : getting vessel devices relationships :database", err.message);
                })
            //console.log('Vessel deivce realtionships currently implemented fetched');
            let devices_db = await db.get_not_deleted()
                .catch(err => {
                    //error getting devices from db
                    error_location = 5;
                    throw error.error_message("get devices : database", err.message);
                });
            //console.log('Devices fetched from database')
            devices_lora = parse_vessel_to_device_data(vessel_device_relationships_db, devices_lora, devices_db);
            //console.log("Vessel ID parsed to device data");
            res.status(200).send({ devices_lora: devices_lora, message: 'Device deleted.', type: 'success' });
        }catch(err){
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to delete device", type: 'error' });
            } else if (error_location == 1) {
                res.status(200).send({ devices_lora: devices_lora, message: "Device deleted. Failed to fetch devices", type: 'info' })
            } else if (error_location == 2) {
                res.status(200).send({ devices_lora: devices_lora, message: "Device deleted. Error deleting device in database", type: 'info' })
            } else if (error_location == 3) {
                res.status(200).send({ devices_lora: devices_lora, message: "Device deleted. Error deleting device vessel relationship in database", type: 'info' })
            } else if (error_location == 4) {
                res.status(200).send({ devices_lora: devices_lora, message: "Device deleted. Error parsing vessel ID to device data", type: 'info' })
            } else if (error_location == 5) {
                res.status(200).send({ devices_lora: devices_lora, message: "Device deleted. Error parsing vessel ID to device data", type: 'info' })
            }  else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    get_devices_activation: async function (req, res){
        try{
            if(req.user.user_class == "IoT Network Admin"){
                let device_activation = await get_device_activation(req.params.device_eui)
                    .catch(
                        err => {
                            //Error getting device activation from lora app server
                            throw error.error_message("get device activation : lora app server", err.message);
                        });
                res.status(200).send({ device_activation: device_activation, message: 'Device Activation fetched.', type: 'success' });
            }else{
                res.status(403).send({ error: "Forbidden" });
            }
        }catch(err){
            console.log(err);
        }


    },
    create_devices_activation: async function (req, res) {
        try{
            if (req.user.user_class == "IoT Network Admin") {
                let data = req.body.device_activation;
                let request_data = device_api_request_data(data, 3);
                await lora_app_server.create_devices_activation(request_data, req.params.device_eui)
                    .catch(err => {
                        //Error creating device activation on lora app server
                        throw error.error_message("create device activation : lora app server", err.message);
                    })
                res.status(200).send({ message: 'Device activated.', type: 'success' });
            } else {
                res.status(403).send({ error: "Forbidden" });
            }

        }catch(err){
            res.status(200).send({message: "Device activation failed.", type: 'error' })
        }
    },
    delete_devices_activation: async function (req, res) {
        try{
            res.status(501).send({ message: 'Function not implemented.', type: 'error' });
        }catch(err){
        }
    }
}