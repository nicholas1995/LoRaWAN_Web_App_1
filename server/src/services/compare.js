const network_db = require('./database/networks_db');
const sub_network_db = require('./database/sub_networks_db');
const devices_db = require("./database/devices_db");
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
                    console.log('Network Added');
                }
                for(let j =0; j<db.length; j++){
                    if(lora[i].network_id==db[j].id){
                        if(lora[i].network_name==db[j].name){
                            if(lora[i].display_name==db[j].display_name){
                                accounted_for.push(j);
                                console.log('Same Information');
                                break;
                            }else if(lora[i].display_name!=db[j].display_name){
                                network_db.update_network('display_name', lora[i].display_name, lora[i].network_id)
                                .catch(err => {
                                    let error = new VError("Update Network: display name : %s", err.message);
                                    throw error;
                                })
                                accounted_for.push(j);
                                console.log('Different display name');
                                break;
                            }
                        }else if(lora[i].network_name!=db[j].name){
                            network_db.update_network('name', lora[i].network_name, lora[i].network_id).then(result => {
                            }).catch(err => {
                                let error = new VError("Update Network : name : %s", err.message);
                                throw error;
                            })
                            accounted_for.push(j);
                            console.log('Different name');
                            break;
                        }
                    }
                    else if(j ==(db.length-1)){
                        added_lora.push(i);
                        console.log('Network Added');
                    }else if(lora[i].network_id!=db[j].id){
                    }
                }  
            }
            let k;
            for(k =0; k< added_lora.length; k++){
                network_db.create_network(lora[added_lora[k]].network_id, lora[added_lora[k]].network_name, lora[added_lora[k]].display_name).then(result => {
                    console.log("Inserted Added Network");
                }).catch(err => {
                let error = new VError('Insert Network: %s', err.message)
                    throw error;
                })
            }
            let l;
            for(l=0; l<db.length; l++){
                let index = accounted_for.indexOf(l);
                if(index ==-1){
                    network_db.update_network('deleted', 1, db[l].id).then(result => {
                        console.log('Network Deleted');
                    }).catch(err => {
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
                    console.log('Sub-Network Added');
                }
                for(j =0; j<db.length; j++){
                    if(lora[i].sub_network_id==db[j].id){
                        if(lora[i].sub_network_name==db[j].name){
                            accounted_for.push(j);
                            console.log('Same Information');
                            break;
                        }else if(lora[i].sub_network_name!=db[j].name){
                            await sub_network_db.update('name', lora[i].sub_network_name, lora[i].sub_network_id)
                            .catch(err => {
                                throw error.error_message(`update: ID-${lora[i].sub_network_id}`, err.message);
                            })
                            accounted_for.push(j);
                            console.log('Different name');
                            break;
                        }
                    } 
                    else if(j ==(db.length-1)){
                        added_lora.push(i);
                        console.log('Sub-Network Added');
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
                console.log('Inserted Added Sub-Network');
            }
            let l;
            for(l=0; l<db.length; l++){
                let index = accounted_for.indexOf(l);
                if(index ==-1){
                    await sub_network_db.update('deleted', 1, db[l].id)
                    .catch(err => {
                        throw error.error_message(`delete: ID-${db[l].id}`, err.message);
                    })
                    console.log('Sub-Network Deleted');
                }
            }
        
        } catch (err) {
            throw error.error_message("compare", err.message);
        }
    },
    devices: async function (lora, db) {
        let accounted_for = [];
        let added_lora = [];
        try {
            for (let i = 0; i < lora.length; i++) {
                if (db.length == 0) {
                    added_lora.push(i);
                    console.log('Device Added');
                }
                for (let j = 0; j < db.length; j++) {
                    if (lora[i].device_eui == db[j].device_eui) {
                        if (lora[i].device_name == db[j].device_name) {
                                accounted_for.push(j);
                                console.log('Same Information');
                                break;
                        } else if (lora[i].device_name != db[j].device_name) {
                            devices_db.update('device_name', lora[i].device_name, lora[i].device_eui)
                            .catch(err => {
                                throw error.error_message(`update: ID-${lora[i].device_eui}`, err.message);
                            })
                            accounted_for.push(j);
                            console.log('Different name');
                            break;
                        }
                    }
                    else if (j == (db.length - 1)) {
                        added_lora.push(i);
                        console.log('Device Added');
                    } else if (lora[i].device_eui != db[j].device_eui) {
                    }
                }
            }
            for (let k = 0; k < added_lora.length; k++) {
                await devices_db.create(lora[added_lora[k]].device_eui, lora[added_lora[k]].device_name, lora[added_lora[k]].sub_network_id)
                    .catch(err => {
                        throw error.error_message(`create: ID-${lora[added_lora[k]].device_eui}`, err.message);
                    })
                console.log('Inserted Added Device');
            }
            for (let l = 0; l < db.length; l++) {
                let index = accounted_for.indexOf(l);
                if (index == -1) {
                    await devices_db.update('deleted', 1, db[l].device_eui)
                        .catch(err => {
                            throw error.error_message(`delete: ID-${db[l].device_eui}`, err.message);
                        })
                    console.log('Device Deleted');
                }
            }

        } catch (err) {
            throw error.error_message("compare", err.message);
        }
    }
}