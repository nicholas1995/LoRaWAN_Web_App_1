const DB = require("../services/database/device_uplink_db");
const error = require("../services/errors");
const VError = require("verror");


module.exports = {
    get: async function (req, res) {
        let device_data;
        try {
            console.log(req.params)
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
            device_data = JSON.stringify(device_data);
            res.status(200).send({ device_data: device_data, message: 'Device data fetched', type: 'success' });
        } catch (err) { 
            console.log(err);
        }
    }
}