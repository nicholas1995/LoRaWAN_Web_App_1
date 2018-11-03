const lora_app_server = require('../services/API/lora_app_server');
const db = require('../services/database/networks_db');
const compare = require('../services/compare');


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
            "name": `${data.name}`
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

function convert_names_networks(networks) {
    //console.log(sub_networks);
    let networks_return = [];
    let network = {
        can_have_gateways: null,
        created_at: null,
        display_name: null,
        id: null,
        name: null,
        updated_at: null
    };
    for (let i = 0; i < networks.length; i++) {
        network.can_have_gateways = networks[i].canHaveGateways;
        network.created_at = networks[i].createdAt;
        network.display_name = networks[i].displayName;
        network.id = networks[i].id;
        network.name = networks[i].name;
        network.updated_at = networks[i].updatedAt;
        networks_return[i] = network;
        network = {
            can_have_gateways: null,
            created_at: null,
            display_name: null,
            id: null,
            name: null,
            updated_at: null
        };

    }
    return networks_return;
}

module.exports = {
    get_networks: async function(req, res) {
        let request_body = network_api_request_data(null, 0);
        let networks_lora;
        try{
            networks_lora = await lora_app_server.get_organizations(request_body)
            .catch(err => {
                throw err;
            });
            networks_lora = convert_names_networks(networks_lora.data.result);
            let networks_db = await db.get_networks()
            .catch(err => {
                throw {err:err,
                    info: 'ERRRRROROROROROROOROR'};
            });
            await compare.compare_networks(networks_lora, networks_db)
            .catch(err => {
                throw {err:err,
                    info: 'ERRRRROROROROROROOROR'};
            });
            //res.status(200).send({networks_lora});

        }catch(err){
            console.log(err.info);
        }finally{
            res.status(200).send({ networks_lora });
        }
    }, 
    create_networks: function(req, res){
        let data = JSON.parse(req.body.data);
        let request_body = network_api_request_data(data, 1);

        lora_app_server.create_organizations(request_body).then(result => {
            db.create_network(result.data.id, data.name, data.display_name).then(result => {
                request_body = network_api_request_data(null, 0);
                lora_app_server.get_organizations(request_body).then(result => {
                    let networks_lora = convert_names_networks(result.data.result);
                    res.status(200).send(networks_lora);
                }).catch(err => {
                    console.log('Error getting networks from lora');
                    //Error from trying to get networks from lora
                })
            }).catch(err => {
                console.log(err);//Error updating database
            })
        }).catch(err => {
            console.log(err);
            //Error received from request sent to lora
        })
    },
    update_networks: function(req, res){
        let data = JSON.parse(req.body.data);
        let request_body = network_api_request_data(data, 2);

        lora_app_server.update_organizations(request_body,req.params.id).then(result => {
            db.update_networks_all_parameters(data, req.params.id).then(result => {
                request_body = network_api_request_data(null, 0);
                lora_app_server.get_organizations(request_body).then(result => {
                    let networks_lora = convert_names_networks(result.data.result);
                    res.status(200).send(networks_lora);
                }).catch(err => {
                    //Error requesting networks from lora app server
                })
            }).catch(err => {
                //Error updateing name and display_name of network
            })
        }).catch(err => {
            //Error sending update request to lora app server 
            console.log('err');
        })
    },
    delete_networks: async function(req, res){
        lora_app_server.delete_organizations(req.params.id).then(result => {
            db.update_network('deleted', 1, req.params.id).then(result => {
                let request_body = network_api_request_data(null, 0);
                lora_app_server.get_organizations(request_body).then(result => {
                    let networks_lora = convert_names_networks(result.data.result);
                    res.status(200).send(networks_lora);
                }).catch(err => {
                    //Error requesting networks form lora app server
                })
            }).catch(err => {
                //Error updating database networks table delete field 
            })
        }).catch(err => {
            //Error requesting to delete network from lora app server
        })
    }
}
