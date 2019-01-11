const DB = require('../services/database/vessels_db');
const DB_VESSEL_DEVICE = require("../services/database/vessel_device_db");
const DB_USER_VESSEL = require("../services/database/user_vessel_db");
const VError = require('verror');
const DEVICE_UPLINK_DB = require('../services/database/device_rx_db')


function error_message(current_error_message, previous_error){
    let error = new VError("%s : %s", current_error_message, previous_error);  
    return error;
}

async function add_device_to_default_vessel_when_vessel_deleted(vessel_id){
    try{
        let devices = await DB_VESSEL_DEVICE.get_not_deleted_given_vessel_id(vessel_id)
            .catch(err => {
                //Error fetching the devices from the vessel to be deleted from the vessel device table
                throw error_message("get devices : database", err.message);
            })
            for(let i = 0; i< devices.length; i++){
                await add_device_to_default_vessel(devices[i].device_id, devices[i].device_eui, devices[i].sub_network_id)
                    .catch(err => {
                        //Error adding device to the default vessel of a given subnetwork
                        throw error_message("reassing device to vessel", err.message);
                    });
            }
    }catch(err){
        console.log(err)
        throw err;
    }
}

async function add_device_to_default_vessel(device_id, device_eui, sub_network_id) {
    try {
        let default_vessel = await DB.get_default_vessel_specified_sub_network(sub_network_id)
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
    } catch (err) {
        throw err;
    }
}

module.exports = {
    get: async function(req, res) {
        //need to split up into two seperate fetches. One for self and another for all 
        let error_location = null; //1=db
        try{ 
            let vessels_db; 
            if (req.access == "all") {
                if (req.params.sub_network_id) {
                    if (req.params.deleted) {
                        //Sub-Network and Deleted specified
                        vessels_db = await DB.get_vessels(null, null, req.params.deleted, req.params.sub_network_id)
                            .catch(err => {
                                throw err;
                            });
                    } else { 
                        //Sub network specified
                        vessels_db = await DB.get_vessels(null, null, null, req.params.sub_network_id)
                            .catch(err => {
                                throw err;
                            });
                    }
                } else if (req.params.deleted) {
                    //Deleted Specified
                    vessels_db = await DB.get_vessels(null, null, req.params.deleted, null)
                        .catch(err => {
                            throw err;
                        });
                }
                else {
                    //None Specified
                    vessels_db = await DB.get_vessels(null, null, null, null)
                        .catch(err => {
                            throw err;
                        });
                }
            } 
            else if(req.access == 'self'){
                vessels_db = await DB_USER_VESSEL.get_user_vessel(null, req.user.id, null, null)
                    .catch(err => {
                        //Error fetching vessels for user
                        throw err;
                    });
            }
            res.status(200).send({ vessels_db: vessels_db, message: 'Vessels fetched', type: 'success'});
        }catch(err){
            console.log(err);
            if(error_location ==1){
                res.status(500).send({ message: "Error fetching vessels from database", type: 'error'})
            }else{
                res.status(500).send({ message: 'Failed to get vessels : error in get function', type: 'error'})
            }
        }
    },
    get_all: async function(req, res){
        try{
            res.status(501).send({ message: 'Not Implemented: Vessels get all', type: 'error' }); 
        }catch(err){
            console.log(err)
        }
    },
    create: async function(req, res){
        let error_location = null; 
        try{
            let data = req.body.vessel;
            await DB.create_vessels(data.vessel_name, data.vessel_unique_vessel_identifier, data.vessel_international_radio_call_sign, data.vessel_type, data.sub_network_id)
            .catch(err => {
                //error creating vessel on db
                error_location = 0;
                throw error_message("create vessel : database",err.message);
            });
            //console.log("Vessel created");
            res.status(201).send({ message: 'Vessel created', type: 'success' });
        }catch(err){
            //e_l =0 (problem creating vessel)
            //other = (unknown error/exception)
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Error creating vessel.", type: 'info' })
            }else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    update: async function(req, res){
        let error_location = null; 
        try{
            let data = req.body.vessel;
            await DB.update_vessels_all_parameters(data, req.params.vessel_id)
                .catch(err => {
                    //error updating vessel on db
                    error_location = 0;
                    throw error_message("update vessel : database", err.message);
                });
            //console.log("Vessel Updated. Vessel ID: " + req.params.vessel_id);
            res.status(201).send({ message: 'Vessel updated', type: 'success' });
        }catch(err){
            //e_l =0 (problem updating vessel)
            //other = (unknown error/exception)
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to update vessel", type: 'error' });
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    delete: async function(req, res){
        let error_location = null; //0=lora, 1=lora 2=db
        let vessels_db;
        try{
            await DB.update_vessels("vessel_deleted", 1, req.params.vessel_id)
                .catch(err => {
                    //error updating delete coloum from DB for vessel
                    error_location = 0;
                    throw error_message("delete vessel : database", err.message);
                });
            await add_device_to_default_vessel_when_vessel_deleted(req.params.vessel_id)
                .catch(err => {
                    //Error adding devices to default vessel
                    throw error_message("reassign device", err.message);
                });
            //console.log("Vessel deleted parameter set high in database. Vessel ID: " + req.params.vessel_id);
            await DB_VESSEL_DEVICE.delete_given_vessel_id(req.params.vessel_id)
                .catch(err => {
                    //Error deleting relationship between device and vessel from database
                    error_location = 1;
                    throw error.error_message("delete vessel : delete device vessel relationship: database", err.message);
                });
            //console.log("Device vessel relationship deleted parameter set high in database. Vessel ID: " + req.params.vessel_id);
            vessels_db = await DB.get_vessels_not_deleted()
                .catch(err => {
                    //error getting vessel on db
                    error_location = 2;
                    throw error_message("fetch vessel : database", err.message);
                });
            res.status(200).send({ vessels_db: vessels_db, message: 'Vessel deleted', type: 'success' });
        }catch(err){
            //e_l =0 (problem deleteing vessel)
            //e_l =1 (vessel deleted.. failed to delete vessel device relationship)
            //e_l =2 (vessel deleted.. failed to fetch vessels)
            //other = (unknown error/exception)
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to delete vessel", type: 'error' });
            } else if (error_location == 1) {
                res.status(500).send({ message: "Vessel deleted. Failed to delete relationship between vessel and deivce", type: 'info' })
            } else if (error_location == 2) {
                res.status(500).send({ message: "Vessel deleted. Failed to fetch vessels", type: 'info' })
            }else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    delete_vessel_given_sub_network_id: async function(sub_network_id){
        try{
            let vessels = await DB.get_vessels_filter_sub_network(sub_network_id)
                .catch(err => {
                    //Error fetcing vessels belonging to a particular subnetwork
                    throw error_message("get vessels under specified sub_network : database", err.message);
                })
            for(let i = 0; i< vessels.length; i ++){
                await DB_VESSEL_DEVICE.delete_given_vessel_id(vessels[i].id)
                    .catch(err => {
                        //Error deleting vessel device realtionship for a given vessel
                        throw error_message("delete device vessel relationship: database", err.message);
                    })
                await DB.delete_vessel(vessels[i].id)
                    .catch(err => {
                        //Error deleting vessel from database
                        throw error_message("database", err.message);
                    });
            }
        }catch(err){
            console.log(err)
            throw err;
        }
    }
}
