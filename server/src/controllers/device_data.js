const DB = require("../services/database/device_rx_db");
const DB_USER_VESSEL = require ("../services/database/user_vessel_db")
const error = require("../services/errors");
const VError = require("verror");
const email = require("../services/email");
const math = require("mathjs")


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
      case "device_id":
            return "Device ID";
      case "sub_network_id":
        if(view == 'all'){
            return "Sub-Network ID";
        }else if(view == 'self'){
            return null;
        }
      case "vessel_id":
            return "Vessel ID";
      case "time_stamp":
            return "Time Stamp";
      case "sub_network_name":
        if(view == 'all'){
            return "Sub Network Name";
        }else if(view == 'self'){
            return null;
        }
      case "device_eui":
            return "Device EUI";
      case "device_name":
            return "Device Name";
      case "gateway_id_lora":
        if(view == 'all'){
            return "Gateway ID LoRa";
        }else if(view == 'self'){
            return null;
        }
      case "gateway_name":
        if(view == 'all'){
            return "Gateway Name";
        }else if(view == 'self'){
            return null;
        }
      case "rx_time":
        if(view == 'all'){
            return "Rx Time";
        }else if(view == 'self'){
            return null;
        }
      case "rx_rssi":
        if(view == 'all'){
            return "Rx RSSI";
        }else if(view == 'self'){
            return null;
        }
      case "rx_lora_snr":
        if(view == 'all'){
            return "Tx LoRa SNR";
        }else if(view == 'self'){
            return null;
        }
      case "gateway_latitude":
        if(view == 'all'){
            return "Gateway Latitude";
        }else if(view == 'self'){
            return null;
        }
      case "gateway_longitude":
        if(view == 'all'){
            return "Gateway Longitude";
        }else if(view == 'self'){
            return null;
        }
      case "gateway_altitude":
        if(view == 'all'){
            return "Gateway Altitude";
        }else if(view == 'self'){
            return null;
        }
      case "tx_frequency":
        if(view == 'all'){
            return "Tx Frequency";
        }else if(view == 'self'){
            return null;
        }
      case "tx_data_rate":
        if(view == 'all'){
            return "Tx Data Rate";
        }else if(view == 'self'){
            return null;
        }
      case "adr":
        if(view == 'all'){
            return "ADR";
        }else if(view == 'self'){
            return null;
        }
      case "frame_counter":
        if(view == 'all'){
            return "Frame Counter";
        }else if(view == 'self'){
            return null;
        }
      case "fport":
        if(view == 'all'){
            return "FPort";
        }else if(view == 'self'){
            return null;
        }
      case "encoded_data":
        if(view == 'all'){
            return "Encoded Data";
        }else if(view == 'self'){
            return null;
        }
      case "gps_latitude":
            return "GPS Latitude";
      case "gps_longitude":
            return "GPS Longitude";
      case "gps_altitude":
            return "GPS Altitude";
      case "temperature":
            return "Temperature";
      case "accelerometer":
            return "Accelerometer";
      case "humidity":
            return "Humidity";
      case "sos":
            return "SOS";
      default:
        return "Null";
    }
}

