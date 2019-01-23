const network_db = require('./database/networks_db');
const sub_network_db = require('./database/sub_networks_db');
const devices_db = require("./database/devices_db");
const VESSEL_DB = require("../services/database/vessels_db");
const DB_GATEWAY_PROFILE = require("../services/database/gateway_profile_db");
const service_profile_db = require("../services/database/service_profile_db");
const gateway_db = require("../services/database/gateway_db");
const device_profile_db = require("../services/database/device_profile_db");
const DB_VESSEL_DEVICE = require("./database/vessel_device_db");
const VESSEL_CONTROLLER = require('../controllers/vessels')

const VError = require("verror");
const error = require("./errors");


module.exports = {
    compare_networks: async function(lora, db){
        let accounted_for = [];
        let added_lora = []; 
        try{
            for(let i=0; i<lora.length; i++){
                if(db.length ==0){
                    added_lora.push(i);
                    //console.log('Network Added');
                }
                for(let j =0; j<db.length; j++){
                    if(lora[i].network_id==db[j].network_id){
                        if (lora[i].network_name != db[j].network_name) {
                            await network_db.update_network('network_name', lora[i].network_name, lora[i].network_id)
                                .catch(err => {
                                    let error = new VError("Update Network : name : %s", err.message);
                                    throw error;
                                })
                            //console.log('Different name');
                        }
                        if (lora[i].network_display_name != db[j].network_display_name) {
                            await network_db.update_network('network_display_name', lora[i].network_display_name, lora[i].network_id)
                                .catch(err => {
                                    let error = new VError("Update Network: display name : %s", err.message);
                                    throw error;
                                })
                            //console.log('Different display name');
                        }
                        if (lora[i].network_can_have_gateways != db[j].network_can_have_gateways) {
                            let value;
                            if (lora[i].network_can_have_gateways == true) {value = 1;}
                            else {value =0;}
                            await network_db.update_network('network_can_have_gateways', value, lora[i].network_id)
                                .catch(err => {
                                    let error = new VError("Update Network : can_have_gateways : %s", err.message);
                                    throw error;
                                })
                            //console.log('Different name');
                        }
                        accounted_for.push(j);
                        break;
                    }else if(j ==(db.length-1)){
                        added_lora.push(i);
                        //console.log('Network Added');
                    }else if(lora[i].network_id!=db[j].network_id){
                    }
                }  
            }
            for(let k =0; k< added_lora.length; k++){
                network_db.create_network(lora[added_lora[k]].network_id, lora[added_lora[k]].network_name, lora[added_lora[k]].network_display_name, lora[added_lora[k]].network_can_have_gateways)
                    .catch(err => {
                        let error = new VError('Insert Network: %s', err.message)
                        throw error;
                    })
            }
            for(let l=0; l<db.length; l++){
                let index = accounted_for.indexOf(l);
                if(index ==-1){
                    await network_db.update_network('network_deleted', 1, db[l].network_id)
                        .catch(err => {
                            let error = new VError("Update Network : deleted : %s", err.message);
                            throw error;
                        })
                }
            }
        }catch(err){
            let error = new VError(err, "Compare Networks");
            throw error;
        }
    }, 
    compare_sub_networks: async function(lora, db){
        let accounted_for =[];
        let added_lora = [];
        try{
            for(let i=0; i<lora.length; i++){
                if(db.length ==0){
                    added_lora.push(i);
                    //console.log('Sub-Network Added');
                }
                for(let j =0; j<db.length; j++){
                    if (lora[i].sub_network_id == db[j].sub_network_id){
                        if (lora[i].sub_network_name != db[j].sub_network_name) {
                            await sub_network_db.update('sub_network_name', lora[i].sub_network_name, lora[i].sub_network_id)
                                .catch(err => {
                                    throw error.error_message(`update: ID-${lora[i].sub_network_id}`, err.message);
                                })
                            //console.log('Different name');
                        } if (lora[i].sub_network_description != db[j].sub_network_description) {
                            await sub_network_db.update('sub_network_description', lora[i].sub_network_description, lora[i].sub_network_id)
                                .catch(err => {
                                    throw error.error_message(`update: ID-${lora[i].sub_network_id}`, err.message);
                                })
                            //console.log('Different name');
                        }
                        accounted_for.push(j);
                        break;
                    } else if(j ==(db.length-1)){
                        added_lora.push(i);
                        //console.log('Sub-Network Added');
                    } else if(lora[i].sub_network_id!=db[j].id){
                    }
                }
            } 
            for(let k =0; k< added_lora.length; k++){
                await sub_network_db.create_sub_network(lora[added_lora[k]].sub_network_id, lora[added_lora[k]].network_id, lora[added_lora[k]].service_profile_id,
                    lora[added_lora[k]].sub_network_name, lora[added_lora[k]].sub_network_description)
                    .catch(err => {
                        throw error.error_message(`create: ID-${lora[added_lora[k]].sub_network_id}`, err.message);
                    })
                await VESSEL_DB.create_default_vessels(lora[added_lora[k]].sub_network_id)
                    .catch(err => {
                        throw error.error_message(`create: default vessel`, err.message);
                    });
                //console.log('Inserted Added Sub-Network');
            }
            for(let l=0; l<db.length; l++){
                let index = accounted_for.indexOf(l);
                if(index ==-1){
                    //console.log('subnetwork deleted')
                    await sub_network_db.update('sub_network_deleted', 1, db[l].sub_network_id)
                        .catch(err => {
                            //Error deleting sub-network
                            throw error.error_message(`delete: ID-${db[l].id}`, err.message);
                        })
                    await VESSEL_CONTROLLER.delete_vessel_given_sub_network_id(db[l].sub_network_id)
                        .catch(err => {
                            //Error deleting vessels under selected subnetwork
                            throw error.error_message("delete sub-network : delete vessel ", err.message);
                        });
                    //console.log('Sub-Network Deleted');
                }
            }
        
        } catch (err) {
            throw error.error_message("compare", err.message);
        }
    },
    devices: async function (lora, db) {
        let accounted_for = [];
        let added_lora = [];
        let devices_added = [];
        try {
            for (let i = 0; i < lora.length; i++) {
                if (db.length == 0) {
                    added_lora.push(i);
                    //console.log('Device Added');
                }
                for (let j = 0; j < db.length; j++) {
                    if (lora[i].device_eui == db[j].device_eui) {
                        if (lora[i].device_name != db[j].device_name) {
                            devices_db.update('device_name', lora[i].device_name, lora[i].device_eui)
                                .catch(err => {
                                    throw error.error_message(`update: ID-${lora[i].device_eui}`, err.message);
                                })
                            //console.log('Different name');
                        } if (lora[i].device_profile_id_lora != db[j].device_profile_id_lora) {
                            devices_db.update('device_profile_id_lora', lora[i].device_profile_id_lora, lora[i].device_eui)
                                .catch(err => {
                                    throw error.error_message(`update: ID-${lora[i].device_eui}`, err.message);
                                })
                            //console.log('Different device profile id');
                        } if (lora[i].device_description != db[j].device_description) {
                            devices_db.update('device_description', lora[i].device_description, lora[i].device_eui)
                                .catch(err => {
                                    throw error.error_message(`update: ID-${lora[i].device_eui}`, err.message);
                                })
                            //console.log('Different description');
                        }
                        accounted_for.push(j);
                        break;
                    }
                    else if (j == (db.length - 1)) {
                        added_lora.push(i);
                        //console.log('Device Added');
                    } else if (lora[i].device_eui != db[j].device_eui) {
                    }
                }
            }
            for (let k = 0; k < added_lora.length; k++) {
                await devices_db.create(lora[added_lora[k]].sub_network_id, lora[added_lora[k]].device_profile_id, lora[added_lora[k]].device_eui,
                    lora[added_lora[k]].device_name, lora[added_lora[k]].device_description, lora[added_lora[k]].device_deleted)
                    .catch(err => {
                        throw error.error_message(`create: ID-${lora[added_lora[k]].device_eui}`, err.message);
                    })
                devices_added.push(lora[added_lora[k]].device_eui)
                //console.log('Inserted Added Device');
            }
            for (let l = 0; l < db.length; l++) {
                let index = accounted_for.indexOf(l);
                if (index == -1) {
                    await devices_db.update('device_deleted', 1, db[l].device_eui)
                        .catch(err => {
                            throw error.error_message(`delete: ID-${db[l].device_eui}`, err.message);
                        })
                    await DB_VESSEL_DEVICE.delete_given_deivce_eui(db[l].device_eui)
                        .catch(err => {
                            //Error deleting relationship between device and vessel from database
                            error_location = 3;
                            throw error.error_message("delete device : delete device vessel relationship: database", err.message);
                        });
                    console.log("Device deletd on lora app server. Device EUI: " + db[l].device_eui);
                }
            }
            return devices_added;

        } catch (err) {
            throw error.error_message("compare", err.message);
        }
    },
    compare_gateways: async function (lora, db) {
        let accounted_for = [];
        let added_lora = [];
        let gateway_added = [];
        try {
            for (let i = 0; i < lora.length; i++) {
                if (db.length == 0) {
                    added_lora.push(i);
                    //console.log('Gateway Added');
                }
                for (let j = 0; j < db.length; j++) {
                    if (lora[i].gateway_id_lora == db[j].gateway_id_lora) {
                        if (lora[i].gateway_name != db[j].gateway_name) {
                            gateway_db.update_gateway('gateway_name', lora[i].gateway_name, lora[i].gateway_id_lora)
                                .catch(err => {
                                    throw error.error_message(`update: ID-${lora[i].gateway_id_lora}`, err.message);
                                })
                            //console.log('Different name');
                        }
                        if (lora[i].gateway_description != db[j].gateway_description) {
                            gateway_db.update_gateway('gateway_description', lora[i].gateway_description, lora[i].gateway_id_lora)
                                .catch(err => {
                                    throw error.error_message(`update: ID-${lora[i].gateway_id_lora}`, err.message);
                                })
                            //console.log('Different description');
                        }
                        if (lora[i].network_server_id != db[j].network_server_id) {
                            gateway_db.update_gateway('network_server_id', lora[i].network_server_id, lora[i].gateway_id_lora)
                                .catch(err => {
                                    throw error.error_message(`update: ID-${lora[i].gateway_id_lora}`, err.message);
                                })
                            //console.log('Different network server');
                        }
                        accounted_for.push(j);
                        break;
                    }
                    else if (j == (db.length - 1)) {
                        added_lora.push(i);
                        //console.log('Gateway Added');
                    } else if (lora[i].gateway_id_lora != db[j].gateway_id_lora) {
                    }
                }
            }
            for (let k = 0; k < added_lora.length; k++) {
                await gateway_db.create_gateway(lora[added_lora[k]].network_id, lora[added_lora[k]].gateway_name, lora[added_lora[k]].gateway_id_lora,
                    lora[added_lora[k]].gateway_description, lora[added_lora[k]].network_server_id)
                    .catch(err => {
                        throw error.error_message(`create: ID-${lora[added_lora[k]].gateway_id_lora}`, err.message);
                    });
                gateway_added.push(lora[added_lora[k]].gateway_id_lora);
                //console.log('Inserted Added Gateway');
            }
            for (let l = 0; l < db.length; l++) {
                let index = accounted_for.indexOf(l);
                if (index == -1) {
                    await gateway_db.update_gateway('gateway_deleted', 1, db[l].gateway_id_lora)
                        .catch(err => {
                            throw error.error_message(`delete: ID-${db[l].gateway_id_lora}`, err.message);
                        })
                    //console.log("Gateway deletd on lora app server. Gateway ID Lora: " + db[l].gateway_id_lora);
                }
            }
        } catch (err) {
            throw error.error_message("compare", err.message);
        }
    },
    compare_gateway_profile: async function (lora, db) {
        let accounted_for = [];
        let added_lora = [];
        let gateway_profile_added = [];
        try {
            for (let i = 0; i < lora.length; i++) {
                if (db.length == 0) {
                    added_lora.push(i);
                    //console.log('Gateway Profile Added');
                }
                for (let j = 0; j < db.length; j++) {
                    if (lora[i].gateway_profile_id_lora == db[j].gateway_profile_id_lora) {
                        if (lora[i].gateway_profile_name != db[j].gateway_profile_name) {
                            DB_GATEWAY_PROFILE.update_gateway_profile('gateway_profile_name', lora[i].gateway_profile_name, lora[i].gateway_profile_id_lora)
                                .catch(err => {
                                    throw error.error_message(`update: ID-${lora[i].gateway_profile_id_lora}`, err.message);
                                })
                            //console.log('Different name');
                        } 
                        if (lora[i].gateway_profile_created_at != db[j].gateway_profile_created_at) {
                            //This is here because when I create a gateway profile I do not have the date returned by the lora app server that it was created at
                            //hence I create it with dummy data then route to /gateway_profile and there the data will be fetched and comared and the date created will be updated
                            DB_GATEWAY_PROFILE.update_gateway_profile('gateway_profile_created_at', lora[i].gateway_profile_created_at, lora[i].gateway_profile_id_lora)
                                .catch(err => {
                                    throw error.error_message(`update: ID-${lora[i].gateway_profile_id_lora}`, err.message);
                                })
                            //console.log('Update date after it is created because when ');
                        }
                        accounted_for.push(j);
                        break;
                    }
                    else if (j == (db.length - 1)) {
                        added_lora.push(i);
                        //console.log('Gateway Profile Added');
                    } else if (lora[i].gateway_profile_id_lora != db[j].gateway_profile_id_lora) {
                           }
                }
            }
            for (let k = 0; k < added_lora.length; k++) {
                await DB_GATEWAY_PROFILE.create_gateway_profile(lora[added_lora[k]].gateway_profile_id_lora, lora[added_lora[k]].gateway_profile_name, lora[added_lora[k]].network_server_id,
                    lora[added_lora[k]].gateway_profile_created_at)
                    .catch(err => {
                        throw error.error_message(`create: ID-${lora[added_lora[k]].gateway_profile_id_lora}`,err.message);
                  });
                gateway_profile_added.push(lora[added_lora[k]].gateway_profile_id_lora);
                //console.log('Inserted Added Gateway Profile');
            }
            for (let l = 0; l < db.length; l++) {
                let index = accounted_for.indexOf(l);
                if (index == -1) {
                    await DB_GATEWAY_PROFILE.update_gateway_profile('gateway_profile_deleted', 1, db[l].gateway_profile_id_lora)
                        .catch(err => {
                            throw error.error_message(`delete: ID-${db[l].gateway_profile_id_lora}`, err.message);
                        })
                    //console.log("Gateway Profile deletd on lora app server. Gateway Profile ID Lora: " + db[l].gateway_profile_id_lora);
                }
            }
        } catch (err) {
            throw error.error_message("compare", err.message);
        }
    },
    compare_service_profile: async function (lora, db) {
        let accounted_for = [];
        let added_lora = [];
        let service_profile_added = [];
        try {
            for (let i = 0; i < lora.length; i++) {
                if (db.length == 0) {
                    added_lora.push(i);
                    //console.log('Service Profile Added');
                }
                for (let j = 0; j < db.length; j++) {
                    if (lora[i].service_profile_id_lora == db[j].service_profile_id_lora) {
                        if (lora[i].service_profile_name != db[j].service_profile_name) {
                            service_profile_db.update_service_profile('service_profile_name', lora[i].service_profile_name, lora[i].service_profile_id_lora)
                                .catch(err => {
                                    throw error.error_message(`update: ID-${lora[i].service_profile_id_lora}`, err.message);
                                })
                            //console.log('Different name');
                        }
                        if (lora[i].service_profile_created_at != db[j].service_profile_created_at) {
                            //This is here because when I create a service profile I do not have the date returned by the lora app server that it was created at
                            //hence I create it with dummy data then route to /servie_profile and there the data will be fetched and comared and the date created will be updated
                            service_profile_db.update_service_profile('service_profile_created_at', lora[i].service_profile_created_at, lora[i].service_profile_id_lora)
                                .catch(err => {
                                    throw error.error_message(`update: ID-${lora[i].service_profile_id_lora}`, err.message);
                                })
                            //console.log('Update date after it is created because when ');
                        }
                        accounted_for.push(j);
                        break;
                    }
                    else if (j == (db.length - 1)) {
                        added_lora.push(i);
                        //console.log('Service Profile Added');
                    } else if (lora[i].service_profile_id_lora != db[j].service_profile_id_lora) { 
                    }
                }
            }
            for (let k = 0; k < added_lora.length; k++) {
                await service_profile_db.create_service_profile(lora[added_lora[k]].service_profile_id_lora, lora[added_lora[k]].service_profile_name, lora[added_lora[k]].network_server_id,
                    lora[added_lora[k]].service_profile_created_at)
                    .catch(err => {
                        throw error.error_message(`create: ID-${lora[added_lora[k]].service_profile_id_lora}`, err.message);
                    });
                service_profile_added.push(lora[added_lora[k]].service_profile_id_lora);
                //console.log('Inserted Added Service Profile');
            }
            for (let l = 0; l < db.length; l++) {
                let index = accounted_for.indexOf(l);
                if (index == -1) {
                    await service_profile_db.update_service_profile('service_profile_deleted', 1, db[l].service_profile_id_lora)
                        .catch(err => {
                            throw error.error_message(`delete: ID-${db[l].service_profile_id_lora}`, err.message);
                        })
                    //console.log("Service Profile deletd on lora app server. Service Profile ID Lora: " + db[l].service_profile_id_lora);
                }
            }
        } catch (err) {
            throw error.error_message("compare", err.message);
        }
    },
    compare_device_profile: async function (lora, db) {
        let accounted_for = [];
        let added_lora = [];
        let device_profile_added = [];
        try {
            for (let i = 0; i < lora.length; i++) {
                if (db.length == 0) {
                    added_lora.push(i);
                    //console.log('Device Profile Added');
                }
                for (let j = 0; j < db.length; j++) {
                    if (lora[i].device_profile_id_lora == db[j].device_profile_id_lora) {
                        if (lora[i].device_profile_name != db[j].device_profile_name) {
                            device_profile_db.update_device_profile('device_profile_name', lora[i].device_profile_name, lora[i].device_profile_id_lora)
                                .catch(err => {
                                    throw error.error_message(`update: ID-${lora[i].device_profile_id_lora}`, err.message);
                                })
                            //console.log('Different name');
                        } else if (lora[i].device_profile_created_at != db[j].device_profile_created_at) {
                            device_profile_db.update_device_profile('device_profile_created_at', lora[i].device_profile_created_at, lora[i].device_profile_id_lora)
                                .catch(err => {
                                    throw error.error_message(`update: ID-${lora[i].device_profile_id_lora}`, err.message);
                                })
                            //console.log('Update the date created at');
                        }
                        accounted_for.push(j);
                        break;
                    }
                    else if (j == (db.length - 1)) {
                        added_lora.push(i);
                        //console.log('Device Profile Added');
                    } else if (lora[i].device_profile_id_lora != db[j].device_profile_id_lora) {
                    }
                }
            }
            for (let k = 0; k < added_lora.length; k++) {
                await device_profile_db.create_device_profile(lora[added_lora[k]].network_id, lora[added_lora[k]].device_profile_id_lora, lora[added_lora[k]].device_profile_name, lora[added_lora[k]].network_server_id,
                    lora[added_lora[k]].device_profile_created_at)
                    .catch(err => {
                        throw error.error_message(`create: ID-${lora[added_lora[k]].device_profile_id_lora}`, err.message);
                    });
                device_profile_added.push(lora[added_lora[k]].device_profile_id_lora);
                //console.log('Inserted Added Device Profile');
            }
            for (let l = 0; l < db.length; l++) {
                let index = accounted_for.indexOf(l);
                if (index == -1) {
                    await device_profile_db.update_device_profile('device_profile_deleted', 1, db[l].device_profile_id_lora)
                        .catch(err => {
                            throw error.error_message(`delete: ID-${db[l].device_profile_id_lora}`, err.message);
                        })
                    //console.log("Device Profile deletd on lora app server. Device Profile ID Lora: " + db[l].device_profile_id_lora);
                }
            }
        } catch (err) {
            throw error.error_message("compare", err.message);
        }
    }
}