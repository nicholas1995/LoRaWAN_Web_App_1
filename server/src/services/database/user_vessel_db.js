const db = require("../../db");

module.exports = {
  get_user_vessel: function(id, user_id, vessel_id, deleted){
    let sql_where = [];
    let where = '';
    let sql = `SELECT user_vessel.*, DATE_FORMAT(user_vessel.date_created, GET_FORMAT(DATETIME, 'JIS')) AS date_created, 
    DATE_FORMAT(user_vessel.date_deleted, GET_FORMAT(DATETIME, 'JIS')) AS date_deleted, 
    vessel.vessel_name FROM user_vessel INNER JOIN vessel ON user_vessel.vessel_id=vessel.vessel_id`;
    if (id != null && id != 'null') {
      sql_where.push(`id = '${id}'`);
    }
    if (user_id != null && user_id != "null") {
      sql_where.push(`user_id = '${user_id}'`);
    }
    if (vessel_id != null && vessel_id != "null") {
      sql_where.push(`vessel_id = '${vessel_id}'`);
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