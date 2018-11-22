const db = require("../../db");

module.exports = {
  get: function() {
    let sql = `SELECT 
        device_eui, device_name, sub_network_id, deleted
        FROM devices`;
    return db.queryAsync(sql);
  },
  get_not_deleted: function () {
    let sql = `SELECT *
        FROM devices
        WHERE deleted = 0`;
    return db.queryAsync(sql);
  },
  get_newest: function () { //this returns the most recently added deivce
    let sql = `SELECT 
        MAX(id)
        AS id
        FROM devices`;
    return db.queryAsync(sql);
  },
  update: function(col, value, condition) {
      let sql = `UPDATE devices
        SET ${col} = '${value}'
        WHERE device_eui = '${condition}'`;
    return db.queryAsync(sql);
  },
  create: function (device_eui, device_name, sub_network_id) {
        let sql = `INSERT INTO devices
        (device_eui, device_name, sub_network_id)
        VALUES ('${device_eui}', '${device_name}', '${sub_network_id}')`;
    return db.queryAsync(sql);
  },
  update_networks_all_parameters: function (data, device_eui) {
      let sql = `UPDATE devices
        SET device_name = '${data.device_name}'
        WHERE device_eui = '${device_eui}'`;
    return db.queryAsync(sql);
  }
};