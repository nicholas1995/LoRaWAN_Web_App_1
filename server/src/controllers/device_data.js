const DB = require("../services/database/device_rx_db");
const DB_USER_VESSEL = require ("../services/database/user_vessel_db")
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
function return_date(date) {
    try{
        if (date == "" || date == null) {
            full_date = "N/A"
        } else {
            date = new Date(date);
            let month = return_month(date.getMonth()); //returns the month in 3 letters
            let day = add_zero(date.getDate());
            let year = date.getFullYear() - 2000; //converts the full year to 2 digits 
            let hour = date.getHours(); ;
            let minutes = add_zero(date.getMinutes());
            let seconds = add_zero(date.getSeconds());
            full_date = day + "-" + month + "-" + year + " " + hour + ":" + minutes + ":" + seconds;
        }
        return full_date;
    }catch(err){
        console.log(err)
    }
} 
    //This function takes the month in numerical form from 0:11 and reutrn the first 3 letters of the month
function return_month(month) {
        switch (month) {
            case 0:
                return 'Jan';
            case 1:
                return 'Feb';
            case 2:
                return 'Mar';
            case 3:
                return 'Apr';
            case 4:
                return 'May';
            case 5:
                return 'Jun';
            case 6:
                return 'Jul';
            case 7:
                return 'Aug';
            case 8:
                return 'Sep';
            case 9:
                return 'Oct';
            case 10:
                return 'Nov';
            case 11:
                return 'Dec';
            default:
                return 'NA';
        }
    }

function device_uplink_headers_database_to_table_LUT(device_uplink_table_headers_database, view) { //takes in the headers of the database and returns the table version
    switch (device_uplink_table_headers_database) {
      case "device_uplink_id":
            return "Device Uplink ID";
        break;
      case "device_id":
            return "Device ID";
        break;
      case "sub_network_id":
        if(view == 'all'){
            return "Sub-Network ID";
        break;
        }else if(view == 'self'){
            return null;
        break;
        }
      case "vessel_id":
            return "Vessel ID";
        break;
      case "time_stamp":
            return "Time Stamp";
        break;
      case "sub_network_name":
        if(view == 'all'){
            return "Sub Network Name";
        break;
        }else if(view == 'self'){
            return null;
        break;
        }
      case "device_eui":
            return "Device EUI";
        break;
      case "device_name":
            return "Device Name";
        break;
      case "gateway_id_lora":
        if(view == 'all'){
            return "Gateway ID LoRa";
        break;
        }else if(view == 'self'){
            return null;
        break;
        }
      case "gateway_name":
        if(view == 'all'){
            return "Gateway Name";
        break;
        }else if(view == 'self'){
            return null;
        break;
        }
      case "rx_time":
        if(view == 'all'){
            return "Rx Time";
        break;
        }else if(view == 'self'){
            return null;
        break;
        }
      case "rx_rssi":
        if(view == 'all'){
            return "Rx RSSI";
        break;
        }else if(view == 'self'){
            return null;
        break;
        }
      case "rx_lora_snr":
        if(view == 'all'){
            return "Tx LoRa SNR";
        break;
        }else if(view == 'self'){
            return null;
        break;
        }
      case "gateway_latitude":
        if(view == 'all'){
            return "Gateway Latitude";
        break;
        }else if(view == 'self'){
            return null;
        break;
        }
      case "gateway_longitude":
        if(view == 'all'){
            return "Gateway Longitude";
        break;
        }else if(view == 'self'){
            return null;
        break;
        }
      case "gateway_altitude":
        if(view == 'all'){
            return "Gateway Altitude";
        break;
        }else if(view == 'self'){
            return null;
        break;
        }
      case "tx_frequency":
        if(view == 'all'){
            return "Tx Frequency";
        break;
        }else if(view == 'self'){
            return null;
        break;
        }
      case "tx_data_rate":
        if(view == 'all'){
            return "Tx Data Rate";
        break;
        }else if(view == 'self'){
            return null;
        break;
        }
      case "adr":
        if(view == 'all'){
            return "ADR";
        break;
        }else if(view == 'self'){
            return null;
        break;
        }
      case "frame_counter":
        if(view == 'all'){
            return "Frame Counter";
        break;
        }else if(view == 'self'){
            return null;
        break;
        }
      case "fport":
        if(view == 'all'){
            return "FPort";
        break;
        }else if(view == 'self'){
            return null;
        break;
        }
      case "encoded_data":
        if(view == 'all'){
            return "Encoded Data";
        break;
        }else if(view == 'self'){
            return null;
        break;
        }
      case "gps_latitude":
            return "GPS Latitude";
        break;
      case "gps_longitude":
            return "GPS Longitude";
        break;
      case "gps_altitude":
            return "GPS Altitude";
        break;
      default:
        return "Null";
    }
}

