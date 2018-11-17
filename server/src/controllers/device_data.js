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

function convert_from_ui_to_db(headers) {
    try {
        for (let i = 0; i < headers.length; i++) {
            headers = convert_to_underscore(headers);
        }
        console.log(headers)
        return headers;
    } catch (err) {
        console.log(err);
    }
}

function convert_to_space(name){
    name = name.replace("_", " ");
    return name;
}

function convert_to_underscore(name) {
    name = name.replace(" ", "_");
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
    },
    get_specified_headings: async function(req, res){
        try{
            let headers, order, device_data
            headers = convert_from_ui_to_db(req.params.headers);
            if (req.params.descending == 'false') {
                order = "ASC";
            } else {
                order = "DESC";
            }
            device_data= await DB.get_specified_headings(req.params.sort_by, order, headers)
                .catch(err => {
                    //Error fetching specified data headings from db
                    throw err;
                })
            headers = header(device_data[0]);
            device_data = JSON.stringify(device_data);
            headers = JSON.stringify(headers);
            res.status(200).send({ device_data: device_data, headers: headers, message: 'Device data fetched', type: 'success' });
        }catch(err){
            console.log(err);
        }
    }
}