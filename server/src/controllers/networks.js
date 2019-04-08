const lora_app_server = require('../services/API/lora_app_server');
const db = require('../services/database/networks_db');
const compare = require('../services/compare');
const VError = require('verror');
const DEVICE_UPLINK_DB = require('../services/database/device_rx_db')
const error_handler = require('./error_logs');



function network_api_request_data(data, type) {
    let request;
    if (type == 0) {//get form 
        request = {
            limit: 100,
            //offset: null,
            //search: null
        }
    }
    else if (type == 1) {//create form
        request ={
            "organization":{
            "canHaveGateways": data.network_can_have_gateways,
            "displayName": `${data.network_display_name}`,
            "name": `${data.network_name}` 
            }
        }
    } else if (type == 2) {//Update form
        request = {
            "organization": {
                "canHaveGateways": data.network_can_have_gateways,
                "displayName": `${data.network_display_name}`,
                "name": `${data.network_name}`
            }
        }
    }
    return request;
}

function convert_names_networks(networks) {
    //console.log(sub_networks);
    let networks_return = [];
    let network = {
        network_can_have_gateways: null,
        network_created_at: null,
        network_display_name: null,
        network_id: null,
        network_name: null,
        network_updated_at: null
    };
    for (let i = 0; i < networks.length; i++) {
        network.network_can_have_gateways = networks[i].canHaveGateways;
        network.network_created_at = networks[i].createdAt;
        network.network_display_name = networks[i].displayName;
        network.network_id = networks[i].id;
        network.network_name = networks[i].name;
        network.network_updated_at = networks[i].updatedAt;
        networks_return[i] = network;
        network = {
            network_can_have_gateways: null,
            network_created_at: null,
            network_display_name: null,
            network_id: null,
            network_name: null,
            network_updated_at: null
        };

    }
    return networks_return;
}

async function get_networks(){
    try{
    let request_body = network_api_request_data(null, 0);
        let networks_lora = await lora_app_server.get_organizations(request_body) //error here
        .catch(err => {
            let error;
            if(typeof err.response !== 'undefined') //if we got back a error response from the lora app server this will run
            {
                //Some error returned from the lora app server
                error = error_handler.error_message(err)
            }else{
                //error connecting to the lora app server
                error = error_handler.error_message(err);
            }      
            throw error;  
        });  
    networks_lora = convert_names_networks(networks_lora.data.result);
    return networks_lora;
    }catch(err){
        throw err;
    }
}

