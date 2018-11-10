const lora_app_server = require("../services/API/lora_app_server");
const error = require("../services/errors");
const VError = require("verror");


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
        let request_params = gateway_api_request_data(null, 0);
        let gateways = await lora_app_server.get_gateways(request_params)
            .catch(err => {
                let error = new VError("%s", err.message);
                throw error;
            });
        gateways = convert_names_gateways(gateways.data.result);
        return gateways;
    } catch (err) {
        throw err;
    }
}
 
module.exports = {
    get: async function(req, res){
        let error_location = null; //0=lora
        let gateways_lora;
        try{
            gateways_lora = await get_gateways()
            .catch(err => {
                //Error getting gateways from lora app server
                error_location = 0;
                throw error.error_message("get gateways : lora app server", err.message);
            });
            gateways_lora = JSON.stringify(gateways_lora);
            res.status(200).send({ gateways_lora: gateways_lora, message: 'Gateways fetched', type: 'success' });
        }catch(err){
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to get gateways", type: 'error' });
            }else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    get_one: async function (req, res) {
        try {
            let gateway = await lora_app_server.get_gateway_one(req.params.gateway_id)
                .catch(err => {
                    //Error getting gateways from lora app server
                    throw error.error_message("get gateway : lora app server", err.message);
                });
            gateway = gateway.data.gateway;
            gateway = convert_name_gateway_single(gateway);
            gateway = JSON.stringify(gateway);
            res.status(200).send({ gateway });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Failed to get gateway", type: 'error' });
        }
    },
    create: async function(req, res){
        let error_location = null; //0=lora 1=lora
        let gateways_lora;
        try{
            let data = JSON.parse(req.body.data);
            let request_body = gateway_api_request_data(data, 1);
            result = await lora_app_server.create_gateways(request_body)
            .catch(err => {
                //Error creating gateway 
                error_location = 0;
                throw error.error_message("create gateways : lora app server", err.message);
            });
            gateways_lora = await get_gateways()
            .catch(err => {
                //Error getting gateways from lora app server
                error_location = 1;
                throw error.error_message("create gateways : lora app server", err.message);
            });
            gateways_lora = JSON.stringify(gateways_lora);
            res.status(201).send({ gateways_lora: gateways_lora, message: 'Gateway created', type: 'success' });
        }catch(err){
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to create gateway", type: 'error' });
            } else if (error_location == 1) {
                gateways_lora = JSON.stringify([]);
                res.status(201).send({ gateways_lora: gateways_lora, message: "Gateway Created. Failed to fetch gateways", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    update: async function(req, res){
        let error_location = null; //0=lora 1=lora
        let gateways_lora;
        try{
            let data = JSON.parse(req.body.data);
            let request_body = gateway_api_request_data(data, 1);
            await lora_app_server.update_gateways(request_body, req.params.gateway_id)
                .catch(err => {
                    //Error updating gateway
                    error_location = 0;
                    throw error.error_message("update gateways : lora app server", err.message);
                });
            gateways_lora = await get_gateways()
                .catch(err => {
                    //Error getting gateways from lora app server
                    error_location = 1;
                    throw error.error_message("update gateways : lora app server", err.message);
                });
            gateways_lora = JSON.stringify(gateways_lora);
            res.status(201).send({ gateways_lora: gateways_lora, message: 'Gateway updated', type: 'success' });
        }catch(err){
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to update gateway", type: 'error' });
            } else if (error_location == 1) {
                gateways_lora = JSON.stringify([]);
                res.status(201).send({ gateways_lora: gateways_lora, message: "Gateway updated. Failed to fetch gateways", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    delete: async function(req, res){
        let error_location = null; //0=lora 1=lora
        let gateways_lora;
        try{
            await lora_app_server.delete_gateways(req.params.gateway_id)
                .catch(err => {
                    //Error delete gateway form lora app server
                    error_location = 0;
                    throw error.error_message("delete gateway : lora app server", err.message);
                });
            gateways_lora = await get_gateways()
                .catch(err => {
                    //Error getting gateways from lora app server
                    error_location = 1;
                    throw error.error_message("delete gateways : lora app server", err.message);
                });
            gateways_lora = JSON.stringify(gateways_lora); 
            res.status(200).send({ gateways_lora: gateways_lora, message: 'Gateway deleted', type: 'success' });
        }catch(err){
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to delete gateway", type: 'error' });
            } else if (error_location == 1) {
                gateways_lora = JSON.stringify([]);
                res.status(200).send({ gateways_lora: gateways_lora, message: "Gateway deleted. Failed to fetch gateways", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    }
}
