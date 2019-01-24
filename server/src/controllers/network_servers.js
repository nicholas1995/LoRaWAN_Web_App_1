const lora_app_server = require("../services/API/lora_app_server");
const error = require("../services/errors");
const VError = require("verror");

function network_server_api_request_data(data, type) {
  let request;
  if (type == 0) {
    //get form
    request = {
      limit: 100
      //offset: null,
      //search: null
    };
  } else if (type == 1) {
    //create form
    request = {
      organization: {
        canHaveGateways: data.can_have_gateways,
        displayName: `${data.display_name}`,
        name: `${data.network_name}`
      }
    };
  } else if (type == 2) {
    //Update form
    request = {
      organization: {
        canHaveGateways: data.can_have_gateways,
        displayName: `${data.display_name}`,
        name: `${data.network_name}`
      }
    };
  }
  return request;
}


function convert_names_network_servers(network_servers) {
    let network_servers_return = [];
    let network_server = {
        network_server_created_at: null,
        network_server_id: null,
        network_server_name: null,
        network_server_server: null,
        network_server_updated_at: null
    };
    for (let i = 0; i < network_servers.length; i++) {
        network_server.network_server_created_at = network_servers[i].createdAt;
        network_server.network_server_id = network_servers[i].id;
        network_server.network_server_name = network_servers[i].name;
        network_server.network_server_server = network_servers[i].server;
        network_server.network_server_updated_at = network_servers[i].updatedAt;
        network_servers_return[i] = network_server;
        network_server = {
            network_server_created_at: null,
            network_server_id: null,
            network_server_name: null,
            network_server_server: null,
            network_server_updated_at: null
        };
    }
    return network_servers_return;
}

async function get_network_servers(){
    try {
        let request_body = network_server_api_request_data(null, 0);
        let network_servers = await lora_app_server.get_network_servers(request_body)
            .catch(err => {
                //Error getting network servers from lora app server
                let error = new VError("%s", err.message);
                throw error;
            });
        network_servers = convert_names_network_servers(network_servers.data.result);
        return network_servers;
    } catch (err) {
        throw err;
        //Error getting network servers from lora app server
    }
}
module.exports = {
    get: async function (req, res) {
        try {
            let network_servers_lora = await get_network_servers()
                .catch(err => {
                    //Error getting network_servers from lora app server
                    throw error.error_message("network servers : lora app server", err.message);
                });
                console.log(network_servers_lora)
            res.status(200).send({ network_servers_lora: network_servers_lora, message: 'Network Servers fetched', type: 'success' });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Failed to get network servers", type: 'error' });
        }
    },
    get_one_network_server: async function(req, res){
        try{

        }catch(err){
            console.log(err)
        }
    },
    create_network_server: async function(req, res){
        try{

        }catch(err){
            console.log(err)
        }
    },
    update_network_server: async function(req, res){
        try{

        }catch(err){
            console.log(err)
        }
    },
    delete_network_server: async function(req, res){
        try{

        }catch(err){
            console.log(err)
        }
    }
}