function device_uplink_headers_table_to_database_LUT(device_uplink_table_headers_table) { //takes in the headers of the table and returns the database version
    switch (device_uplink_table_headers_table) {
      case "Device Uplink ID":
        return "device_uplink_id";
        break;
      case "Device ID":
        return "device_id";
        break;
      case "Sub-Network ID":
        return "sub_network_id";
        break;
      case "Vessel ID":
        return "vessel_id";
        break;
      case "Time Stamp":
        return "time_stamp";
        break;
      case "Sub Network Name":
        return "sub_network_name";
        break;
      case "Device EUI":
        return "device_eui";
        break;
      case "Device Name":
        return "device_name";
        break;
      case "Gateway ID LoRa":
        return "gateway_id_lora";
        break;
      case "Gateway Name":
        return "gateway_name";
        break;
      case "Rx Time":
        return "rx_time";
        break;
      case "Rx RSSI":
        return "rx_rssi";
        break;
      case "Tx LoRa SNR":
        return "rx_lora_snr";
        break;
      case "Gateway Latitude":
        return "gateway_latitude";
        break;
      case "Gateway Longitude":
        return "gateway_longitude";
        break;
      case "Gateway Altitude":
        return "gateway_altitude";
        break;
      case "Tx Frequency":
        return "tx_frequency";
        break;
      case "Tx Data Rate":
        return "tx_data_rate";
        break;
      case "ADR":
        return "adr";
        break;
      case "Frame Counter":
        return "frame_counter";
        break;
      case "FPort":
        return "fport";
        break;
      case "Encoded Data":
        return "encoded_data";
        break;
      case "GPS Latitude":
        return "gps_latitude";
        break;
      case "GPS Longitude":
        return "gps_longitude";
        break;
      case "GPS Altitude":
        return "gps_altitude";
        break;
      default:
        return "Null";
    }
}
//Takes as the input an array of lenght 1 of the device uplink data and returns the headers in the form {text: "Table form", value: "database form"};
//view is a variable that holds the permission of the user fetching the data.... can be either 'all' or 'self'
function convert_device_uplink_headers_database_to_table(device_uplink, view) {
    let headers_database = Object.keys(device_uplink);
    let headers_table = [];
    let place_holder = {}; //object which will store the text and value data
    let x; //this is just a place holder for the value returned by device_uplink_headers_database_to_table_LUT
    for (let i = 0; i < headers_database.length; i++) {
        x = device_uplink_headers_database_to_table_LUT(headers_database[i], view);
        if(x != null){
            place_holder["text"] = x;
            place_holder["value"] = headers_database[i];
            headers_table.push(place_holder);
            place_holder = {};
        }
    }
    return headers_table;
}
//Takes as the input an array of lenght 1 of the device uplink data and returns the headers in the form {text: "Table form", value: "database form"};
function convert_gateway_statistics_headers_table_to_database(columns) {
    try {
        let headers_table = columns.split(",");
        let headers_database = []
        for (let i = 0; i < headers_table.length; i++) {
            headers_database[i] = device_uplink_headers_table_to_database_LUT(headers_table[i]);
        }
        return headers_database;

    } catch (err) {
        console.log(err)
    }
}

    //This function ensures that the digit returned has 2 digits (eg 1-> 01)
function add_zero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
function convert_dates(data){
    for(let i =0; i< data.length; i++){
        data[i]["rx_time"] = return_date(data[i]["rx_time"]);
        data[i]["time_stamp"] = return_date(data[i]["time_stamp"]);
    }
    return data;
}

