const db = require("../../db");

module.exports = {
  get_logs: function() {
    let sql = `SELECT *
        FROM error_log`;
    return db.queryAsync(sql);
  },
  create_log: function (user_id, error_user_class, error_user_action, error_user_device, error_user_ip_address, error_name, error_message, error_stack) {
      let sql = `INSERT INTO error_log
        (user_id, error_user_class, error_user_action, error_user_device, error_user_ip_address, error_name, error_message, error_stack)
        VALUES ('${user_id}', '${error_user_class}', '${error_user_action}', '${error_user_device}',
        '${error_user_ip_address}', '${error_name}', '${error_message}', '${error_stack}')`;
    return db.queryAsync(sql);
  }
};