const db = require("../../db");

module.exports = {
    get_gateway: function () {
        let sql = `SELECT *
        FROM gateway
        WHERE gateway_deleted ='0'`;
        return db.queryAsync(sql);
    },
    update_gateway: function (col, value, condition) {
        let sql = `UPDATE gateway
        SET ${col} = '${value}'
        WHERE gateway_id_lora = '${condition}'`;
        return db.queryAsync(sql);
    },
    create_gateway: function (network_id, gateway_name, gateway_id_lora, gateway_description, network_server_id, gateway_created_at) {
        let sql = `INSERT INTO gateway
        (network_id, gateway_name, gateway_id_lora, gateway_description, network_server_id, gateway_created_at)
        VALUES ('${network_id}', '${gateway_name}', '${gateway_id_lora}', '${gateway_description}', '${network_server_id}', '${gateway_created_at}')`;
        return db.queryAsync(sql);
    },
    update_gateway_all_parameters: function (data, id) {
        let sql = `UPDATE gateway
        SET gateway_name = '${data.gateway_name}', gateway_description= '${data.gateway_description}', network_server_id= ${data.network_server_id}
        WHERE gateway_id = '${id}' AND gateway_deleted = 0`;
        return db.queryAsync(sql);
    }
}