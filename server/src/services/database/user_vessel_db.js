const db = require("../../db");

module.exports = {
  //This returns all the not deleted vessel ids associated with a givien user id
  get_user_vessels_not_deleted: function(user_id) {
    let sql = `SELECT *
        FROM user_vessel
        WHERE user_id ='${user_id}' AND deleted='0'`;
    return db.queryAsync(sql);
  },
  create_user_vessel_relationship: function(user_id, vessel_id) {
    let sql = `INSERT INTO user_vessel
        (user_id, vessel_id)
        VALUES ('${user_id}', '${vessel_id}')`;
    return db.queryAsync(sql);
  },
  delete_user_vessel_relationship: function(user_id, vessel_id) {
      let sql = `UPDATE user_vessel
        SET deleted = '1'
        WHERE user_id = '${user_id}' AND vessel_id = '${vessel_id}'`;
      return db.queryAsync(sql);
  }
};