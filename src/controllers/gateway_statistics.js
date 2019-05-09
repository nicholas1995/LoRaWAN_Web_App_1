const VError = require('verror');
const error_handler = require('./error_logs');
const db_gateway_statistics = require("../services/database/gateway_statistics_db");
const email = require("../services/email");

function error_message(current_error_message, previous_error) {
    let error = new VError("%s : %s", current_error_message, previous_error);
    return error;
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

function add_zero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function convert_dates(data){ //to ensure that when a fisher downloads the data it does not have any info about rx_time
    for(let i =0; i< data.length; i++){
        if(data[i].time_stamp) data[i]["time_stamp"] = return_date(data[i]["time_stamp"]);
    }
    return data;
}

function gateway_statistics_headers_database_to_table_LUT(gateway_statistics_table_headers_database){ //takes in the headers of the database and returns the table version
    switch (gateway_statistics_table_headers_database) {
      case "gateway_statistics_id":
        return "Gateway Statistics ID";
        case "gateway_id":
        return "Gateway ID";
      case "gateway_id_lora":
        return "Gateway ID LoRa";
      case "gateway_name":
        return "Gateway Name";
      case "time_stamp":
        return "Time Stamp";
      case "network_id":
        return "Organization ID";
      case "rx_packets_received":
        return "Rx Packets Received";
      case "rx_packets_received_ok":
        return "Rx Packets Received Ok";
      case "tx_packets_received":
        return "Tx Packets Received";
      case "tx_packets_emitted":
        return "Tx Packets Emitted";
    default:
        return "Null"
    }
}
function gateway_statistics_headers_table_to_database_LUT(gateway_statistics_table_headers_table) {
    switch (gateway_statistics_table_headers_table) {
        case "Gateway Statistics ID":
            return "gateway_statistics_id";
        case "Gateway ID":
            return "gateway_id";
        case "Gateway ID LoRa":
            return "gateway_id_lora";
        case "Gateway Name":
            return "gateway_name";
        case "Time Stamp":
            return "time_stamp";
        case "Organization ID":
            return "network_id";
        case "Rx Packets Received":
            return "rx_packets_received";
        case "Rx Packets Received Ok":
            return "rx_packets_received_ok";
        case "Tx Packets Received":
            return "tx_packets_received";
        case "Tx Packets Emitted":
            return "tx_packets_emitted";
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
            let headers;
            let gateway_statistics = await db_gateway_statistics.get_gateway_statistics()
                .catch(err => {
                    //Error getting gateway stats from the database
                    throw err;
                })
            if(gateway_statistics.length > 0){
                let headers = convert_gateway_statistics_headers_database_to_table(gateway_statistics[0]);
                gateway_statistics = convert_dates(gateway_statistics);
                res.status(200).send({ headers: headers, gateway_statistics: gateway_statistics, message: 'Gateway Statistics Fetched', type: 'success' });
            }else{
                res.status(204).send({ message: 'No Data Available', type: 'info' });//No data retrived
            }
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
            gateway_statistics = convert_dates(gateway_statistics);
            res.status(200).send({ headers: headers, gateway_statistics: gateway_statistics, message: 'Gateway Statistics Fetched', type: 'success' });
        }catch(err){
            console.log(err)
        }
    },
    gateway_statistics_export_via_email: async function(req, res){
        try{
            let gateway_stats_csv = req.body.gateway_stats_csv;
            var mailOptions = {
            from: 'lorawanconsole@gmail.com',
            to: req.user.email,
            subject: 'Gateway Statistics(Private Marine IoT Network Console)',
            text: 'See attached the filtered gateway statistics.',
            attachments: [{   
                filename: 'gateway_statistics.csv',
                content: gateway_stats_csv 
            }],
            };
            let email_result = await email.transporter.sendMail(mailOptions)
            .catch(err => {
                //error sending gateway statistics
                throw err;
            });
            console.log('Email send:' ,email_result.response)
            res.status(200).send({message: 'Gateway Stats exported via email.', type: 'success'})
        }catch(err){
            console.log(err)
        }
    }
}
