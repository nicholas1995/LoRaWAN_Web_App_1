const db = require("../../db");

module.exports = {
    get_activate_user_account_token: function (activate_user_account_token) {
        let sql = `SELECT activate_user_account_token.*, users.email
        FROM activate_user_account_token
        LEFT JOIN users ON activate_user_account_token.user_id = users.id
        WHERE activate_user_account_token = '${activate_user_account_token}'`;
        return db.queryAsync(sql);
    },
    create_activate_user_account_token: function (activate_user_account_token, user_id) {
        let sql = `INSERT INTO activate_user_account_token
        (activate_user_account_token, user_id)
        VALUES ('${activate_user_account_token}', '${user_id}')`;
        return db.queryAsync(sql);
    },
    delete_activate_user_account_token: function (activate_user_account_token) {
        let sql = `DELETE FROM activate_user_account_token
        WHERE activate_user_account_token='${activate_user_account_token}'`;
        return db.queryAsync(sql);
    }
}