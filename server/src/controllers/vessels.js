const DB = require('../services/database/vessels_db');
const DB_VESSEL_DEVICE = require("../services/database/vessel_device_db");
const VError = require('verror');
const DEVICE_UPLINK_DB = require('../services/database/device_rx_db')


function error_message(current_error_message, previous_error){
    let error = new VError("%s : %s", current_error_message, previous_error);  
    return error;
}

module.exports = {
    get: async function(req, res) {
        //need to split up into two seperate fetches. One for self and another for all 
        let error_location = null; //1=db
        try{ 
            let vessels_db; 
            if (req.params.sub_network_id == 'null'){ //will run here when we do not specify a sub_network
                vessels_db = await DB.get_vessels_not_deleted()
                    .catch(err => {
                        //error getting vessels from db
                        error_location = 1;
                        throw error_message("get vessels : database", err.message);
                    });
                console.log('Vessels Fetched');
            }else{
                vessels_db = await DB.get_vessels_not_deleted_filter_sub_network(req.params.sub_network_id)
                    .catch(err => {
                        //error getting vessels from db
                        error_location = 1;
                        throw error_message("get vessels under specified sub_network : database", err.message);
                    });
                console.log("Vessels Fetched for sub-network id: " + req.params.sub_network_id);
            }
            vessels_db = JSON.stringify(vessels_db);
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
            let sub_networks = (req.params.sub_networks);
             let vessels = await DB.get_vessels_specified_sub_network(sub_networks)
                .catch(err => {
                    //Error fetching sub_networks under specified network 
                    throw error.error_message("get vessels : database", err.message);
                })
            vessels = JSON.stringify(vessels);
            res.status(200).send({ vessels: vessels, message: 'Vessels fetched', type: 'success' }); 
        }catch(err){
            console.log(err);
            res.status(500).send({ message: "Failed to fetch vessels", type: 'error' });
        }
    },
    create: async function(req, res){
        let error_location = null; //0=lora, 1=lora 2=db
        let vessels_db;
        try{
            let data = JSON.parse(req.body.data);
            await DB.create_vessels(data.name, data.sub_network_id)
                .catch(err => { 
                    //error creating vessel on db
                    error_location = 0;
                    throw error_message("create vessel : database", err.message);
                });
            console.log("Vessel created");
            vessels_db = await DB.get_vessels_not_deleted()
                .catch(err => {
                    //error getting vessel on db
                    error_location = 1;
                    throw error_message("fetch vessel : database", err.message);
                });
            console.log("Vessels Fetched");
            vessels_db = JSON.stringify(vessels_db);
            res.status(201).send({ vessels_db: vessels_db, message: 'Vessel created', type: 'success' });
        }catch(err){
            //e_l =0 (problem creating vessel)
            //e_l =1 (vessel created.. failed to fetch vessels)
            //other = (unknown error/exception)
            console.log(err);
            if (error_location == 0) {
                networks_lora = JSON.stringify([]);
                res.status(201).send({ vessels_db: vessels_db, message: "Error creating vessel.", type: 'info' })
            }
            else if (error_location == 1) {
                res.status(200).send({ message: "Vessel Created. Failed to fetch vessels", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    update: async function(req, res){
        let error_location = null; //0=lora, 1=lora 2=db
        let networks_lora;
        try{
            let data = JSON.parse(req.body.data);
            await DB.update_vessels_all_parameters(data, req.params.vessel_id)
                .catch(err => {
                    //error updating vessel on db
                    error_location = 0;
                    throw error_message("update vessel : database", err.message);
                });
            console.log("Vessel Updated. Vessel ID: " + req.params.vessel_id);
            vessels_db = await DB.get_vessels_not_deleted()
                .catch(err => {
                    //error getting vessel on db
                    error_location = 1;
                    throw error_message("fetch vessel : database", err.message);
                });
            console.log("Vessels Fetched");
            vessels_db = JSON.stringify(vessels_db);
            res.status(201).send({ vessels_db: vessels_db, message: 'Vessel updated', type: 'success' });
        }catch(err){
            //e_l =0 (problem updating vessel)
            //e_l =1 (vessel updated.. failed to fetch vessels)
            //other = (unknown error/exception)
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to update vessel", type: 'error' });
            } else if (error_location == 1) {
                networks_lora = JSON.stringify([]);
                res.status(200).send({ networks_lora: networks_lora, message: "Vessel updated. Failed to fetch vessels", type: 'info' })
            }else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    delete: async function(req, res){
        let error_location = null; //0=lora, 1=lora 2=db
        let vessels_db;
        try{
            await DB.update_vessels("deleted", 1, req.params.vessel_id)
                .catch(err => {
                    //error updating delete coloum from DB for vessel
                    error_location = 0;
                    throw error_message("delete vessel : database", err.message);
                });
            console.log("Vessel deleted parameter set high in database. Vessel ID: " + req.params.vessel_id);
            await DB_VESSEL_DEVICE.delete_given_vessel_id(req.params.vessel_id)
                .catch(err => {
                    //Error deleting relationship between device and vessel from database
                    error_location = 1;
                    throw error.error_message("delete vessel : delete device vessel relationship: database", err.message);
                });
            console.log("Device vessel relationship deleted parameter set high in database. Vessel ID: " + req.params.vessel_id);
            vessels_db = await DB.get_vessels_not_deleted()
                .catch(err => {
                    //error getting vessel on db
                    error_location = 2;
                    throw error_message("fetch vessel : database", err.message);
                });
            vessels_db = JSON.stringify(vessels_db);
            res.status(201).send({ vessels_db: vessels_db, message: 'Vessel deleted', type: 'success' });
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
