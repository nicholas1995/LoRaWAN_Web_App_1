const db = require("../db");
module.exports = {
    get_users: function(){
        let sql = `SELECT 
        email, first_name, last_name, address, home_phone, mobile_phone, date_created 
        FROM users`;
        return db.queryAsync(sql);
    }
}