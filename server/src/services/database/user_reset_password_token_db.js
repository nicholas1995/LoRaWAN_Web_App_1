const db = require("../../db");

module.exports = {
    get_user_reset_password_token: function (user_reset_password_token) {
        let sql = `SELECT *
        FROM user_reset_password_token
        WHERE user_reset_password_token = '${user_reset_password_token}'`;
        return db.queryAsync(sql);
    },
    create_user_reset_password_token: function (user_reset_password_token, email) {
        let sql = `INSERT INTO user_reset_password_token
        (user_reset_password_token, user_email)
        VALUES ('${user_reset_password_token}', '${email}')`;
        return db.queryAsync(sql);
    },
    delete_user_reset_password_token: function (user_reset_password_token) {
        let sql = `DELETE FROM user_reset_password_token
        WHERE user_reset_password_token='${user_reset_password_token}'`;
        return db.queryAsync(sql);
    }
}