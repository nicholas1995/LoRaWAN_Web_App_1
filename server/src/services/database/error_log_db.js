const db = require("../../db");

module.exports = {
  get_logs: function() {
    let sql = `SELECT *
        FROM error_log`;
    return db.queryAsync(sql);
  },
  create_log: function(user_id, user_class, time_stamp, path, 
    method, err_name, err_message, user_device, stack) {
      let sql = `INSERT INTO error_log
        (user_id, user_class, time_stamp, request_path, request_method, error_name,
             error_message, user_device, stack)
        VALUES ('${user_id}', '${user_class}', '${time_stamp}', '${path}',
        '${method}', '${err_name}', '${err_message}', '${user_device}', '${stack}')`;
    return db.queryAsync(sql);
  }
};