const lora_app_server = require("../services/API/lora_app_server");


function gateway_api_request_data(data, type) {
    let request;
    if (type == 0) {//get form 
        request = {
            limit: 100,
            //offset: null,
            //search: null
        }
    }
    else if (type == 1) {//create form
        try{
        request = {
            "gateway": {
                "description": `${data.description}`,
                "discoveryEnabled": data.discovery_enabled,
                "gatewayProfileID": `${data.gateway_profile_id}`,
                "id": `${data.gateway_id}`,
                "location": {
                    "accuracy": data.gateway_accuracy,
                    "altitude": data.gateway_altitude ,
                    "latitude": data.gateway_latitude ,
                    "longitude": data.gateway_longitude ,
                    "source": `${data.gateway_location_source}`
                },
                "name": `${data.gateway_name}`,
            "networkServerID": `${data.network_server_id}`,
            "organizationID": `${data.network_id}`
            }
        }
            let x ={}; //random object just to hold the values
            if (data.fine_time_stamp_key != '') {
                x["fineTimestampKey"] = `${data.fine_time_stamp_key}`;
            }
            if (data.fpga_id != '') {
                x["fpgaID"] = `${data.fpga_id}`;
            }
            if (data.fine_time_stamp_key != '' || data.fpga_id != '') { //This will only set these parameters if they have values.
                request["gateway"]["boards"] = [];                       //This was done because these are optional.
                request["gateway"]["boards"].push(x);  
            }
    }catch(err){
        console.log(err)
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
function p(){
    console.log('hereeee');
}

function convert_names_gateways(gateways) {
    let gateways_return = [];
  let gateway = {
      gateway_name: null,
      gateway_id: null,
      description: null,
      network_id: null,
      network_server_id: null,
      created_at: null,
      updated_at: null
  };
    for (let i = 0; i < gateways.length; i++) {
        gateway.gateway_name = gateways[i].name;
        gateway.gateway_id = gateways[i].id;
        gateway.description = gateways[i].description;
        gateway.network_id = gateways[i].organizationID;
        gateway.network_server_id = gateways[i].networkServerID;
        gateway.created_at = gateways[i].createdAt;
        gateway.updated_at = gateways[i].updatedAt;
        gateways_return[i] = gateway;
        gateway = {
            gateway_name: null,
            gateway_id: null,
            description: null,
            network_id: null,
            network_server_id: null,
            created_at: null,
            updated_at: null
        };
  }
    return gateways_return;
}
function convert_name_gateway_single(result){
    let gateway = {
        gateway_id: result.id,
        gateway_name: result.name,
        description: result.description,
        network_id: result.organizationID,
        network_server_id: result.networkServerID,
        gateway_profile_id: result.gatewayProfileID,
        gateway_accuracy: result.location.accuracy,
        gateway_altitude: result.location.altitude,
        gateway_latitude: result.location.latitude,
        gateway_longitude: result.location.longitude,
        gateway_location_source_form: result.location.source,
        discovery_enabled: result.discoveryEnabled,
    }
    if (result["boards"][0] != null) {
        if (result["boards"][0]["fpgaID"] != null) {
            gateway["fpga_id"] = result.boards[0].fpgaID
        } else {
            gateway["fpga_id"] = '';
        }
        if (result["boards"][0]["fineTimestampKey"] != null) {
            gateway["fine_time_stamp_key"] = result.boards[0].fineTimestampKey;
        } else {
            gateway["fine_time_stamp_key"] = "";
        }
    } else {
        gateway["fpga_id"] = "";
        gateway["fine_time_stamp_key"] = "";
    }
    return gateway;
}

async function get_gateways() {
    try {
        let request_body = gateway_api_request_data(null, 0);
        let gateways = await lora_app_server.get_gateways(request_body)
            .catch(err => {
                throw err;
            });
        gateways = convert_names_gateways(gateways.data.result);
        return gateways;
    } catch (err) {
        throw err;
    }
}
 
module.exports = {
    get: async function(req, res){
        try{
            let gateways_lora = await get_gateways()
            .catch(err => {
                throw err;
                //Error getting gateways from lora app server
            });
            gateways_lora = JSON.stringify(gateways_lora);
            res.status(200).send({ gateways_lora });
        }catch(err){
            console.log(err);
        }
    },
    get_one: async function (req, res) {
        try {
            let gateway = await lora_app_server.get_gateway_one(req.params.gateway_id)
                .catch(err => {
                    throw err;
                    //Error getting gateways from lora app server
                });
            gateway = gateway.data.gateway;
            gateway = convert_name_gateway_single(gateway);
            gateway = JSON.stringify(gateway);
            res.status(200).send({ gateway });
        } catch (err) {
            console.log(err);
        }
    },
    create: async function(req, res){
        try{
            let data = JSON.parse(req.body.data);
            let request_body = gateway_api_request_data(data, 1);
            result = await lora_app_server.create_gateways(request_body)
            .catch(err => {
                throw err;
                //Error creating gateway 
            });
            let gateways_lora = await get_gateways()
            .catch(err => {
                throw err;
                //Error getting gateways from lora app server
            });
            gateways_lora = JSON.stringify(gateways_lora);
            res.status(200).send({ gateways_lora });
        }catch(err){
            console.log(err);
        }
    },
    update: async function(req, res){
        try{
            let data = JSON.parse(req.body.data);
            let request_body = gateway_api_request_data(data, 1);
            await lora_app_server.update_gateways(request_body, req.params.gateway_id)
                .catch(err => {
                    throw err;
                });
            let gateways_lora = await get_gateways()
                .catch(err => {
                    throw err;
                    //Error getting gateways from lora app server
                });
            gateways_lora = JSON.stringify(gateways_lora);
            res.status(200).send({ gateways_lora });
        }catch(err){
            console.log(err);
        }
    },
    delete: async function(req, res){
        let result = await lora_app_server.delete_gateways(req.params.gateway_id)
            .catch(err => {
                throw err;
                //Error delete gateway form lora app server
            });
        let gateways_lora = await get_gateways()
            .catch(err => {
                throw err;
                //Error getting gateways from lora app server
            });
        gateways_lora = JSON.stringify(gateways_lora); 
        res.status(200).send({ gateways_lora }); 
    }
}
