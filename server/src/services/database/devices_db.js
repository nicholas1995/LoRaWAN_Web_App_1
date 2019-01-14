const db = require("../../db");

module.exports = {
  get: function() {
    let sql = `SELECT *
        FROM device`;
    return db.queryAsync(sql);
  },
  get_device: function(device_id, device_eui, device_name, sub_network_id, deleted) {
    let sql_where = [];
    let where = "";
    let sql = "SELECT *  FROM device ";
    if (device_id != null && device_id != "null") {
      sql_where.push(`id = '${device_id}'`);
    }
    if (device_eui != null && device_eui != "null") {
      sql_where.push(`device_eui = '${device_eui}'`);
    }
    if (device_name != null && device_name != "null") {
      sql_where.push(`device_name = '${device_name}'`);
    }
    if (sub_network_id != null && sub_network_id != "null") {
      sql_where.push(`sub_network_id = '${sub_network_id}'`);
    }
    if (deleted != null && deleted != "null") {
      sql_where.push(`device_deleted = '${deleted}'`);
    }
    if (sql_where.length > 0) {
      for (let i = 0; i < sql_where.length; i++) {
        if (i < sql_where.length - 1) {
          //will run every time but the last cause we do not want it ending with AND
          where = where + `${sql_where[i]} AND `;
        } else {
          where = where + `${sql_where[i]}`;
        }
      }
      sql = ` ${sql} WHERE ${where}`;
    }
    return db.queryAsync(sql);
  },
  get_not_deleted: function() {
    let sql = `SELECT *
        FROM device
        WHERE device_deleted = 0`;
    return db.queryAsync(sql);
  },
  get_newest: function() {
    //this returns the most recently added deivce
    let sql = `SELECT 
        MAX(device_id)
        AS device_id
        FROM device`;
    return db.queryAsync(sql);
  },
  update: function(col, value, condition) {
    let sql = `UPDATE device
        SET ${col} = '${value}'
        WHERE device_eui = '${condition}'`;
    return db.queryAsync(sql);
  },
  create: function (sub_network_id, device_profile_id_lora, device_eui, device_name, device_description) {
    let sql = `INSERT INTO device
        (sub_network_id, device_profile_id_lora, device_eui, device_name, device_description)
        VALUES ('${sub_network_id}', '${device_profile_id_lora}', '${device_eui}', '${device_name}', '${device_description}')`;
    return db.queryAsync(sql);
  },
  update_all_parameters: function(data, device_eui) {
    let sql = `UPDATE device
        SET device_name = '${data.device_name}', device_profile_id_lora = '${data.device_profile_id_lora}', device_description = '${data.device_description}'
        WHERE device_id = '${data.device_id}'`;
    return db.queryAsync(sql);
  }
};