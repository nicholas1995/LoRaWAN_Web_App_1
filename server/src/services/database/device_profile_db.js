const db = require("../../db");

module.exports = {
  get_device_profile: function() {
    let sql = `SELECT *
        FROM device_profile
        WHERE device_profile_deleted = '0'`;
    return db.queryAsync(sql);
  },
  create_device_profile: function (network_id, device_profile_id_lora, device_profile_name, network_server_id, device_profile_created_at) {
    let sql = `INSERT INTO device_profile
        (network_id, device_profile_id_lora, device_profile_name, network_server_id, device_profile_created_at)
        VALUES ('${network_id}', '${device_profile_id_lora}', '${device_profile_name}', '${network_server_id}', '${device_profile_created_at}')`;
    return db.queryAsync(sql);
  },
  update_device_profile: function (col, value, condition) {
    let sql = `UPDATE device_profile
        SET ${col} = '${value}'
        WHERE device_profile_id_lora = '${condition}' AND device_profile_deleted = 0`;
    return db.queryAsync(sql);
  },
  update_device_profile_all_parameters: function (data, device_profile_id_lora) {
    let sql = `UPDATE device_profile
        SET device_profile_name = '${data.device_profile_name}'
        WHERE device_profile_id_lora = '${device_profile_id_lora}' AND device_profile_deleted = 0`;
    return db.queryAsync(sql);
  },
};