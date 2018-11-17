const db = require("../../db");

module.exports = {
    create: function (data) {
        let sql = `INSERT INTO device_uplink
        (application_id, application_name, device_name, device_eui, rx_info_gateway_id, rx_info_name, rx_info_time, rx_info_rssi, rx_info_lora_snr, 
            rx_info_location_latitude, rx_info_location_longitude, rx_info_location_altitude, tx_info_frequency, tx_info_dr, adr, f_cnt, f_port, 
            data, object_gps_location_latitude, object_gps_location_longitude, object_gps_location_altitude)
        VALUES ('${data.applicationID}', '${data.applicationName}', '${data.deviceName}','${data.devEUI}', '${data.rxInfo[0].gatewayID}', '${data.rxInfo[0].name}','${data.rxInfo[0].time}', '${data.rxInfo[0].rssi}', '${data.rxInfo[0].loRaSNR}'
        ,'${data.rxInfo[0].location.latitude}', '${data.rxInfo[0].location.longitude}', '${data.rxInfo[0].location.altitude}','${data.txInfo.frequency}', '${data.txInfo.dr}', '${data.adr}','${data.fCnt}', '${data.fPort}', '${data.data}'
        ,'${data.object.gpsLocation["1"]["latitude"]}', '${data.object.gpsLocation["1"]["longitude"]}', '${data.object.gpsLocation["1"]["altitude"]}')`;
        return db.queryAsync(sql);
    },
    get: function(order_by, order){
        let sql = `SELECT * 
        FROM device_uplink
        ORDER BY ${order_by} ${order}`;
        return db.queryAsync(sql);
    }
};