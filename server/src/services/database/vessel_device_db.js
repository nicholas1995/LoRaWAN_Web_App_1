const db = require("../../db");

module.exports = {
  get_not_deleted: function() {
    //This returns all the vessel device relationships that are currently implemented
    let sql = `SELECT *
        FROM vessel_device
        WHERE vessel_device_deleted = 0`;
    return db.queryAsync(sql);
  },
  get_not_deleted_given_vessel_id: function (vessel_id) {
    //This returns all the vessel device relationships that are currently implemented for a given vessel_id
    let sql = `SELECT vessel_device.*, vessel.sub_network_id
    FROM vessel_device
    INNER JOIN vessel ON vessel_device.vessel_id = vessel.vessel_id
    WHERE vessel_device.vessel_device_deleted = 0 AND vessel_device.vessel_id = '${vessel_id}'`;
    return db.queryAsync(sql);
  },
  get_all_given_vessels: function (vessels) {
    //This returns all the devices that were ever associated with the vessels selected
    let sql = `SELECT vessel_device.device_id, vessel_device.device_eui, vessel_device.vessel_id, vessel_device.vessel_device_deleted, device.device_name
        FROM vessel_device
        RIGHT JOIN device ON vessel_device.device_id = device.device_id
        WHERE vessel_id IN (${vessels})`;
    return db.queryAsync(sql);
  },
  get_device_self: function (user_vessel_info){//This returns all the devices assigned to the specified vessel for the period that the vessel was assigned to the user
    let sql_where = [];
    let where = '';
    let sql = "SELECT vessel_device.*, device.device_name FROM vessel_device RIGHT JOIN device ON vessel_device.device_id = device.device_id";
    for(let i = 0; i< user_vessel_info.length; i++){
      where = `vessel_id = '${user_vessel_info[i].vessel_id}' `
      if (user_vessel_info[i].date_deleted != null){
        where= where + `AND vessel_device_created_at < '${user_vessel_info[i].date_deleted}'`; //We want to filter out devices that were added AFTER the user was removed from the vessel. 
        //Hence we check to see if the date the device was added to the boat is after the date the user was removed from the boat. These devices will not be accessable to the fisher
      }
      sql_where.push(where);
      where = '';
    }
    if (sql_where.length > 0) {
      for (let i = 0; i < sql_where.length; i++) {
        if (i < sql_where.length - 1) {
          //will run every time but the last cause we do not want it ending with AND
          where = where + `(${sql_where[i]}) OR `;
        } else {
          where = where + `(${sql_where[i]})`;
        }
      }
      sql = ` ${sql} WHERE ${where}`;
    }
    return db.queryAsync(sql);
  },
  
  update: function(col, value, condition) { //--------------------------------
    let sql = `UPDATE devices
        SET ${col} = '${value}'
        WHERE device_eui = '${condition}'`;
    return db.queryAsync(sql);
  },
  create: function(device_id, device_eui, vessel_id) {
    console.log(device_id, device_eui, vessel_id);
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
          SET vessel_device_deleted = 1
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
          SET vessel_device_deleted = 1
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
      AND vessel_device_deleted = '0'`;
    return db.queryAsync(sql);
  }
};