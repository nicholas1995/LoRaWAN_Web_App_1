const db = require("../../db");

module.exports = {
    add_user: function(req, pw_encrypt){
        let sql = `INSERT INTO users (email,first_name,last_name,password,address,home_phone,mobile_phone,new_user,user_class)
    VALUES ('${req.body.email}','${req.body.first_name}','${req.body.last_name}','${pw_encrypt}','${req.body.address}','${req.body.home_phone}','${req.body.mobile_phone}','1', '${req.body.user_class}')`;
    return db.queryAsync(sql);
    },
    get_users: function(){
        let sql = `SELECT 
        email, first_name, last_name, address, home_phone, mobile_phone, date_created, user_class 
        FROM users`;
        return db.queryAsync(sql);
    },
    get_single_user: function(email){
        let sql = `SELECT * FROM users WHERE email = '${email}'`;
        return db.queryAsync(sql);
    },
    delete_user: function(email){
        let sql =`DELETE FROM users
        WHERE email='${email}'`; 
        return db.queryAsync(sql);
    }
}