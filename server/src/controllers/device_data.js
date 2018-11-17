const DB = require("../services/database/device_uplink_db");
const error = require("../services/errors");
const VError = require("verror");

function header(row){
    try{
        let ui = [], db = [], headers = [];
        let i = 0;
        for (let key in row) {
          ui[i] = convert_to_space(key);
          db[i]= key;
          i = i+1;
        }
        for(let j =0; j<ui.length; j++){
            headers.push({text: ui[j], value: db[j]})
        }
        return headers;
    }catch(err){
        console.log(err);
    }
}
function convert_to_space(name){
    name = name.replace("_", " ");
    return name;
}

module.exports = {
    get: async function (req, res) {
        let device_data, headers;
        try { 
            if (req.params.descending){  //this is to add in parameters for the first call so we dont need to make a new function :)
            }else{
                req.params.sort_by = 'id';
                req.params.descending = 'false'
            }
            console.log(req.params.descending);
            let order;
            if(req.params.descending == 'false'){
                order = "ASC";
            }else{
                order = "DESC";
            }
            device_data = await DB.get(req.params.sort_by, order)
                .catch(err => {
                    //Error getting device data from DB
                    throw error.error_message("get device data : database", err.message);
                });
            headers = header(device_data[0]);
            device_data = JSON.stringify(device_data);
            headers = JSON.stringify(headers);
            res.status(200).send({ device_data: device_data, headers: headers, message: 'Device data fetched', type: 'success' });
        } catch (err) { 
            console.log(err);
        }
    }
}