const DB = require("../services/database/device_rx_db");
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
    //This function ensures that the digit returned has 2 digits (eg 1-> 01)
function add_zero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
function convert_dates(data){
    for(let i =0; i< data.length; i++){
        data[i]["r_info_time"] = return_date(data[i]["r_info_time"]);
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
            device_data = convert_dates(device_data);
            device_data = JSON.stringify(device_data);
            headers = JSON.stringify(headers);
            res.status(200).send({ device_data: device_data, headers: headers, message: 'Device data fetched', type: 'success' });
        } catch (err) { 
            console.log(err);
        }
    },
    get_filtered: async function(req, res){
        let sql_where = [];
        let where = '';
        let sql_order_by = [];
        let sql = '';

        try {
            
            let parameters = JSON.parse(req.params.parameters); 
            let columns = req.params.columns
            if (columns) {
                columns = convert_from_ui_to_db(columns);
                sql = `SELECT ${columns} FROM device_rx `;
            }
            if(parameters.start_date){
                sql_where.push(`time_stamp > '${parameters.start_date}'`);
            }if(parameters.end_date){
                sql_where.push(`time_stamp < '${parameters.end_date}'`);
            }
            if (parameters.start_date || parameters.end_date){
                for (let i = 0; i < sql_where.length; i++) {
                    if (i < (sql_where.length - 1)) { //will run every time but the last cause we do not want it ending with AND
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
            headers = header(device_data[0]);
            device_data = convert_dates(device_data);
            device_data = JSON.stringify(device_data);
            headers = JSON.stringify(headers);
            res.status(200).send({ device_data: device_data, headers: headers, message: 'Device data fetched', type: 'success' });
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