const db = require("../../db");

module.exports = {
    get_gateway_statistics: function () {
        let sql = `SELECT *
        FROM gateway_statistics`;
        return db.queryAsync(sql);
    },
    get_gateway_statistics_filtered: function(parameters, columns){
        let sql_where = [];
        let where = '';
        let sql = '';
        try {
            if (columns) {
                sql = `SELECT ${columns} FROM gateway_statistics `;
            }
            if (parameters.start_date) {
                sql_where.push(`time_stamp > '${parameters.start_date}'`);
            } 
            if (parameters.end_date) {
                sql_where.push(`time_stamp < '${parameters.end_date}'`);
            }
            if (parameters.gateway_id) {
                sql_where.push(`gateway_id IN (${parameters.gateway_id})`);
            }
            if (parameters.start_date || parameters.end_date || parameters.gateway_id) {
                for (let i = 0; i < sql_where.length; i++) {
                    if (i < sql_where.length - 1) {
                        //will run every time but the last cause we do not want it ending with AND
                        where = where + `${sql_where[i]} AND `;
                    } else {
                        where = where + `${sql_where[i]}`;
                    }
                }
            }
            if (where) {
                sql = ` ${sql} WHERE ${where}`
            }
            if (parameters.sort_by) {
                sql = `${sql} ORDER BY ${parameters.sort_by} ${parameters.order}, time_stamp DESC`;
            } else {//So that no mater what the data is ordered in descending order based on the timestamp
                sql = `${sql} ORDER BY time_stamp DESC`;
            }
        return db.queryAsync(sql);
        }catch(err){
            throw err;
        }
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