const network_db = require('./database/networks_db');
const sub_network_db = require('./database/sub_networks_db');
const devices_db = require("./database/devices_db");
const VESSEL_DB = require("../services/database/vessels_db");
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
                        if (lora[i].display_name != db[j].display_name) {
                            await network_db.update_network('display_name', lora[i].display_name, lora[i].network_id)
                                .catch(err => {
                                    let error = new VError("Update Network: display name : %s", err.message);
                                    throw error;
                                })
                            //console.log('Different display name');
                        }
                        if (lora[i].can_have_gateways != db[j].can_have_gateways) {
                            let value;
                            if (lora[i].can_have_gateways == true) {value = 1;}
                            else {value =0;}
                            await network_db.update_network('can_have_gateways', value, lora[i].network_id)
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
                network_db.create_network(lora[added_lora[k]].network_id, lora[added_lora[k]].network_name, lora[added_lora[k]].display_name, lora[added_lora[k]].can_have_gateways)
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
        let i;
        let accounted_for =[];
        let added_lora = [];
        try{
            for(i=0; i<lora.length; i++){
                let j;
                if(db.length ==0){
                    added_lora.push(i);
                    //console.log('Sub-Network Added');
                }
                for(j =0; j<db.length; j++){
                    if(lora[i].sub_network_id==db[j].id){
                        if(lora[i].sub_network_name==db[j].name){
                            accounted_for.push(j);
                            //console.log('Same Information');
                            break;
                        }else if(lora[i].sub_network_name!=db[j].name){
                            await sub_network_db.update('name', lora[i].sub_network_name, lora[i].sub_network_id)
                            .catch(err => {
                                throw error.error_message(`update: ID-${lora[i].sub_network_id}`, err.message);
                            })
                            accounted_for.push(j);
                            //console.log('Different name');
                            break;
                        }
                    } 
                    else if(j ==(db.length-1)){
                        added_lora.push(i);
                        //console.log('Sub-Network Added');
                    }else if(lora[i].sub_network_id!=db[j].id){
                    }
                }
            }
            let k;
            for(k =0; k< added_lora.length; k++){
                await sub_network_db.create_sub_network(lora[added_lora[k]].sub_network_id, lora[added_lora[k]].sub_network_name, lora[added_lora[k]].network_id)
                    .catch(err => {
                        throw error.error_message(`create: ID-${lora[added_lora[k]].sub_network_id}`, err.message);
                    })
                await VESSEL_DB.create_default_vessels(lora[added_lora[k]].sub_network_id)
                    .catch(err => {
                        throw error.error_message(`create: default vessel`, err.message);
                    });
                //console.log('Inserted Added Sub-Network');
            }
            let l;
            for(l=0; l<db.length; l++){
                let index = accounted_for.indexOf(l);
                if(index ==-1){
                    await sub_network_db.update('deleted', 1, db[l].id)
                        .catch(err => {
                            //Error deleting sub-network
                            throw error.error_message(`delete: ID-${db[l].id}`, err.message);
                        })
                    await VESSEL_CONTROLLER.delete_vessel_given_sub_network_id(db[l].id)
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
                        if (lora[i].device_name == db[j].device_name) {
                                accounted_for.push(j);
                                //console.log('Same Information');
                                break;
                        } else if (lora[i].device_name != db[j].device_name) {
                            devices_db.update('device_name', lora[i].device_name, lora[i].device_eui)
                            .catch(err => {
                                throw error.error_message(`update: ID-${lora[i].device_eui}`, err.message);
                            })
                            accounted_for.push(j);
                            //console.log('Different name');
                            break;
                        }
                    }
                    else if (j == (db.length - 1)) {
                        added_lora.push(i);
                        //console.log('Device Added');
                    } else if (lora[i].device_eui != db[j].device_eui) {
                    }
                }
            }
            for (let k = 0; k < added_lora.length; k++) {
                await devices_db.create(lora[added_lora[k]].device_eui, lora[added_lora[k]].device_name, lora[added_lora[k]].sub_network_id)
                    .catch(err => {
                        throw error.error_message(`create: ID-${lora[added_lora[k]].device_eui}`, err.message);
                    })
                devices_added.push(lora[added_lora[k]].device_eui)
                //console.log('Inserted Added Device');
            }
            for (let l = 0; l < db.length; l++) {
                let index = accounted_for.indexOf(l);
                if (index == -1) {
                    await devices_db.update('deleted', 1, db[l].device_eui)
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
    }
}