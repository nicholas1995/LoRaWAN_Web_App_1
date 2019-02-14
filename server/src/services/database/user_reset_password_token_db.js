const db = require("../../db");

module.exports = {
    get_user_reset_password_token: function (user_reset_password_token) {
        let sql = `SELECT user_reset_password_token.*, users.email
        FROM user_reset_password_token
        LEFT JOIN users ON user_reset_password_token.user_id = users.id
        WHERE user_reset_password_token = '${user_reset_password_token}'`;
        return db.queryAsync(sql);
    },
    create_user_reset_password_token: function (user_reset_password_token, user_id) {
        let sql = `INSERT INTO user_reset_password_token
        (user_reset_password_token, user_id)
        VALUES ('${user_reset_password_token}', '${user_id}')`;
        return db.queryAsync(sql);
    },
    delete_user_reset_password_token: function (user_reset_password_token) {
        let sql = `DELETE FROM user_reset_password_token
        WHERE user_reset_password_token='${user_reset_password_token}'`;
        return db.queryAsync(sql);
    }
}