module.exports = {
    get: async function (req, res) {
        let device_data, headers;
        try { 
            if (req.params.descending){  //this is to add in parameters for the first call so we dont need to make a new function :)
            }else{
                req.params.sort_by = 'device_uplink_id';
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
            if (device_data.length > 0) {
                headers = convert_device_uplink_headers_database_to_table(device_data[0], 'all');
                device_data = convert_dates(device_data);
                device_data = JSON.stringify(device_data);
                headers = JSON.stringify(headers);
                res.status(200).send({ device_data: device_data, headers: headers, message: 'Device data fetched', type: 'success' });
            } else {
                res.status(204).send({ message: 'No Data Available', type: 'info' });//No data retrived
            }
        } catch (err) { 
            console.log(err);
        }
    },
    get_self: async function (req, res) {
        try {
            let headers;
            let sql_where = [];
            let where = '';
            let sql = `SELECT * FROM device_uplink `;
            let user_vessels = await DB_USER_VESSEL.get_user_vessel(null, req.user.id, null, null)
                .catch(err => {
                    //Error fetching vessels for user
                    throw err;
                });
            if(user_vessels.length > 0){ //User has a vessel assigned
                for (let i = 0; i < user_vessels.length; i++) {
                    if (user_vessels[i].date_deleted == null) {
                        sql_where.push(`time_stamp > '${user_vessels[i].date_created}'`);
                    } else {
                        sql_where.push(`time_stamp > '${user_vessels[i].date_created}'`);
                        sql_where.push(`time_stamp < '${user_vessels[i].date_deleted}'`);
                    }
                    sql_where.push(`vessel_id = '${user_vessels[i].vessel_id}'`);
                    where = `${where} (`;
                    for (let j = 0; j < sql_where.length; j++) {
                        if (j < sql_where.length - 1) {
                            //will run every time but the last cause we do not want it ending with AND
                            where = where + `${sql_where[j]} AND `;
                        } else {
                            where = where + `${sql_where[j]}`;
                        }
                    }
                    if (i != user_vessels.length - 1) { where = `${where}) OR` }
                    else { where = `${where})` }
                    sql_where = [];
                }
                sql = ` ${sql} WHERE ${where} ORDER BY time_stamp DESC`
                let device_data = await DB.get_specified_parameters(sql)
                    .catch(err => {
                        throw err;
                    })
                headers = convert_device_uplink_headers_database_to_table(device_data[0], 'self');
                device_data = convert_dates(device_data);
                device_data = JSON.stringify(device_data);
                headers = JSON.stringify(headers);
                res.status(200).send({ device_data: device_data, headers: headers, message: 'Device data fetched', type: 'success' });
            }else{
                res.status(204).send({ message: 'No Data Available', type: 'info' });//No data retrived
            }
        } catch (err) {
            console.log(err);
        }
    }, 
    get_filtered: async function(req, res){
        let sql_where = [];
        let where = '';
        let sql_order_by = [];
        let sql = '';
        let access = 'all';// This will be set to 1 if the data is being fetched for the users vessels
        try {
            if(req.access == "self" || req.params.access == "self"){
                access = 'self';
                let user_vessels = await DB_USER_VESSEL.get_user_vessel(null, req.user.id, null, null)
                    .catch(err => {
                        //Error fetching vessels for user
                        throw err;
                    });
                for (let i = 0; i < user_vessels.length; i++) {
                    if (user_vessels[i].date_deleted == null) {
                        sql_where.push(`time_stamp > '${user_vessels[i].date_created}'`);
                    } else {
                        sql_where.push(`time_stamp > '${user_vessels[i].date_created}'`);
                        sql_where.push(`time_stamp < '${user_vessels[i].date_deleted}'`);
                    }
                    sql_where.push(`vessel_id = '${user_vessels[i].vessel_id}'`);
                    where = `${where} (`;
                    for (let j = 0; j < sql_where.length; j++) {
                        if (j < sql_where.length - 1) {
                            //will run every time but the last cause we do not want it ending with AND
                            where = where + `${sql_where[j]} AND `;
                        } else {
                            where = where + `${sql_where[j]}`;
                        }
                    }
                    if (i != user_vessels.length - 1) { where = `${where}) OR` }
                    else { where = `${where})` }
                    sql_where = [];
                }
                where = `(${where}) ` //Puts the user filter data in brackets
            }
            let parameters = JSON.parse(req.params.parameters); 
            let columns = req.params.columns
            if (columns) {
                columns = convert_gateway_statistics_headers_table_to_database(columns);
                sql = `SELECT ${columns} FROM device_uplink `;
            }
            if(parameters.start_date){
                sql_where.push(`time_stamp > '${parameters.start_date}'`); //We use the time stamp because the rx_time will only be present if we have the receive gw metadata option enabled
            }if(parameters.end_date){
                sql_where.push(`time_stamp < '${parameters.end_date}'`);
            }
            //We need to add the access check because if it is self the user can only filter the data based on the vessel and the device
            if (parameters.device && access == 'all') {
                sql_where.push(`device_id IN (${parameters.device}) AND vessel_id IN (${parameters.vessel}) AND sub_network_id IN (${parameters.sub_network})`);
            } else if (parameters.device && access == 'self') {
                sql_where.push(`device_id IN (${parameters.device}) AND vessel_id IN (${parameters.vessel})`);
            } else if (parameters.vessel && access == 'all') {
                sql_where.push(`vessel_id IN (${parameters.vessel}) AND sub_network_id IN (${parameters.sub_network})`);
            } else if (parameters.vessel && access == 'self') {
                sql_where.push(`vessel_id IN (${parameters.vessel})`);
            }  else if (parameters.sub_network) {
                sql_where.push(`sub_network_id IN (${parameters.sub_network})`);
            }


            if (parameters.start_date || parameters.end_date || parameters.device || parameters.vessel || parameters.sub_network) {
                if (req.access == "self" || req.params.access == "self") {
                  where = `${where} AND `; //If we have filter parameters AND it with the user fetch filter
                }
              for (let i = 0; i < sql_where.length; i++) {
                if (i < sql_where.length - 1) {
                  //will run every time but the last cause we do not want it ending with AND
                  where = where + `${sql_where[i]} AND `;
                } else {
                  where = where + `${sql_where[i]}`;
                }
              }
            }
            if(where){
                sql = ` ${sql} WHERE ${where}`
            }
            if(parameters.sort_by){ 
                sql = `${sql} ORDER BY ${parameters.sort_by} ${parameters.order}, time_stamp DESC`;
            }else{//So that no mater what the data is ordered in descending order based on the timestamp
                sql = `${sql} ORDER BY time_stamp DESC`;
            }
            let device_data = await DB.get_specified_parameters(sql)
                .catch(err => {
                    throw err; 
                })
            if(device_data.length>0){
                headers = convert_device_uplink_headers_database_to_table(device_data[0], access);
                device_data = convert_dates(device_data);
                device_data = JSON.stringify(device_data);
                headers = JSON.stringify(headers);
                res.status(200).send({ device_data: device_data, headers: headers, message: 'Device data fetched', type: 'success' });
            }else{
                res.status(204).send({message: 'No Data Available', type: 'info'});//No data retrived
            }
        }catch(err){
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
            device_data = convert_dates(device_data);
            device_data = JSON.stringify(device_data);
            headers = JSON.stringify(headers);
            res.status(200).send({ device_data: device_data, headers: headers, message: 'Device data fetched', type: 'success' });
        }catch(err){
            console.log(err);
        }
    }, get_specified_id: async function (req, res) { //TEST(TO DELETE)
        try {
            let device_data
            device_data = await DB.get_specified_id(req.params.device_uplink_id)
                .catch(err => {
                    //Error fetching specified data headings from db
                    throw err;
                })
            device_data = JSON.stringify(device_data);
            res.status(200).send({ device_data: device_data, message: 'Device data fetched', type: 'success' });
        } catch (err) {
            console.log(err);
        }
    },
    get_specified_headings_date: async function(req, res){
        try {
            let headers, order, device_data
            headers = convert_from_ui_to_db(req.params.headers);
            if (req.params.descending == 'false') {
                order = "ASC"; 
            } else {
                order = "DESC";
            }
            device_data = await DB.get_specified_headings_date(req.params.sort_by, order, headers, req.params.start_date, req.params.end_date)
                .catch(err => {
                    //Error fetching specified data headings from db
                    throw err;
                })
            headers = header(device_data[0]);
            device_data = convert_dates(device_data);
            device_data = JSON.stringify(device_data);
            headers = JSON.stringify(headers);
            res.status(200).send({ device_data: device_data, headers: headers, message: 'Device data fetched', type: 'success' });
        } catch (err) {
            console.log(err);
        }
    }
}