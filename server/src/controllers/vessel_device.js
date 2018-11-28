const DB_VESSEL_DEVICE = require("../services/database/vessel_device_db");
const DB_VESSEL = require("../services/database/vessel_device_db");
const VError = require('verror');

function error_message(current_error_message, previous_error){
    let error = new VError("%s : %s", current_error_message, previous_error);  
    return error;
}

module.exports = {
    get: async function(req, res) {
        //need to split up into two seperate fetches. One for self and another for all 
        let error_location = null; //1=db
        try{ 
            
        }catch(err){
            
        }
    },
    add_device_to_default_vessel: async function (device_id, device_eui, sub_network_id){
        try{
            let default_vessel = await DB_VESSEL.get_default_vessel_specified_sub_network(sub_network_id)
                .catch(err => {
                    //Error fetching the default vessel for a given sub_network
                    throw error_message("get default vessel for sub-network : database", err.message);
                });
            await DB_VESSEL_DEVICE.create(device_id, device_eui, default_vessel[0].id)
                .catch(err => {
                    //Error creating vessel device relationship 
                    throw error_message("create vessel device relationship : database", err.message);
                });
        }catch(err){
            console.log(err)
            throw err;
        }
    },
    update: async function(req, res){
        try{
            
        }catch(err){
            
        }
    },
    delete: async function(req, res){
        try{
            
        }catch(err){

        }
    }
}
