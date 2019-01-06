const db = require("../../db");

module.exports = {
  get_vessels: function(id, name, deleted, sub_network_id) {
    let sql_where = [];
    let where = "";
    let sql = "SELECT * FROM vessel ";
    if (id != null && id != "null") {
      sql_where.push(`vessel_id = '${id}'`);
    }
    if (name != null && name != "null") {
      sql_where.push(`vessel_name = '${name}'`);
    }
    if (deleted != null && deleted != "null") {
      sql_where.push(`vessel_deleted = '${deleted}'`);
    }
    if (sub_network_id != null && sub_network_id != "null") {
      sql_where.push(`sub_network_id IN (${sub_network_id})`);
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

  //This returns all the vessels that has deleted parameter set to 0
  get_vessels_not_deleted: function () {
    let sql = `SELECT *
        FROM vessel
        WHERE vessel_deleted = 0`;
    return db.queryAsync(sql);
  },

  //This returns all the vessels that has deleted parameter set to 0
  // and belongs to the sub_network specified
  get_vessels_not_deleted_filter_sub_network: function(sub_network_id) {
    let sql = `SELECT *
        FROM vessel
        WHERE vessel_deleted = 0 AND sub_network_id = ${sub_network_id}`;
    return db.queryAsync(sql);
  },
  //Get vessels under one specified sub_network
  get_vessels_filter_sub_network: function(sub_network_id) {
    let sql = `SELECT *
        FROM vessel
        WHERE sub_network_id = ${sub_network_id}`;
    return db.queryAsync(sql);
  },
  //This returns all the vessels under the specified sub_network or sub_networks
  get_vessels_specified_sub_network: function(sub_networks) {
    let sql = `SELECT *
      FROM vessel
      WHERE sub_network_id IN (${sub_networks})`;
    return db.queryAsync(sql);
  },
  //This returns the default vessel for a specified sub network
  get_default_vessel_specified_sub_network: function(sub_network_id) {
    let sql = `SELECT *
      FROM vessel
      WHERE sub_network_id IN (${sub_network_id}) 
      AND vessel_name = 'default'`;
    return db.queryAsync(sql);
  },
  //This creates a vessel using the specified information
  create_vessels: function(
    vessel_name,
    vessel_unique_vessel_identifier,
    vessel_international_radio_call_sign,
    vessel_type,
    sub_network_id
  ) {
    let sql = `INSERT INTO vessel
        (vessel_name, vessel_unique_vessel_identifier, vessel_international_radio_call_sign, vessel_type, sub_network_id)
        VALUES ('${vessel_name}', '${vessel_unique_vessel_identifier}', '${vessel_international_radio_call_sign}', '${vessel_type}', '${sub_network_id}')`;
    return db.queryAsync(sql);
  },
  //This creates a default vessel for every subnet created using the default information
  create_default_vessels: function(sub_network_id) {
    let sql = `INSERT INTO vessel
        (vessel_name, vessel_unique_vessel_identifier, vessel_international_radio_call_sign, vessel_type, sub_network_id, vessel_deleted)
        VALUES ('Default', 'NULL', 'NULL', 'default', '${sub_network_id}', '1')`;
    return db.queryAsync(sql);
  },
  update_vessels: function(col, value, condition) {
    let sql = `UPDATE vessel
        SET ${col} = '${value}'
        WHERE vessel_id = '${condition}'`;
    return db.queryAsync(sql);
  },
  //This updates all the parameters of a sinlge vessel instance
  //using the information provided
  update_vessels_all_parameters: function(data, vessel_id) {
    console.log(vessel_id);
    let sql = `UPDATE vessel
        SET vessel_name = '${data.vessel_name}'
        WHERE vessel_id = '${vessel_id}'`;
    return db.queryAsync(sql);
  },
  //Deletes vessel given vessel id
  delete_vessel: function(vessel_id) {
    let sql = `UPDATE vessel
        SET vessel_deleted = '1'
        WHERE vessel_id = '${vessel_id}'`;
    return db.queryAsync(sql);
  }
};