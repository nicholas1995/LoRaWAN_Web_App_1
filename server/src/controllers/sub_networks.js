const lora_app_server = require('../services/API/lora_app_server');
const db_networks = require('../services/database/networks_db');
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
            "organization": {
                "canHaveGateways": data.can_have_gateways,
                "displayName": `${data.display_name}`,
                "name": `${data.name}`
            }
        }
    }
    return request;
}

async function get_sub_networks(){
    let sub_networks_lora;
    try{
        let request = sub_network_api_request_data(null, 0);
        sub_networks_lora = await lora_app_server.get_applications(request);
        sub_networks_lora= convert_names_sub_networks(sub_networks_lora.data.result);
        return sub_networks_lora;
    }catch(err){
        console.log('Error 123')
        //Error getting applications for lora app server
    }
}

async function get_compare_sub_networks(){
    let sub_networks_lora ;
    let sub_networks_db;
    sub_networks_lora = await get_sub_networks();
    sub_networks_db= await db_sub_networks.get_sub_networks();
    compare.compare_sub_networks(sub_networks_lora,sub_networks_db)
    return sub_networks_lora;
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
        let sub_networks_lora = await get_compare_sub_networks();
        res.status(200).send({sub_networks_lora});
    },
    create: async function(req, res){
        let data = JSON.parse(req.body.data);
        let result;
        let request_body = sub_network_api_request_data(data,1);
        try{
            result = await lora_app_server.create_applications(request_body);
        } catch (err) {
            console.log(err)
            //Error updating application on lora app server
        }
        try{
            await db_sub_networks.create_sub_network(result.data.id, data.sub_network_name, data.network_id);
        }catch(err){
            //Error updating database with sub_network information 
        }
        let sub_networks_lora = await get_sub_networks();
        res.status(200).send({ sub_networks_lora });

    },
    update: async function(req, res){
        let data = JSON.parse(req.body.data);
        let data_api = create_sub_network_api_request_data(data, 2);
        let result = await lora_app_server.update(data_api,req.params.sub_network_id)
        db_sub_networks.update('name', data.sub_network_name, req.params.sub_network_id).then( result=> {
            get_sub_networks().then(result => {
                data = convert_names_sub_networks(result);
                data = JSON.stringify(data);
                res.status(200).send({ data })
            }).catch(err => {
                //Error getting sub_networks from lora app server
            })
        }).catch(err => {
            //Error updating sub_network in database
        })
        
    },
    delete: function(req ,res){

        lora_app_server.delete(req.params.sub_network_id).then(result => {
            db_sub_networks.update('deleted', 1, req.params.sub_network_id).then(result => {
                get_sub_networks().then(result => {
                    data = JSON.stringify(result);
                    res.status(200).send({ data })
                }).catch(err => {
                    //Error getting sub_networks from lora app server
                })
            }).catch(err => {
                //Error updating delete value on database
            })
        }).catch(err => {
            //Error deleting sub-network from database
        })
    }

}