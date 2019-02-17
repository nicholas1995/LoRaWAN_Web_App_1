var mongojs = require('mongojs');
var db = mongojs('mongodb://nicholas:nicholas1508@ds237955.mlab.com:37955/lora_device_uplink_secondary_storage', ['device_uplink']);

module.exports = db;  
