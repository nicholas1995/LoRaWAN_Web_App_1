const lora_app_server = require("../services/API/lora_app_server");
const db_gateway = require('../services/database/gateway_db');
const compare = require("../services/compare");
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
                "description": `${data.gateway_description}`,
                "discoveryEnabled": data.discovery_enabled,
                "gatewayProfileID": `${data.gateway_profile_id}`,
                "id": `${data.gateway_id_lora}`,
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
      gateway_id_lora: null,
      gateway_description: null,
      network_id: null,
      network_server_id: null,
      gateway_created_at: null,
      gateway_updated_at: null
  };
    for (let i = 0; i < gateways.length; i++) {
        gateway.gateway_name = gateways[i].name;
        gateway.gateway_id_lora = gateways[i].id;
        gateway.gateway_description = gateways[i].description;
        gateway.network_id = gateways[i].organizationID;
        gateway.network_server_id = gateways[i].networkServerID;
        gateway.gateway_created_at = gateways[i].createdAt;
        gateway.gateway_updated_at = gateways[i].updatedAt;
        gateways_return[i] = gateway;
        gateway = {
            gateway_name: null,
            gateway_id_lora: null,
            gateway_description: null,
            network_id: null,
            network_server_id: null,
            gateway_created_at: null,
            gateway_updated_at: null
        };
  }
    return gateways_return;
}
function convert_name_gateway_single(result){
    let gateway = {
        gateway_id_lora: result.id,
        gateway_name: result.name,
        gateway_description: result.description,
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
        let gateways_lora = await lora_app_server.get_gateways(request_params)
            .catch(err => {
                throw new VError("%s", err.message);
            });
        gateways_lora = convert_names_gateways(gateways_lora.data.result);
        let gateways_db = await db_gateway.get_gateway()
            .catch(err => {
                //Error getting gateways from database
                throw new VError("%s", err.message);
            });
        await compare.compare_gateways(gateways_lora, gateways_db)
            .catch(err => {
                //Error comparing
                throw new VError("%s", err.message);
            })
        gateways_db = await db_gateway.get_gateway()
            .catch(err => {
                //Error getting gateways from database
                throw new VError("%s", err.message);
            });
        gateways_lora = parse(gateways_lora, gateways_db);
        return gateways_lora;
    } catch (err) {
        throw err;
    }
}
function parse(gateway_lora, gateways_db) {
    try {
        for (let i = 0; i < gateway_lora.length; i++) {
            for (let j = 0; j < gateways_db.length; j++) {
                if (gateway_lora[i].gateway_id_lora == gateways_db[j].gateway_id_lora) {
                    gateway_lora[i]["gateway_id"] = gateways_db[j].gateway_id;
              }
            }
        }
        return gateway_lora;
    } catch (err) {
        throw new VError("%s", err.message);
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
            let gateway = await lora_app_server.get_gateway_one(req.params.gateway_id) //check to see if its the id or id_lora
                .catch(err => {
                    //Error getting gateways from lora app server
                    throw error.error_message("get gateway : lora app server", err.message);
                });
            gateway = gateway.data.gateway;
            gateway = convert_name_gateway_single(gateway);
            res.status(200).send({ gateway });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Failed to get gateway", type: 'error' });
        }
    },
    get_map: async function (req, res){
        try{
            let gateways = []; //This is an array that holds all the information returns for individual gateway calls
            let gateways_lora = await get_gateways()
                .catch(err => {
                    //Error getting gateways from lora app server
                    error_location = 0;
                    throw error.error_message("get gateways : lora app server", err.message);
                });
                let gateway ;
            for(let i = 0; i < gateways_lora.length; i++){
                gateway = await lora_app_server.get_gateway_one(gateways_lora[i].gateway_id_lora)
                    .catch(err => {
                        //Error getting gateways from lora app server
                        throw error.error_message("get gateway : lora app server", err.message);
                    });
                gateway = gateway.data.gateway;
                gateway = convert_name_gateway_single(gateway);
                gateways[i] = gateway;
            }
            res.status(200).send({ gateways : gateways });
        }catch(err){
            console.log(err);
            res.status(500).send({ message: "Failed to get gateway", type: 'error' });
        }
    },
    get_gateways_database: async function (req, res) {
        try {
            let gateways = await db_gateway.get_gateway_all()
                .catch(err => {
                    //Error getting gateways from database
                    throw new VError("%s", err.message);
                });
            res.status(200).send({ gateways: gateways });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Failed to get gateway", type: 'error' });
        }
    },
    create: async function(req, res){
        let error_location = null; //0=lora 1=lora
        try{
            let data = req.body.gateway;
            let request_body = gateway_api_request_data(data, 1);
            result = await lora_app_server.create_gateways(request_body)
            .catch(err => {
                //Error creating gateway 
                error_location = 0;
                throw error.error_message("create gateways : lora app server", err.message);
            });
            await db_gateway.create_gateway(data.network_id, data.gateway_name, data.gateway_id_lora, data.gateway_description, data.network_server_id)
                .catch(err => {
                    //Error creating gateway record in database
                    error_location = 1;
                    throw error.error_message("create gateways : database", err.message);
                })
            res.status(201).send({ message: 'Gateway created', type: 'success' });
        }catch(err){
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to create gateway", type: 'error' });
            } else if (error_location == 1) {
                res.status(201).send({ message: "Gateway to create gateway record in database", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    update: async function(req, res){
        let error_location = null; //0=lora 1=lora
        try{
            let data = req.body.gateway;
            let request_body = gateway_api_request_data(data, 1);
            await lora_app_server.update_gateways(request_body, data.gateway_id_lora)
                .catch(err => {
                    //Error updating gateway
                    error_location = 0;
                    throw error.error_message("update gateways : lora app server", err.message);
                });
            await db_gateway.update_gateway_all_parameters(data, req.params.gateway_id)
                .catch(err => {
                    //Error Updating gateway in database
                    error_location = 1;
                    throw error.error_message("update gateways : database", err.message);
                })
            res.status(201).send({ message: 'Gateway updated', type: 'success' });
        }catch(err){
            console.log(err);
            if (error_location == 0) {
                res.status(500).send({ message: "Failed to update gateway", type: 'error' });
            } else if (error_location == 1) {
                res.status(201).send({message: "Failed to update gateway record in database.", type: 'info' })
            } else {
                res.status(500).send({ message: 'Error', type: 'error' })
            }
        }
    },
    delete: async function(req, res){
        let error_location = null; //0=lora 1=lora
        let gateways_lora;
        try{
            await lora_app_server.delete_gateways(req.params.gateway_id_lora)
                .catch(err => {
                    //Error delete gateway form lora app server
                    error_location = 0;
                    throw error.error_message("delete gateway : lora app server", err.message);
                });
            let request_params = gateway_api_request_data(null, 0);
            gateways_lora = await lora_app_server.get_gateways(request_params)
                .catch(err => {
                    throw new VError("%s", err.message);
                });
            gateways_lora = convert_names_gateways(gateways_lora.data.result);
            await db_gateway.update_gateway('gateway_deleted', 1, req.params.gateway_id_lora)
                .catch(err => {
                    //Error deleting gateway from database
                    throw error.error_message("delete gateways : database", err.message);
                })
            gateways_db = await db_gateway.get_gateway()
                .catch(err => {
                    //Error getting gateways from database
                    throw new VError("%s", err.message);
                });
            gateways_lora = parse(gateways_lora, gateways_db);
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
