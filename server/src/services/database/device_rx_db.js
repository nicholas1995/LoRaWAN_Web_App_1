const db = require("../../db");

module.exports = {
    create: function (data) {
        let sql = `INSERT INTO device_uplink
        (sub_network_id, sub_network_name, device_name, device_eui, gateway_id_lora, gateway_name, rx_time, rx_rssi, rx_lora_snr, 
            gateway_latitude, gateway_longitude, gateway_altitude, tx_frequency, tx_data_rate, adr, frame_counter, fport, 
            encoded_data, gps_latitude, gps_longitude, gps_altitude, vessel_id, device_id)
        VALUES ('${data.applicationID}', '${data.applicationName}', '${data.deviceName}','${data.devEUI}', '${data.rxInfo[0].gatewayID}', '${data.rxInfo[0].name}','${data.rxInfo[0].time}', '${data.rxInfo[0].rssi}', '${data.rxInfo[0].loRaSNR}'
        ,'${data.rxInfo[0].location.latitude}', '${data.rxInfo[0].location.longitude}', '${data.rxInfo[0].location.altitude}','${data.txInfo.frequency}', '${data.txInfo.dr}', '${data.adr}','${data.fCnt}', '${data.fPort}', '${data.data}'
        ,'${data.object.gpsLocation["1"]["latitude"]}', '${data.object.gpsLocation["1"]["longitude"]}', '${data.object.gpsLocation["1"]["altitude"]}', '${data.vessel_id}', '${data.device_id}')`;
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
    }
    /* ,
    //TO DELETE-- this is to update the locations of device data records
    update_location: function(id, lat, lng){
        let sql = `UPDATE device_uplink
        SET gps_latitude = '${lat}', gps_longitude = '${lng}'
        WHERE device_uplink_id = '${id}'`;
        return db.queryAsync(sql);
    } */
};