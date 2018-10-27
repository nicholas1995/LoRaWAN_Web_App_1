const lora_app_server = require('../services/API/lora_app_server');
const db = require('../services/database/networks_db');
const compare = require('../services/compare');

module.exports = {
    get_networks: function(req, res) {
        lora_app_server.get_organizations()
            .then(result => {
                let networks_lora = result.data.result;
                db.get_networks().then(result => {
                    compare.compare(networks_lora,result);
                    res.status(200).send({networks_lora});
                }).catch(err => {
                    //ERROR from the call from the db
                    console.log(err);
                }) 
            }).catch(err => {
                //error trying to get networks from lora
                console.log(err);
            })  
    },
    create_networks: function(req, res){
        let apiCreateOrganizationRequest ={
                "canHaveGateways": req.body.can_have_gateways,
                "displayName": req.body.display_name,
                "name": req.body.name
        }
        lora_app_server.create_organizations(apiCreateOrganizationRequest).then(result => {
            db.create_network(result.data.id, req.body.name, req.body.display_name).then(result => {
                lora_app_server.get_organizations().then(result => {
                    let networks_lora = result.data.result;
                    res.status(200).send(networks_lora);
                }).catch(err => {
                    console.log('Error getting networks from lora');
                    //Error from trying to get networks from lora
                })
            }).catch(err => {
                console.log('Error Updating database');//Error updating database
            })
        }).catch(err => {
            console.log('Error received from posting network to lora');
            //Error received from request sent to lora
        })
    },
    update_networks: function(req, res){
        let apiUpdateOrganizationRequest = {
            "id": req.params.id,
            "canHaveGateways": req.body.can_have_gateways,
            "displayName": req.body.display_name,
            "name": req.body.name
        }
        lora_app_server.update_organizations(apiUpdateOrganizationRequest).then(result => {
            db.update_networks_all_parameters(apiUpdateOrganizationRequest).then(result => {
                lora_app_server.get_organizations().then(result => {
                    let networks_lora = result.data.result;
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
    delete_networks: function(req, res){
        lora_app_server.delete_organizations(req.params.id).then(result => {
            db.update_network('deleted', 1, req.params.id).then(result => {
                lora_app_server.get_organizations().then(result => {
                    let networks_lora = result.data.result;
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
