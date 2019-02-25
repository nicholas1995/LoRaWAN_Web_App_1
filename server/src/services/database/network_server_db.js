const db = require("../../db");

module.exports = {
  get_network_server: function() {
    let sql = `SELECT *
        FROM network_server
        WHERE network_server_deleted = '0'`;
    return db.queryAsync(sql);
  },
  create_network_server: function (network_server_id, network_server_name, network_server, network_server_created_at) {
    let sql = `INSERT INTO network_server
        (network_server_id, network_server_name, network_server, network_server_created_at)
        VALUES ('${network_server_id}', '${network_server_name}', '${network_server}', '${network_server_created_at}')`;
    return db.queryAsync(sql);
  },
  update_network_server: function (col, value, condition) {
    let sql = `UPDATE network_server
        SET ${col} = '${value}'
        WHERE network_server_id = '${condition}' AND network_server_deleted = 0`;
    return db.queryAsync(sql);
  },
  update_network_server_all_parameters: function (data, network_server_id) {
    let sql = `UPDATE network_server
        SET network_server_name = '${data.network_server_name}'
        WHERE network_server_id = '${network_server_id}' AND network_server_deleted = 0`;
    return db.queryAsync(sql);
  },
};