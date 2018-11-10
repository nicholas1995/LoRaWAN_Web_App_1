const lora_app_server = require('../services/API/lora_app_server');
const db = require('../services/database/sub_networks_db');
const compare = require('../services/compare');
const error = require('../services/errors');
const VError = require("verror");


function sub_network_api_request_data(data, type) {
    let request;
    if (type == 0) {//get form 
        request = {
            limit: 100,
            //offset: null,
            //search: null,
            //organizationID: null
        }
    }
    else if (type == 1) {//create form
        request = {
            "application":{
                "description": `${data.description}`,
                "name": `${data.sub_network_name}`,
                "organizationID": `${data.network_id}`,
                "payloadCodec": "string", //NEED TO GET THE NAME OF THE CODEC
                //"payloadDecoderScript": "string",
                //"payloadEncoderScript": "string",
                "serviceProfileID": `${data.service_profile_id}`
            }
        }
    } else if (type == 2) {//Update form
        request = {
            "application": {
                "description": `${data.description}`,
                "name": `${data.sub_network_name}`,
                "organizationID": `${data.network_id}`,
                //"payloadCodec": "string", //NEED TO GET THE NAME OF THE CODEC
                //"payloadDecoderScript": "string",
                //"payloadEncoderScript": "string",
                "serviceProfileID": `${data.service_profile_id}`
            }
        }
    }
    return request;
}

async function get_sub_networks(){
    let sub_networks_lora;
    try{
        let request = sub_network_api_request_data(null, 0);
        sub_networks_lora = await lora_app_server.get_applications(request)
        .catch(err => {
            //Error getting sub-networks from lora app server
            let error = new VError("%s", err.message);
            throw error;
        });
        sub_networks_lora= convert_names_sub_networks(sub_networks_lora.data.result);
        return sub_networks_lora;
    }catch(err){
        //Error getting sub-networks for lora app server
        throw err;
        
    }
}

function convert_names_sub_networks(sub_networks){
    let sub_networks_return = [];
    let sub_network = { 
        description: null, 
        sub_network_id:null,
        sub_network_name: null,
        network_id: null,
        service_profile_id: null,
        service_profile_name: null,
     };
    for(let i=0; i< sub_networks.length; i++){
        sub_network.description = sub_networks[i].description;
        sub_network.sub_network_id = sub_networks[i].id;
        sub_network.sub_network_name = sub_networks[i].name;
        sub_network.network_id = sub_networks[i].organizationID;
        sub_network.service_profile_id = sub_networks[i].serviceProfileID;
        sub_network.service_profile_name = sub_networks[i].serviceProfileName;
        sub_networks_return[i] = sub_network;
        sub_network = {
            description: null,
            sub_network_id: null,
            sub_network_name: null,
            network_id: null,
            service_profile_id: null,
            service_profile_name: null,
        };
    }
    return sub_networks_return;
}   

