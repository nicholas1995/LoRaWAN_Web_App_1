const db = require("../../db");

module.exports = {
  //This returns all the vessels that has deleted parameter set to 0
  get_vessels_not_deleted: function() {
    let sql = `SELECT *
        FROM vessel
        WHERE deleted = 0`;
    return db.queryAsync(sql);
  },
  //This returns all the vessels that has deleted parameter set to 0
  // and belongs to the sub_network specified 
  get_vessels_not_deleted_filter_sub_network: function(sub_network_id) {
    let sql = `SELECT *
        FROM vessel
        WHERE deleted = 0 AND sub_network_id = ${sub_network_id}`;
    return db.queryAsync(sql);
  },
    //This returns all the vessels under the specified sub_network or sub_networks 
  get_vessels_specified_sub_network: function (sub_networks) {
      let sql = `SELECT *
      FROM vessel
      WHERE sub_network_id IN (${sub_networks})`;
      return db.queryAsync(sql);
  },
  //This creates a vessel using the specified information
  create_vessels: function(name, sub_network_id) {
    let sql = `INSERT INTO vessel
        (name, sub_network_id)
        VALUES ('${name}', '${sub_network_id}')`;
    return db.queryAsync(sql);
  },
  update_vessels: function(col, value, condition) {
    let sql = `UPDATE vessel
        SET ${col} = '${value}'
        WHERE id = '${condition}'`;
    return db.queryAsync(sql);
  },
  //This updates all the parameters of a sinlge vessel instance
  //using the information provided
  update_vessels_all_parameters: function(data, id) {
    let sql = `UPDATE vessel
        SET name = '${data.name}'
        WHERE id = '${id}'`;
    return db.queryAsync(sql);
  }
};