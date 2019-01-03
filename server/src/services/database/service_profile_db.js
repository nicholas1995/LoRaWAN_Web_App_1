const db = require("../../db");

module.exports = {
  get_service_profile: function() {
    let sql = `SELECT *
        FROM service_profile
        WHERE service_profile_deleted = '0'`;
    return db.queryAsync(sql);
  },
  create_service_profile: function (service_profile_id_lora, service_profile_name, network_server_id, created_at_time_stamp) {
    let sql = `INSERT INTO service_profile
        (service_profile_id_lora, service_profile_name, network_server_id, service_profile_created_at)
        VALUES ('${service_profile_id_lora}', '${service_profile_name}', '${network_server_id}', '${created_at_time_stamp}')`;
    return db.queryAsync(sql);
  },
  update_service_profile: function (col, value, condition) {
    let sql = `UPDATE service_profile
        SET ${col} = '${value}'
        WHERE service_profile_id_lora = '${condition}' AND service_profile_deleted = 0`;
    return db.queryAsync(sql);
  },
  update_service_profile_all_parameters: function (data, service_profile_id_lora) {
    let sql = `UPDATE service_profile
        SET service_profile_name = '${data.service_profile_name}'
        WHERE service_profile_id_lora = '${service_profile_id_lora}' AND service_profile_deleted = 0`;
    return db.queryAsync(sql);
  },
};