const db = require("../../db");

module.exports = {
    create: function (data) {
        let sql = `INSERT INTO device_uplink
        (sub_network_id, sub_network_name, device_name, device_eui, gateway_id_lora, gateway_name, rx_time, rx_rssi, rx_lora_snr, 
            gateway_latitude, gateway_longitude, gateway_altitude, tx_frequency, tx_data_rate, adr, frame_counter, fport, 
            encoded_data, gps_latitude, gps_longitude, gps_altitude, temperature, humidity, accelerometer, sos, vessel_id, device_id)
        VALUES ('${data.applicationID}', '${data.applicationName}', '${data.deviceName}','${data.devEUI}', '${data.rxInfo[0].gatewayID}', '${data.rxInfo[0].name}','${data.rxInfo[0].time}', '${data.rxInfo[0].rssi}', '${data.rxInfo[0].loRaSNR}'
        ,'${data.rxInfo[0].location.latitude}', '${data.rxInfo[0].location.longitude}', '${data.rxInfo[0].location.altitude}','${data.txInfo.frequency}', '${data.txInfo.dr}', '${data.adr}','${data.fCnt}', '${data.fPort}', '${data.data}'
        ,${data.object.gpsLocation["1"]["latitude"]}, ${data.object.gpsLocation["1"]["longitude"]}, '${data.object.gpsLocation["1"]["altitude"]}', '${data.object.temperatureSensor["3"]}', '${data.object.humiditySensor["4"]}'
        , '${data.object.accelerometerSensor["3"]}', '${data.object.sosSensor["0"]}', '${data.vessel_id}', '${data.device_id}')`;
        return db.queryAsync(sql);  
    },
    create_no_rxInfo: function (data) {
        let sql = `INSERT INTO device_uplink
        (sub_network_id, sub_network_name, device_name, device_eui, tx_frequency, tx_data_rate, adr, frame_counter, fport, 
            encoded_data, gps_latitude, gps_longitude, gps_altitude, vessel_id, device_id)
        VALUES ('${data.applicationID}', '${data.applicationName}', '${data.deviceName}','${data.devEUI}', '${data.txInfo.frequency}', '${data.txInfo.dr}', '${data.adr}','${data.fCnt}', '${data.fPort}', '${data.data}'
        ,'${data.object.gpsLocation["1"]["latitude"]}', '${data.object.gpsLocation["1"]["longitude"]}', '${data.object.gpsLocation["1"]["altitude"]}', '${data.vessel_id}', '${data.device_id}')`;
        return db.queryAsync(sql);
    },
    get: function(order_by, order){
        let sql = `SELECT * 
        FROM device_uplink
        ORDER BY ${order_by} ${order}, time_stamp ASC`;
        return db.queryAsync(sql);
    },
    get_specified_parameters: function (sql) {
        return db.queryAsync(sql);
    },
    get_most_recent_specified_device(device_id){
    //This returns the most recent device uplink for the specified device. Used for the initial map data
    //CALLED FROM DEVICES
        let sql = `SELECT device_uplink.*, vessel.vessel_name, DATE_FORMAT(device_uplink.time_stamp, GET_FORMAT(DATETIME, 'JIS')) AS time_stamp
            FROM device_uplink
            LEFT JOIN vessel ON device_uplink.vessel_id = vessel.vessel_id
            WHERE device_id = "${device_id}"
            ORDER BY device_uplink_id DESC
            LIMIT 1`;
        return db.queryAsync(sql);
    },
    get_most_recent_specified_device_self(device_data){
            //This returns the most recent device uplink for the specified device over the period that the user was assigned to the vessel the device was on. It also only returns the data that the fisher has access too.
            let sql = `SELECT device_uplink.device_uplink_id, device_uplink.sub_network_id, device_uplink.vessel_id, vessel.vessel_name,  device_uplink.device_id, device_uplink.device_name,
            device_uplink.gps_latitude, device_uplink.gps_longitude, device_uplink.gps_altitude, device_uplink.temperature, device_uplink.humidity, device_uplink.accelerometer, device_uplink.sos,
            DATE_FORMAT(device_uplink.time_stamp, GET_FORMAT(DATETIME, 'JIS')) AS time_stamp
            FROM device_uplink
            LEFT JOIN vessel ON device_uplink.vessel_id = vessel.vessel_id `
            let where = `device_id = '${device_data.device_id}' AND (`;
            let sql_where = [];
            let holder = ''
            for(let i = 0; i< device_data.user_vessel_info.length; i++){
                holder = `(device_uplink.vessel_id = '${device_data.vessel_id}' AND time_stamp > '${device_data.user_vessel_info[i].date_created}' `// AND time_stamp < ${device_data.user_vessel_info[i].date_deleted}`)
                if(device_data.user_vessel_info[i].date_deleted != null){
                    holder = holder + `AND time_stamp < '${device_data.user_vessel_info[i].date_deleted}')`;
                }else holder = holder + ')'
                sql_where.push(holder)
                holder = '';
            }
            for (let i = 0; i < sql_where.length; i++) {
            if (i < sql_where.length - 1) {
                //will run every time but the last cause we do not want it ending with AND
                where = where + `${sql_where[i]} OR `;
            } else {
                where = where + `${sql_where[i]})`;
            } 
            }
            sql = ` ${sql} WHERE ${where}`;
            sql = `${sql} ORDER BY device_uplink_id DESC LIMIT 1`; 
        return db.queryAsync(sql);
    },
    get_gps_coordinates(){
        //This returns all the gps coordinates from the device uplink to create the heatmap 
        let sql = `SELECT gps_latitude, gps_longitude
        FROM device_uplink`;
        return db.queryAsync(sql);
    },
    get_device_uplink_sensor_data_based_on_coordinates(coordinate){
        //This function accepts a set of gps coordinates where the lat and lng are 2 values each which set a bound and returns the sensor data corresponding to that point
        //This is used for the homepage map
        let sql = `SELECT device_uplink.sub_network_id, sub_network.sub_network_name, sub_network.network_id, network.network_name, time_stamp, gps_latitude, gps_longitude, temperature, humidity, accelerometer
        FROM device_uplink
        LEFT JOIN sub_network ON device_uplink.sub_network_id = sub_network.sub_network_id 
        LEFT JOIN network ON sub_network.network_id = network.network_id 
        WHERE gps_latitude > '${coordinate.lat.min}' AND gps_latitude < '${coordinate.lat.max}' 
        AND gps_longitude < '${coordinate.lng.max}' AND gps_longitude > '${coordinate.lng.min}'
        ORDER BY time_stamp DESC`;
        return db.queryAsync(sql);
    },
    /* ,
    //TO DELETE-- this is to update the locations of device data records
    update_location: function(id, lat, lng){
        let sql = `UPDATE device_uplink
        SET gps_latitude = '${lat}', gps_longitude = '${lng}'
        WHERE device_uplink_id = '${id}'`;
        return db.queryAsync(sql);
    } */
}; 