module.exports = {
    get_networks: async function(req, res) {
        let error_location = null; //0=lora, 1=db
        let networks_lora;
        try{ 
            networks_lora = await get_networks()
                .catch(err => {
                    //Error getting networks from lora app server
                    error_location =0;
                    throw error_handler.error_message("from lora app server", err);
                })
            let networks_db = await db.get_networks_not_deleted()
                .catch(err => {
                    //error getting networks from db
                    error_location = 1;
                    throw error_handler.error_message("from database", err.message);
                }); 
            await compare.compare_networks(networks_lora, networks_db)
                .catch(err => {
                    //Error comparing networks 
                    error_location = 1;
                    throw error_handler.error_message("get organizations", err.message);
                });
            res.status(200).send({networks_lora: networks_lora, message: 'Organizations fetched', type: 'success'});
        }catch(err){
            err = error_handler.error_message("Error getting organizations", err);
            error_handler.error_logger(req, err);
            if(error_location ==0){
                res.status(500).send({ message: "Failed to get organizations" , type: 'error'});
            }
            else if(error_location ==1){
                res.status(200).send({networks_lora: networks_lora, message: "Error updating organizations in database", type: 'info'})
            }else{
                res.status(500).send({ message: 'Failed to get organizations', type: 'error'})
            }
        }
    }, 
    get_networks_database: async function(req, res){
        try{
            let networks_db = await db.get_networks().catch(err => {
              //error getting networks from db
              error_location = 1;
              throw error_handler.error_message("get networks : database", err.message);
            });
            res.status(200).send({ networks_db: networks_db, message: 'Networks fetched', type: 'success' });
            //console.log('Networks fetched from database')
        }catch(err){
            error_handler.error_logger(req, err);
            res.status(500).send({ message: "Failed to get organizations", type: 'error' });
        }
    },
    create_networks: async function(req, res){
        let error_location = null; //0=lora, 1=lora 2=db
        let networks_lora;
        try{
            let data = req.body.network;
            let request_body = network_api_request_data(data, 1);
            let result = await lora_app_server.create_organizations(request_body)
                .catch(err => {
                    //error creating network on lora app server
                    error_location =0;
                    throw error_handler.error_message(err) ;
                });
            await db.create_network(result.data.id, data.network_name, data.network_display_name, data.network_can_have_gateways)
                .catch(err => { 
                    //error creating network on db
                    error_location = 1;
                    throw error_handler.error_message("create network : database", err.message);
                });
            res.status(201).send({ message: 'Organization created', type: 'success' });
        }catch(err){
            err = error_handler.error_message("Error creating organization", err);
            error_handler.error_logger(req, err);
            //e_l =0 (problem creating network)
            //e_l =1 (network created.. failed to fetch networks)
            //e_l =2 (network created.. networks fetched.. failed to create network on db)
            //other = (unknown error/exception)
            //console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to create organization", type: 'error' });
            } else if (error_location == 1) {
                networks_lora = JSON.stringify(networks_lora);
                res.status(200).send({ networks_lora: networks_lora, message: "Organization created on LoRa app server. Error creating organization in database", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error creating organization', type: 'error' })
            }
        }
    },
    update_networks: async function(req, res){
        let error_location = null; //0=lora, 1=lora 2=db
        let networks_lora;
        try{
            let data = req.body.network;
            let request_body = network_api_request_data(data, 2);
            let result = await lora_app_server.update_organizations(request_body, req.params.network_id)
                .catch(err => {
                    //error updating network on lora app server
                    error_location = 0;
                    throw error_handler.error_message(err);
                });
            await db.update_networks_all_parameters(data, req.params.network_id)
                .catch(err => {
                    //error updating network on database
                    error_location = 1;
                    throw error_handler.error_message("update network : database", err.message);
                })
            res.status(200).send({ message: 'Organization updated', type: 'success' });
        }catch(err){
            err = error_handler.error_message("Error updating organization", err);
            error_handler.error_logger(req, err);
            //e_l =0 (problem updating network)
            //e_l =1 (network updated.. failed to fetch networks)
            //e_l =2 (network updated.. networks fetched.. failed to update network on db)
            //other = (unknown error/exception)
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to update organization", type: 'error' });
            } else if (error_location == 1) {
                networks_lora = JSON.stringify(networks_lora);
                res.status(200).send({ networks_lora: networks_lora, message: "Organizations updated on LoRa app server. Error updating organization in database", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error updating organization', type: 'error' })
            }
        }
    },
    delete_networks: async function(req, res){
        let error_location = null; //0=lora, 1=lora 2=db
        let networks_lora;
        try{
            await lora_app_server.delete_organizations(req.params.network_id)
                .catch(err => {
                    //error deleting network from lora app server
                    error_location = 0;
                    throw error_handler.error_message(err);
                });
            networks_lora = await get_networks()
                .catch(err => {
                    //error getting networks from lora app server
                    error_location = 1;
                    throw error_handler.error_message("delete network : lora app server", err.message);
                });
            await db.update_network("network_deleted", 1, req.params.network_id)
                .catch(err => {
                    //error updating delete coloum from db
                    error_location = 2;
                    throw error_handler.error_message("delete network : lora app server", err.message);
                });
            res.status(200).send({ networks_lora: networks_lora, message: 'Organization deleted', type: 'success' });
        }catch(err){
            err = error_handler.error_message("Error deleting organization", err);
            error_handler.error_logger(req, err);
            //e_l =0 (problem deleteing network)
            //e_l =1 (network deleted.. failed to fetch networks)
            //e_l =2 (network deleted.. networks fetched.. failed to delete network on db)
            //other = (unknown error/exception)
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to delete organization", type: 'error' });
            } else if (error_location == 1) {
                res.status(200).send({ networks_lora: networks_lora, message: "Organization deleted. Failed to fetch organizations", type: 'info' })
            }
            else if (error_location == 2) {
                res.status(200).send({ networks_lora: networks_lora, message: "Organization deleted. Error updating organization in database", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error deleting organization', type: 'error' })
            }
        }
    }
}
