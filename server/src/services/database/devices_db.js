const db = require("../../db");

module.exports = {
  get: function() {
    let sql = `SELECT 
        device_eui, device_name, sub_network_id, deleted
        FROM devices`;
    return db.queryAsync(sql);
  },
  get_device: function (id, device_eui, device_name, sub_network_id, deleted){
    let sql_where = [];
    let where = '';
    let sql = "SELECT *  FROM devices ";
    if (id != null && id != 'null') {
      sql_where.push(`id = '${id}'`);
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
      sql_where.push(`deleted = '${deleted}'`);
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