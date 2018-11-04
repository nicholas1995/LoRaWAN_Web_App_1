const lora_app_server = require('../services/API/lora_app_server');
const db_sub_networks = require('../services/database/sub_networks_db');
const compare = require('../services/compare');


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
            throw err;
        });
        
        sub_networks_lora= convert_names_sub_networks(sub_networks_lora.data.result);
        return sub_networks_lora;
    }catch(err){
        throw err;
        //Error getting applications for lora app server
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
        try{
            let sub_networks_lora = await get_sub_networks()
                .catch(err => {
                    throw err;
                })
            let sub_networks_db = await db_sub_networks.get_sub_networks()
                .catch(err => {
                    throw err;
                })
            await compare.compare_sub_networks(sub_networks_lora, sub_networks_db)
                .catch(err => {
                    throw err;
                });
            sub_networks_lora = JSON.stringify(sub_networks_lora);
            res.status(200).send({sub_networks_lora});
        }
        catch(err){
            console.log(err);
        }
    },
    create: async function(req, res){
        try{
            let data = JSON.parse(req.body.data);
            let request_body = sub_network_api_request_data(data, 1);
            let result = await lora_app_server.create_applications(request_body)
            .catch(err => {
                //Error updating application on lora app server
                throw err;
            });
            await db_sub_networks.create_sub_network(result.data.id, data.sub_network_name, data.network_id)
            .catch(err => {
                throw err;
                //Error creating sub network in database 
            });
            let sub_networks_lora = await get_sub_networks()
            .catch(err => {
                throw err; 
                //Error getting networks from lora app server
            })
            sub_networks_lora = JSON.stringify(sub_networks_lora);
            res.status(200).send({ sub_networks_lora });
        }catch (err) {
            console.log(err)
        }finally{
        }
    },
    update: async function(req, res){ 
        try{
            let data = JSON.parse(req.body.data);
            let request_body = sub_network_api_request_data(data, 2);
            let result = await lora_app_server.update(request_body, req.params.sub_network_id)
            .catch(err => {
                throw err;
                //Error updating lora app server Sub network    
            });
            await db_sub_networks.update("name", data.sub_network_name, req.params.sub_network_id)
            .catch(err => {
                throw err;
                //Error updating sub network record in the database
            });
            let sub_networks_lora = await get_sub_networks()
            .catch(err => {
                throw err;
                //Error getting the sub networks from the lora app server
            });
            sub_networks_lora = JSON.stringify(sub_networks_lora);
            res.status(200).send({ sub_networks_lora });
        }catch(err){
            console.log(err);
        }
    },
    delete: async function(req ,res){
        let sub_networks_lora;
        try{
            let result = await lora_app_server.delete(req.params.sub_network_id)
            .catch(err => {
                throw err;
                //Error delete subnetwork form lora app server
            });
            await db_sub_networks.update('deleted', 1, req.params.sub_network_id)
            .catch(err => {
                throw err;
                //Error deleting subnetwork from the database
            });
            sub_networks_lora = await get_sub_networks()
            .catch(err => {
                    throw err;
                    //Error getting the sub networks from the lora app server
            });
            sub_networks_lora = JSON.stringify(sub_networks_lora);
            res.status(200).send({ sub_networks_lora });
        } catch (err) {
            console.log(err);
        }finally{

        }
}

}