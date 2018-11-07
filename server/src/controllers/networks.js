const lora_app_server = require('../services/API/lora_app_server');
const db = require('../services/database/networks_db');
const compare = require('../services/compare');
const VError = require('verror');


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
            "canHaveGateways": data.can_have_gateways,
            "displayName": `${data.display_name}`,
            "name": `${data.network_name}` 
            }
        }
    } else if (type == 2) {//Update form
        request = {
            "organization": {
                "canHaveGateways": data.can_have_gateways,
                "displayName": `${data.display_name}`,
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
        can_have_gateways: null,
        created_at: null,
        display_name: null,
        network_id: null,
        network_name: null,
        updated_at: null
    };
    for (let i = 0; i < networks.length; i++) {
        network.can_have_gateways = networks[i].canHaveGateways;
        network.created_at = networks[i].createdAt;
        network.display_name = networks[i].displayName;
        network.network_id = networks[i].id;
        network.network_name = networks[i].name;
        network.updated_at = networks[i].updatedAt;
        networks_return[i] = network;
        network = {
            can_have_gateways: null,
            created_at: null,
            display_name: null,
            network_id: null,
            network_name: null,
            updated_at: null
        };

    }
    return networks_return;
}

async function get_networks(){
    try{
    let request_body = network_api_request_data(null, 0);
        let networks_lora = await lora_app_server.get_organizations(request_body) //error here
        .catch(err => {
            let error = new VError({
                'name': `${err.name}`,
                'cause': err,
                'info': {
                    'response':`${err.response.data.error}`
                }
            }); 
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
        try{
            let networks_lora = await get_networks()
            .catch(err => {
                //Error getting networks from lora app server
                var error = new VError({
                    'name': `${err.name}`,
                    'cause': err,
                    'info': {
                    }
                }, 'fetch networks from lora api'); 
                throw error;
            })
            let networks_db = await db.get_networks()
            .catch(err => {
                //error getting networks from db
                throw err;
            });
            await compare.compare_networks(networks_lora, networks_db)
            .catch(err => {
                //Error comparing networks 
                throw err;
            });
            networks_lora = JSON.stringify(networks_lora);
            res.status(200).send({networks_lora});
        }catch(err){
            //console.log('ddfgfdgfd');
            res.status(402).send({message:"failed"});
        }
    }, 
    create_networks: async function(req, res){
        try{
            let data = JSON.parse(req.body.data);
            let request_body = network_api_request_data(data, 1);
            let result = await lora_app_server.create_organizations(request_body)
            .catch(err => {
                //error creating network on lora app server
                throw err;
            });
            db.create_network(result.data.id, data.name, data.display_name)
            .catch(err => {
                //error creating network on db
                throw err;
            });
            let networks_lora = await get_networks()
            .catch(err => {
                //error getting networks from lora app server
                throw err;
            });
            networks_lora = JSON.stringify(networks_lora);
            res.status(200).send({ networks_lora });
        }catch(err){
            console.log(err);
        }
    },
    update_networks: async function(req, res){
        try{
            let data = JSON.parse(req.body.data);
            let request_body = network_api_request_data(data, 2);
            let result = await lora_app_server.update_organizations(request_body, req.params.network_id)
            .catch(err => {
                //error updating network on lora app server
                throw err;
            });
            db.update_networks_all_parameters(data, req.params.network_id)
            .catch(err => {
                //error updating network on database
                throw err;
            })
            let networks_lora = await get_networks()
            .catch(err => {
                //error getting networks from lora app server
                throw err;
            });
            networks_lora = JSON.stringify(networks_lora);
            res.status(200).send({ networks_lora });
        }catch(err){
            console.log(err);
        }
    },
    delete_networks: async function(req, res){
        try{
            console.log(req.params.network_id)
            await lora_app_server.delete_organizations(req.params.network_id)
            .catch(err => {
                //error deleting network from lora app server
                throw err;
            });
            await db.update_network("deleted", 1, req.params.network_id)
            .catch(err => {
                //error updating delete coloum from db
                throw err;
            });
            let networks_lora = await get_networks()
                .catch(err => {
                    //error getting networks from lora app server
                    throw err;
                });
            networks_lora = JSON.stringify(networks_lora);
            res.status(200).send({ networks_lora });
        }catch(err){
            console.log(err);
        }
    }
}
