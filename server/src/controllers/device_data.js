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
    let full_date;
    if (date == "" || date == null) {
        full_date = "N/A"
    } else {
        date = new Date(date);
        let month = return_month(date.getMonth()); //returns the month in 3 letters
        let day = add_zero(date.getDate());
        let year = date.getUTCFullYear() - 2000; //converts the full year to 2 digits 
        let hour = add_zero(date.getHours());
        let minutes = add_zero(date.getUTCMinutes());
        let seconds = add_zero(date.getUTCSeconds());
        full_date = day + "-" + month + "-" + year + " " + hour + ":" + minutes + ":" + seconds;
    }
    return full_date;
} 
    //This function takes the month in numerical form from 0:11 and reutrn the first 3 letters of the month
function return_month(month) {
        switch (month) {
            case 0:
                return 'Jan';
                break;
            case 1:
                return 'Feb';
                break;
            case 2:
                return 'Mar';
                break;
            case 3:
                return 'Apr';
                break;
            case 4:
                return 'May';
                break;
            case 5:
                return 'Jun';
                break;
            case 6:
                return 'Jul';
                break;
            case 7:
                return 'Aug';
                break;
            case 8:
                return 'Sep';
                break;
            case 9:
                return 'Oct';
                break;
            case 10:
                return 'Nov';
                break;
            case 11:
                return 'Dec';
                break;
            default:
                return 'NA';
                break;
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
        data[i]["rx_info_time"] = return_date(data[i]["rx_info_time"]);
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
    }
}