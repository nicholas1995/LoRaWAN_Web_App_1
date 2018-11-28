const db = require("../../db");

module.exports = {
  get_not_deleted: function() {
    //This returns all the vessel device relationships that are currently implemented
    let sql = `SELECT *
        FROM vessel_device
        WHERE deleted = 0`;
    return db.queryAsync(sql);
  },
  get_not_deleted_given_vessel_id: function (vessel_id) {
    //This returns all the vessel device relationships that are currently implemented for a given vessel_id
    let sql = `SELECT *
        FROM vessel_device
        WHERE deleted = 0 AND vessel_id = '${vessel_id}'`;
    return db.queryAsync(sql);
  },
  get_all_given_vessels: function (vessels) {
    //This returns all the devices that were ever associated with the vessels selected
    let sql = `SELECT vessel_device.device_id, vessel_device.device_eui, vessel_device.vessel_id, vessel_device.deleted, devices.device_name
        FROM vessel_device
        RIGHT JOIN devices ON vessel_device.device_id = devices.id
        WHERE vessel_id IN (${vessels})`;
    return db.queryAsync(sql);
  },
  update: function(col, value, condition) {
    let sql = `UPDATE devices
        SET ${col} = '${value}'
        WHERE device_eui = '${condition}'`;
    return db.queryAsync(sql);
  },
  create: function(device_id, device_eui, vessel_id) {
    //Creates a relationship between a device and a vessel
    let sql = `INSERT INTO vessel_device
        (device_id, device_eui, vessel_id)
        VALUES ('${device_id}', '${device_eui}', '${vessel_id}')`;
    return db.queryAsync(sql);
  },
  /*
  Set a relationship between a device and a vessel as deleted given the device eui
  Note that we do not need to specify the instance to set delete high for because this is supposed to be the only record with that
  particular device eui that has deleted set to low
  */
  delete_given_deivce_eui: function(device_eui) {
    let sql = `UPDATE vessel_device
          SET deleted = 1
          WHERE device_eui = '${device_eui}'`;
    return db.queryAsync(sql);
  },
  /*
  Set a relationship between a device and a vessel as deleted given the vessel id
  Note that we do not need to specify the instance to set delete high for because this is supposed to be the only record with that
  particular device eui that has deleted set to low
  */
  delete_given_vessel_id: function(vessel_id) {
    let sql = `UPDATE vessel_device
          SET deleted = 1
          WHERE vessel_id = '${vessel_id}'`;
    return db.queryAsync(sql);
  },
  update_networks_all_parameters: function(data, device_eui) {
    let sql = `UPDATE devices
        SET device_name = '${data.device_name}'
        WHERE device_eui = '${device_eui}'`;
    return db.queryAsync(sql);
  },
  /*
  This returns the vessel_id and the id of the record in the vessel_device table
  specified by the device_eui. It also filters the records to ensure that the
  record returned has deleted set to 0. Only one record at most is supposed to be
  returned.
  */
  return_vessel_id_device_id: function(device_eui) {
    let sql = `SELECT device_id, vessel_id
      FROM vessel_device
      WHERE device_eui = '${device_eui}'
      AND deleted = '0'`;
    return db.queryAsync(sql);
  }
};