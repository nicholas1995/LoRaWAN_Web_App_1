const VError = require('verror');
const error_handler = require('./error_logs');
const db_gateway_statistics = require("../services/database/gateway_statistics");


function error_message(current_error_message, previous_error) {
    let error = new VError("%s : %s", current_error_message, previous_error);
    return error;
}

function gateway_statistics_headers_database_to_table_LUT(gateway_statistics_table_headers_database){ //takes in the headers of the database and returns the table version
    switch (gateway_statistics_table_headers_database) {
      case "gateway_statistics_id":
        return "Gateway Statistics ID";
        break;
        case "gateway_id":
        return "Gateway ID";
        break;
      case "gateway_id_lora":
        return "Gateway ID LoRa";
        break;
      case "gateway_ip":
        return "Gateway IP Address";
        break;
      case "time_stamp":
        return "Time Stamp";
        break;
      case "gateway_latitude":
        return "Gateway Latitude";
        break;
      case "gateway_longitude":
        return "Gateway Longitude";
        break;
      case "gateway_altitude":
        return "Gateway Altitude";
        break;
      case "location_source":
        return "Location Source";
        break;
      case "configeration_version":
        return "Configeration Version";
        break;
      case "rx_packets_received":
        return "Rx Packets Received";
        break;
      case "rx_packets_received_ok":
        return "Rx Packets Received Ok";
        break;
      case "tx_packets_received":
        return "Tx Packets Received";
        break;
      case "tx_packets_emitted":
        return "Tx Packets Emitted";
        break;
    default:
        return "Null"
    }
}
function gateway_statistics_headers_table_to_database_LUT(gateway_statistics_table_headers_table) {
    switch (gateway_statistics_table_headers_table) {
        case "Gateway Statistics ID":
            return "gateway_statistics_id";
        break;
        case "Gateway ID":
            return "gateway_id";
        break;
        case "Gateway ID LoRa":
            return "gateway_id_lora";
        break;
        case "Gateway IP Address":
            return "gateway_ip";
        break;
        case "Time Stamp":
            return "time_stamp";
        break;
        case "Gateway Latitude":
            return " gateway_latitude";
        break;
        case "Gateway Longitude":
            return "gateway_longitude";
        break;
        case "Gateway Altitude":
            return "gateway_altitude";
        break;
        case "Location Source":
            return "location_source";
        break;
        case "Configeration Version":
            return "configeration_version";
        break;
        case "Rx Packets Received":
            return "rx_packets_received";
        break;
        case "Rx Packets Received Ok":
            return "rx_packets_received_ok";
        break;
        case "Tx Packets Received":
            return "tx_packets_received";
        break;
        case "Tx Packets Emitted":
            return "tx_packets_emitted";
        break;
      default:
        return "Null"
    }
}
//Takes as the input an array of lenght 1 of the gateway stats data and returns the headers in the form {text: "Table form", value: "database form"};
function convert_gateway_statistics_headers_database_to_table(gateway_statistics){ 
    let headers_database = Object.keys(gateway_statistics);
    let headers_table = [];
    let place_holder = {}; //object which will store the text and value data
    for (let i = 0; i < headers_database.length; i++){
        place_holder["text"] = gateway_statistics_headers_database_to_table_LUT(headers_database[i]);
        place_holder["value"] = headers_database[i];
        headers_table[i] = place_holder;
        place_holder = {};
    }
    return headers_table;
}

//Takes as the input an array of lenght 1 of the gateway stats data and returns the headers in the form {text: "Table form", value: "database form"};
function convert_gateway_statistics_headers_table_to_database(columns) {
    try{
        let headers_table = columns.split(",");
        let headers_database = []
        for (let i = 0; i < headers_table.length; i++) {
            headers_database[i] = gateway_statistics_headers_table_to_database_LUT(headers_table[i]);
        }
        return headers_database;

    }catch(err){
        console.log(err)
    }
}
module.exports = {
    get_gateway_statistics_initial: async function(req, res){
        try{
            let gateway_statistics = await db_gateway_statistics.get_gateway_statistics()
                .catch(err => {
                    //Error getting gateway stats from the database
                    throw err;
                })
            let headers = convert_gateway_statistics_headers_database_to_table(gateway_statistics[0]);
            headers = JSON.stringify(headers);
            gateway_statistics = JSON.stringify(gateway_statistics);
            res.status(200).send({ headers: headers, gateway_statistics: gateway_statistics, message: 'Gateway Statistics Fetched', type: 'success' });
        }catch(err){
            console.log(err)
        }
    },
    get_gateway_statistics_filtered: async function(req, res){
        try{
            let parameters = JSON.parse(req.params.parameters);
            let columns = req.params.columns;
            columns = convert_gateway_statistics_headers_table_to_database(columns);
            let gateway_statistics = await db_gateway_statistics.get_gateway_statistics_filtered(parameters, columns)
                .catch(err =>{
                    //Error getting the filtered gateway stats from the database
                    throw err;
                })
                let headers;
            if(gateway_statistics.length > 0){
                headers = convert_gateway_statistics_headers_database_to_table(gateway_statistics[0]);
            }
            headers = JSON.stringify(headers);
            gateway_statistics = JSON.stringify(gateway_statistics);
            res.status(200).send({ headers: headers, gateway_statistics: gateway_statistics, message: 'Gateway Statistics Fetched', type: 'success' });
        }catch(err){
            console.log(err)
        }
    }
}
