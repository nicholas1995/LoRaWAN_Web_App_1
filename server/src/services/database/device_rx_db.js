const db = require("../../db");

module.exports = {
    create: function (data) {
        let sql = `INSERT INTO device_rx
        (sub_network_id, sub_network_name, device_name, device_eui, rx_info_gateway_id, rx_info_name, r_info_time, rx_info_rssi, rx_info_lora_snr, 
            rx_info_location_latitude, rx_info_location_longitude, rx_info_location_altitude, tx_info_frequency, tx_info_dr, adr, f_cnt, f_port, 
            data, object_gps_location_latitude, object_gps_location_longitude, object_gps_location_altitude, vessel_id, device_id)
        VALUES ('${data.applicationID}', '${data.applicationName}', '${data.deviceName}','${data.devEUI}', '${data.rxInfo[0].gatewayID}', '${data.rxInfo[0].name}','${data.rxInfo[0].time}', '${data.rxInfo[0].rssi}', '${data.rxInfo[0].loRaSNR}'
        ,'${data.rxInfo[0].location.latitude}', '${data.rxInfo[0].location.longitude}', '${data.rxInfo[0].location.altitude}','${data.txInfo.frequency}', '${data.txInfo.dr}', '${data.adr}','${data.fCnt}', '${data.fPort}', '${data.data}'
        ,'${data.object.gpsLocation["1"]["latitude"]}', '${data.object.gpsLocation["1"]["longitude"]}', '${data.object.gpsLocation["1"]["altitude"]}', '${data.vessel_id}', '${data.device_id}')`;
        return db.queryAsync(sql);
    },
    create_no_rxInfo: function (data) {
        let sql = `INSERT INTO device_rx
        (sub_network_id, sub_network_name, device_name, device_eui, tx_info_frequency, tx_info_dr, adr, f_cnt, f_port, 
            data, object_gps_location_latitude, object_gps_location_longitude, object_gps_location_altitude, vessel_id, device_id)
        VALUES ('${data.applicationID}', '${data.applicationName}', '${data.deviceName}','${data.devEUI}', '${data.txInfo.frequency}', '${data.txInfo.dr}', '${data.adr}','${data.fCnt}', '${data.fPort}', '${data.data}'
        ,'${data.object.gpsLocation["1"]["latitude"]}', '${data.object.gpsLocation["1"]["longitude"]}', '${data.object.gpsLocation["1"]["altitude"]}', '${data.vessel_id}', '${data.device_id}')`;
        return db.queryAsync(sql);
    },
    get: function(order_by, order){
        let sql = `SELECT * 
        FROM device_rx
        ORDER BY ${order_by} ${order}, time_stamp ASC`;
        return db.queryAsync(sql);
    },
    get_specified_parameters: function (sql) {
        return db.queryAsync(sql);
    },
    get_specified_headings: function (order_by, order, headings) {
        let sql = `SELECT ${headings}
        FROM device_rx
        ORDER BY ${order_by} ${order}`;
        return db.queryAsync(sql);
    },
    get_specified_headings_date: function (order_by, order, headings, start_date, end_date){
        let sql = `SELECT ${headings}
        FROM device_rx
        WHERE r_info_time BETWEEN '${start_date}' AND '${end_date}'`;
        return db.queryAsync(sql);
    }
};