const db = require("../../db");

module.exports = {
  get_gateway_profile: function() {
    let sql = `SELECT *
        FROM gateway_profile
        WHERE gateway_profile_deleted = '0'`;
    return db.queryAsync(sql);
  },
  create_gateway_profile: function (gateway_profile_id_lora, gateway_profile_name, network_server_id, gateway_profile_created_at) {
    let sql = `INSERT INTO gateway_profile
        (gateway_profile_id_lora, gateway_profile_name, network_server_id, gateway_profile_created_at)
        VALUES ('${gateway_profile_id_lora}', '${gateway_profile_name}', '${network_server_id}', '${gateway_profile_created_at}')`;
    return db.queryAsync(sql);
  },
  update_gateway_profile: function (col, value, condition) {
    let sql = `UPDATE gateway_profile
        SET ${col} = '${value}'
        WHERE gateway_profile_id_lora = '${condition}' AND gateway_profile_deleted = 0`;
    return db.queryAsync(sql);
  },
  update_gateway_profile_all_parameters: function (data, gateway_profile_id_lora) {
    let sql = `UPDATE gateway_profile
        SET gateway_profile_name = '${data.gateway_profile_name}'
        WHERE gateway_profile_id_lora = '${gateway_profile_id_lora}' AND gateway_profile_deleted = 0`;
    return db.queryAsync(sql);
  },
};