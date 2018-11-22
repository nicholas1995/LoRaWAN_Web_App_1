const db = require("../../db");

module.exports = {
  get_not_deleted: function() { //This returns all the vessel device relationships that are currently implemented
    let sql = `SELECT *
        FROM vessel_device
        WHERE deleted = 0`;
    return db.queryAsync(sql);
  },
  update: function(col, value, condition) {
      let sql = `UPDATE devices
        SET ${col} = '${value}'
        WHERE device_eui = '${condition}'`;
    return db.queryAsync(sql);
  },
  create: function (device_id, device_eui, vessel_id) { //Creates a relationship between a device and a vessel
        let sql = `INSERT INTO vessel_device
        (device_id, device_eui, vessel_id)
        VALUES ('${device_id}', '${device_eui}', '${vessel_id}')`;
    return db.queryAsync(sql);
  },
  delete_given_deivce_eui: function (device_eui) { //Set a relationship between a device and a vessel as deleted given the device eui
    //Note that we do not need to specify the instance to set delete high for because this is supposed to be the only record with that
    //particular device eui that has deleted set to low
    let sql = `UPDATE vessel_device
          SET deleted = 1
          WHERE device_eui = '${device_eui}'`;
    return db.queryAsync(sql);
  },
  delete_given_vessel_id: function (vessel_id) { //Set a relationship between a device and a vessel as deleted given the vessel id
    //Note that we do not need to specify the instance to set delete high for because this is supposed to be the only record with that
    //particular device eui that has deleted set to low
    let sql = `UPDATE vessel_device
          SET deleted = 1
          WHERE vessel_id = '${vessel_id}'`;
    return db.queryAsync(sql);
  },
  update_networks_all_parameters: function (data, device_eui) {
      let sql = `UPDATE devices
        SET device_name = '${data.device_name}'
        WHERE device_eui = '${device_eui}'`;
    return db.queryAsync(sql);
  }
};