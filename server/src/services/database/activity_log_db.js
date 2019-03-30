const db = require("../../db");

module.exports = {
    get_logs: function () {
        let sql = `SELECT *
        FROM activity_log
        ORDER BY activity_log_time_stamp DESC`;
        return db.queryAsync(sql);
    },
    create_log: function (user_id, user_class, method, user_device, route, activity_details) {
        let sql = `INSERT INTO activity_log
        (activity_log_user_id, activity_log_user_class, activity_log_method, activity_log_user_device, activity_log_route, activity_log_details)
        VALUES ('${user_id}', '${user_class}', '${method}', '${user_device}',
        '${route}', '${activity_details}')`;
        return db.queryAsync(sql);
    }
}; 