module.exports = {
    get: async function(req, res){
        let error_location = null; //0=lora, 1=db
        let sub_networks_lora;
        try{
            sub_networks_lora = await get_sub_networks()
                .catch(err => {
                    //Error getting sub-networks from lora app server
                    error_location = 0;
                    throw error.error_message("get sub-networks : lora app server", err.message);
                });
            let sub_networks_db = await db.get_sub_networks()
                .catch(err => {
                    //error getting sub-networks from db
                    error_location = 1;
                    throw error.error_message("get sub-networks : database", err.message);
                })
            await compare.compare_sub_networks(sub_networks_lora, sub_networks_db)
                .catch(err => {
                    //Error comparing sub-networks 
                    error_location = 1;
                    throw error.error_message("get sub-networks : database", err.message);
                });
            sub_networks_lora = JSON.stringify(sub_networks_lora);
            res.status(200).send({ sub_networks_lora: sub_networks_lora, message: 'Sub-Networks fetched', type: 'success' });
        }
        catch(err){
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to get sub-networks", type: 'error' });
            }
            else if (error_location == 1) {
                sub_networks_lora = JSON.stringify(sub_networks_lora);
                res.status(200).send({ sub_networks_lora: sub_networks_lora, message: "Error updating sub-networks in database", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    create: async function(req, res){
        let error_location = null; //0=lora, 1=lora 2=db
        let sub_networks_lora;
        try{
            let data = JSON.parse(req.body.data);
            let request_body = sub_network_api_request_data(data, 1);
            let result = await lora_app_server.create_applications(request_body)
                .catch(err => {
                    //Error updating application on lora app server
                    error_location = 0;
                    throw error.error_message("create sub-network : lora app server", err.message);
                });
            sub_networks_lora = await get_sub_networks()
                .catch(err => {
                    //Error getting sub networks from lora app server
                    error_location = 1;
                    throw error.error_message("create sub-network : lora app server", err.message);
                })
            await db.create_sub_network(result.data.id, data.sub_network_name, data.network_id)
                .catch(err => {
                    //Error creating sub network in database 
                    error_location = 2;
                    throw error.error_message("create sub-network : database", err.message);
                });
            sub_networks_lora = JSON.stringify(sub_networks_lora);
            res.status(201).send({ sub_networks_lora: sub_networks_lora, message: 'Sub-Network created', type: 'success' });
        }catch (err) {
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to create sub-network", type: 'error' });
            } else if (error_location == 1) {
                sub_networks_lora = JSON.stringify([]);
                res.status(201).send({ sub_networks_lora: sub_networks_lora, message: "Sub-Network Created. Failed to fetch sub-networks", type: 'info' })
            }
            else if (error_location == 2) {
                sub_networks_lora = JSON.stringify(sub_networks_lora);
                res.status(200).send({ sub_networks_lora: sub_networks_lora, message: "Sub-Network Created. Error creating sub-network in database", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    update: async function(req, res){ 
        let error_location = null; //0=lora, 1=lora 2=db
        let sub_networks_lora;
        try{
            let data = JSON.parse(req.body.data);
            let request_body = sub_network_api_request_data(data, 2);
            await lora_app_server.update(request_body, req.params.sub_network_id)
                .catch(err => {
                    //Error updating sub network on the lora app server 
                    error_location = 0;
                    throw error.error_message("update sub-network : lora app server", err.message);
                });
            sub_networks_lora = await get_sub_networks()
                .catch(err => {
                    //Error getting the sub networks from the lora app server
                    error_location = 1;
                    throw error.error_message("update sub-network : lora app server", err.message);
                });
            await db.update("name", data.sub_network_name, req.params.sub_network_id)
                .catch(err => {
                    //Error updating sub network record in the database
                    error_location = 2;
                    throw error.error_message("update sub-network : database", err.message);                
                });
            sub_networks_lora = JSON.stringify(sub_networks_lora);
            res.status(200).send({ sub_networks_lora: sub_networks_lora, message: 'Sub-Network updated.', type: 'success' });
        }catch(err){
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to update sub-network", type: 'error' });
            } else if (error_location == 1) {
                sub_networks_lora = JSON.stringify([]);
                res.status(200).send({ sub_networks_lora: sub_networks_lora, message: "Sub-Network updated. Failed to fetch sub-networks", type: 'info' })
            }
            else if (error_location == 2) {
                sub_networks_lora = JSON.stringify(sub_networks_lora);
                res.status(200).send({ sub_networks_lora: sub_networks_lora, message: "Sub-Network updated. Error updating sub-network in database", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    delete: async function(req ,res){
        let error_location = null; //0=lora, 1=lora 2=db
        let sub_networks_lora;
        try{
            await lora_app_server.delete(req.params.sub_network_id)
                .catch(err => {
                    //Error delete subnetwork form lora app server
                    error_location = 0;
                    throw error.error_message("delete sub-network : lora app server", err.message);
                });
            sub_networks_lora = await get_sub_networks()
                .catch(err => {
                    //Error getting the sub networks from the lora app server
                    error_location = 1;
                    throw error.error_message("delete sub-network : lora app server", err.message);
                });
            await db.update('deleted', 1, req.params.sub_network_id)
                .catch(err => {
                    //Error deleting subnetwork from the database
                    error_location = 2;
                    throw error.error_message("delete sub-network : database", err.message);
                });
            sub_networks_lora = JSON.stringify(sub_networks_lora);
            res.status(200).send({ sub_networks_lora: sub_networks_lora, message: 'Sub-Network deleted.', type: 'success' });
        } catch (err) {
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to delete sub-network", type: 'error' });
            } else if (error_location == 1) {
                sub_networks_lora = JSON.stringify([]);
                res.status(200).send({ sub_networks_lora: sub_networks_lora, message: "Sub-Network deleted. Failed to fetch sub-networks", type: 'info' })
            }
            else if (error_location == 2) {
                sub_networks_lora = JSON.stringify(sub_networks_lora);
                res.status(200).send({ sub_networks_lora: sub_networks_lora, message: "Sub-Network deleted. Error deleting sub-network in database", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
}

}