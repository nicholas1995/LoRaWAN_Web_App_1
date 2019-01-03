const db = require("../../db");

module.exports = {
    get_gateway_statistics: function () {
        let sql = `SELECT *
        FROM gateway_statistics`;
        return db.queryAsync(sql);
    },
    get_gateway_statistics_headers: function(){
        let sql = `SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'gateway_statistics'`;
        return db.queryAsync(sql);
    },
    create_gateway_statistics: function (gateway_id_lora, gateway_ip, time_stamp, gateway_latitude, gateway_longitude, 
        gateway_altitude, location_source, configeration_version, rx_packets_received, rx_packets_received_ok, tx_packets_received, tx_packets_emitted) {
        let sql = `INSERT INTO gateway_statistics
        (gateway_id_lora, gateway_ip, time_stamp, gateway_latitude, gateway_longitude, gateway_altitude, location_source, 
            configeration_version, rx_packets_received, rx_packets_received_ok, tx_packets_received, tx_packets_emitted)
        VALUES ('${gateway_id_lora}', '${gateway_ip}', '${time_stamp}', '${gateway_latitude}', '${gateway_longitude}' '${gateway_altitude}', '${location_source}', 
        '${configeration_version}', '${rx_packets_received}', '${rx_packets_received_ok}', '${tx_packets_received}', '${tx_packets_emitted}') `;
        return db.queryAsync(sql);
    },
}