function device_uplink_headers_table_to_database_LUT(device_uplink_table_headers_table) { //takes in the headers of the table and returns the database version
    switch (device_uplink_table_headers_table) {
      case "Device Uplink ID":
        return "device_uplink_id";
      case "Device ID":
        return "device_id";
      case "Sub-Network ID":
        return "sub_network_id";
      case "Vessel ID":
        return "vessel_id";
      case "Time Stamp":
        return "time_stamp";
      case "Sub Network Name":
        return "sub_network_name";
      case "Device EUI":
        return "device_eui";
      case "Device Name":
        return "device_name";
      case "Gateway ID LoRa":
        return "gateway_id_lora";
      case "Gateway Name":
        return "gateway_name";
      case "Rx Time":
        return "rx_time";
      case "Rx RSSI":
        return "rx_rssi";
      case "Tx LoRa SNR":
        return "rx_lora_snr";
      case "Gateway Latitude":
        return "gateway_latitude";
      case "Gateway Longitude":
        return "gateway_longitude";
      case "Gateway Altitude":
        return "gateway_altitude";
      case "Tx Frequency":
        return "tx_frequency";
      case "Tx Data Rate":
        return "tx_data_rate";
      case "ADR":
        return "adr";
      case "Frame Counter":
        return "frame_counter";
      case "FPort":
        return "fport";
      case "Encoded Data":
        return "encoded_data";
      case "GPS Latitude":
        return "gps_latitude";
      case "GPS Longitude":
        return "gps_longitude";
      case "GPS Altitude":
        return "gps_altitude";
      case "Temperature":
        return "temperature";
      case "Accelerometer":
        return "accelerometer";
      case "Humidity":
        return "humidity";
    case "SOS":
        return "sos";
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
function convert_dates(data, permission){ //to ensure that when a fisher downloads the data it does not have any info about rx_time
    for(let i =0; i< data.length; i++){
        if(permission =='self'){
            data[i]["time_stamp"] = return_date(data[i]["time_stamp"]);
        }else if(permission =='all'){
            data[i]["rx_time"] = return_date(data[i]["rx_time"]);
            data[i]["time_stamp"] = return_date(data[i]["time_stamp"]);
        }
    }
    return data;
}
function get_min_max_id_of_uplink_data(device_data){
    let max = 0;
    let min = 0;
    for(let i = 0; i< device_data.length; i++){
        if(i == 0){
            max = device_data[i].device_uplink_id;
            min = device_data[i].device_uplink_id;
        }else{
            if(device_data[i].device_uplink_id > max){
                max = device_data[i].device_uplink_id;
            }
            if(device_data[i].device_uplink_id < min){
                min = device_data[i].device_uplink_id;
            }
        }
    }
    return{
        min: min,
        max: max
    }
}
function create_analyst_filter_parameters(req, filter_parameters_record, device_data){
    //we also accept the old filter parameters record because we want to integrate this function with the previous. so if we call the generate function using an analsyt filter
    //record we will already have the filter records so we will jus parse that to here
    if(req.user.user_class =="Analyst"){
        let filter_parameters;
        if(filter_parameters_record){//parsing the record
            filter_parameters = {
                headers: filter_parameters_record.analyst_filter_record_header,
                device_uplink_id_min :filter_parameters_record.analyst_filter_record_min_device_uplink_id,
                device_uplink_id_max :filter_parameters_record.analyst_filter_record_max_device_uplink_id,
                network: filter_parameters_record.analyst_filter_record_network,
                sub_network: filter_parameters_record.analyst_filter_record_sub_network,
                vessel: filter_parameters_record.analyst_filter_record_vessel,
                device: filter_parameters_record.analyst_filter_record_device,
                start_date: filter_parameters_record.analyst_filter_record_start_date,
                end_data: filter_parameters_record.analyst_filter_record_end_date,
                user_id: filter_parameters_record.user_id,
            }
        }else{//Now creating the record
            let parameters = JSON.parse(req.params.parameters); 
            let columns = req.params.columns
            let x = get_min_max_id_of_uplink_data(device_data);
            filter_parameters = {
                headers: JSON.stringify(columns),
                device_uplink_id_min :x.min,
                device_uplink_id_max :x.max,
                network: JSON.stringify(parameters.network),
                sub_network: JSON.stringify(parameters.sub_network),
                vessel: JSON.stringify(parameters.vessel),
                device: JSON.stringify(parameters.device), 
                start_date: parameters.start_date,
                end_data: parameters.end_date,
                sort_by: parameters.sort_by,
                order: parameters.order,
                user_id: req.user.id
            }
        }
        return filter_parameters;
    }else{
        return null;
    }
}
function create_sensor_data_serch_coordinate_box(coordinate, buffer){
    //This function takes an object with the lat and lng of a coordinate and returns a min and max for both 
    //LAT
    let lat_min, lat_max;
    lat_min = coordinate.lat-buffer/2
    lat_max = coordinate.lat+buffer/2
    lat_min = math.round(1000*lat_min)/1000
    lat_max = math.round(1000*lat_max)/1000

    //LNG
    let lng_min, lng_max;
    lng_min = coordinate.lng-buffer/2
    lng_max = coordinate.lng+buffer/2
    lng_min = math.round(1000*lng_min)/1000
    lng_max = math.round(1000*lng_max)/1000
    return {
        lat: {
            min: lat_min,
            max: lat_max
        },
        lng: {
            min: lng_min,
            max: lng_max,
        }
    }
}
function generate_buffer_using_map_zoom(map_zoom){
    switch (map_zoom) {
        case 0:
          return 6;
        case 1:
          return 4;
        case 2:
          return 2;
        case 3:
          return 2;
        case 4:
          return 1;
        case 5:
          return 1;
        case 6:
          return 0.5;
        case 7:
          return 0.4;
        case 8:
          return 0.25;
        case 9:
          return 0.1;
        case 10:
          return 0.04;
        case 11:
          return 0.02;
        case 12:
          return 0.009;
        case 13:
          return 0.006;
        case 14:
          return 0.002;
        case 15:
          return 0.001;
        case 16:
          return 0.001;
        case 17:
          return 0.001;
        case 18:
          return 0.0009;
        case 19:
          return 0.0007; 
        case 20:
          return 0.0001;
        default:
          return 0.0001;
      }
}

function convert_analsyt_filter_record_parameters_to_general_parameters_object(parameters){
    try{
        let return_parameters = {};
        if (parameters.analyst_filter_record_device != "null" ) {
            parameters.analyst_filter_record_device = JSON.parse(parameters.analyst_filter_record_device)
            return_parameters['device'] = parameters.analyst_filter_record_device;
            parameters.analyst_filter_record_vessel = JSON.parse(parameters.analyst_filter_record_vessel)
            return_parameters['vessel'] = parameters.analyst_filter_record_vessel;
            parameters.analyst_filter_record_sub_network = JSON.parse(parameters.analyst_filter_record_sub_network)
            return_parameters['sub_network'] = parameters.analyst_filter_record_sub_network;
        }else if (parameters.analyst_filter_record_vessel != "null") {
            parameters.analyst_filter_record_vessel = JSON.parse(parameters.analyst_filter_record_vessel)
            return_parameters['vessel'] = parameters.analyst_filter_record_vessel;
            parameters.analyst_filter_record_sub_network = JSON.parse(parameters.analyst_filter_record_sub_network) 
            return_parameters['sub_network'] = parameters.analyst_filter_record_sub_network;
        } else if (parameters.analyst_filter_record_sub_network != "null") {
            parameters.analyst_filter_record_sub_network = JSON.parse(parameters.analyst_filter_record_sub_network)
            return_parameters['sub_network'] = parameters.analyst_filter_record_sub_network;
        }
        if(parameters.analyst_filter_record_start_date != "null") return_parameters['start_date'] = parameters.analyst_filter_record_start_date;
        if(parameters.analyst_filter_record_end_date != "null") return_parameters['end_date'] = parameters.analyst_filter_record_end_date;
        return return_parameters;
    }catch(err){
        console.log(err)
    }
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
                device_data = convert_dates(device_data, 'all');
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
                if(device_data.length>0){
                    headers = convert_device_uplink_headers_database_to_table(device_data[0], 'self');
                    device_data = convert_dates(device_data, 'self');
                    res.status(200).send({ device_data: device_data, headers: headers, message: 'Device data fetched', type: 'success' });
                }else{ //Assigned to a or some vessels but no data associated with the assigned vessels
                    res.status(204).send({ message: 'No Data Available', type: 'info' });//No data retrived
                }
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
            let analyst_filter_parameters = create_analyst_filter_parameters(req, null, device_data); // the filter parameters for the analysts when storing filter records
            if(device_data.length>0){
                headers = convert_device_uplink_headers_database_to_table(device_data[0], access);
                device_data = convert_dates(device_data, access);
                res.status(200).send({ device_data: device_data, analyst_filter_parameters: analyst_filter_parameters, headers: headers, message: 'Device data fetched', type: 'success' });
            }else{
                res.status(206).send({analyst_filter_parameters: analyst_filter_parameters, message: 'No Data Available', type: 'info'});//No data retrived
            }
        }catch(err){ 
            console.log(err);
        }
    },
    get_filter_analyst_filter_record: async function(req, res){
        //This is used by the analyst to get the data from an analyst filter record
        let sql_where = []; 
        let where = '';
        let sql_order_by = [];
        let sql = '';
        try {
            let parameters = JSON.parse(req.query.parameters); 
            let parameters_normal = convert_analsyt_filter_record_parameters_to_general_parameters_object(parameters)
            let columns = req.params.columns
            if (columns) {
                columns = convert_gateway_statistics_headers_table_to_database(columns);
                sql = `SELECT ${columns} FROM device_uplink `;
            }
            if(parameters_normal.start_date){
                sql_where.push(`time_stamp > '${parameters_normal.start_date}'`); //We use the time stamp because the rx_time will only be present if we have the receive gw metadata option enabled
            }if(parameters_normal.end_date){
                sql_where.push(`time_stamp < '${parameters_normal.end_date}'`);
            }
            if (parameters_normal.device) {
                sql_where.push(`device_id IN (${parameters_normal.device}) AND vessel_id IN (${parameters_normal.vessel}) AND sub_network_id IN (${parameters_normal.sub_network})`);
            }else if (parameters_normal.vessel) {
                sql_where.push(`vessel_id IN (${parameters_normal.vessel}) AND sub_network_id IN (${parameters_normal.sub_network})`);
            } else if (parameters_normal.sub_network) {
                sql_where.push(`sub_network_id IN (${parameters_normal.sub_network})`);
            }
            sql_where.push(`device_uplink_id > (${parameters.analyst_filter_record_min_device_uplink_id})`);
            sql_where.push(`device_uplink_id < (${parameters.analyst_filter_record_max_device_uplink_id})`);


            if (parameters_normal.start_date || parameters_normal.end_date || parameters_normal.device || parameters_normal.vessel || parameters_normal.sub_network) {
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
            let analyst_filter_parameters = create_analyst_filter_parameters(req, parameters, device_data); 
            if(device_data.length>0){
                headers = convert_device_uplink_headers_database_to_table(device_data[0], 'all');
                device_data = convert_dates(device_data, 'all');
                res.status(200).send({ device_data: device_data, analyst_filter_parameters: analyst_filter_parameters, headers: headers, message: 'Device data fetched', type: 'success' });
            }else{
                res.status(204).send({analyst_filter_parameters: analyst_filter_parameters, message: 'No Data Available', type: 'info'});//No data retrived
            }
        }catch(err){
            console.log(err);
        }
    },
    get_historical: async function(req, res){
        let sql_where = [];
        let where = '';
        let sql_order_by = [];
        let sql = `SELECT device_uplink.*, vessel.vessel_name, DATE_FORMAT(device_uplink.time_stamp, GET_FORMAT(DATETIME, 'JIS')) AS time_stamp
        FROM device_uplink
        LEFT JOIN vessel ON device_uplink.vessel_id = vessel.vessel_id`;
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
            if(parameters.start_date){
                sql_where.push(`time_stamp > '${parameters.start_date}'`); //We use the time stamp because the rx_time will only be present if we have the receive gw metadata option enabled
            }if(parameters.end_date){
                sql_where.push(`time_stamp < '${parameters.end_date}'`);
            }
            //We need to add the access check because if it is self the user can only filter the data based on the vessel and the device
            if (parameters.device && access == 'all') {
                sql_where.push(`device_id IN (${parameters.device})`);
            }
            if (parameters.start_date || parameters.end_date || parameters.device ) {
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
                device_data = convert_dates(device_data, access);
                res.status(200).send({ device_data: device_data, message: 'Device data fetched', type: 'success' });
            }else{
                res.status(204).send({message: 'No Data Available', type: 'info'});//No data retrived
            }
        }catch(err){
            console.log(err);
        }
    },
    export_via_email: async function(req, res){
        try{ ///NEED TO ADD IN EXCEPTION HANDLER FOR WHEN THE DATA IS TO LARGER TO SEND OVER EMAIL
            let device_uplink_data_csv = req.body.device_uplink_data_csv;
            var mailOptions = {
                from: 'lorawanconsole@gmail.com',
                to: req.user.email,
                subject: 'Device Uplink Data(Private Marine IoT Network Console)',
                text: 'See attached the filtered device uplink data.',
                attachments: [{   
                    filename: 'device_uplink_data.csv',
                    content: device_uplink_data_csv 
                }],
                };
                let email_result = await email.transporter.sendMail(mailOptions)
                .catch(err => {
                    //error sending gateway statistics
                    throw err;
                });
                console.log('Email send:' ,email_result.response)
                res.status(200).send({message: 'Gateway statistics sent via email.', type: 'success'})
        }catch(err){
            console.log(err)
        }
    },
    get_gps_coordinates: async function(req, res){
        //This function fetches all the gps coordinates from the database to 
        try{
            let gps_device_uplink_coordinates = await DB.get_gps_coordinates()
                .catch(err => {
                    throw err;
                })
            res.status(200).send({device_coordinates: gps_device_uplink_coordinates, message: 'Device Coordinates Fetched.', type: 'success'})  
        }catch(err){
            console.log(err)
        }
    },
    get_device_sensor_data_based_on_coordinates: async function(req, res){
        //This function fetches all the device sensor data within a range givien a coordinate
        try{ 
            let coordinate = JSON.parse(req.params.coordinate); 
            let buffer = generate_buffer_using_map_zoom(coordinate.zoom_level); //buffer is the square which is used to fetch the sensor data inside. The square is centered around the coordinate of the spot the user clicked
            coordinate = create_sensor_data_serch_coordinate_box(coordinate, buffer)
            let device_uplink_sensor_data = await DB.get_device_uplink_sensor_data_based_on_coordinates(coordinate)
                .catch(err => {
                    throw err;
                })
                device_uplink_sensor_data = convert_dates(device_uplink_sensor_data, 'self')
            res.status(200).send({device_uplink_sensor_data: device_uplink_sensor_data, message: 'Sensor data fetched.', type: 'success'})  
        }catch(err){
            console.log(err)
        }
    }
} 