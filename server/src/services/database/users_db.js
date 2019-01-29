const db = require("../../db");

module.exports = {
    add_user: function(user, pw_encrypt){
        let sql = `INSERT INTO users (email, first_name, last_name, password, user_country, user_city, user_district, user_street, home_phone, mobile_phone, new_user, user_class)
    VALUES ('${user.email}','${user.first_name}','${user.last_name}','${pw_encrypt}','${user.user_country}','${user.user_city}','${user.user_district}','${user.user_street}','${user.home_phone}','${user.mobile_phone}','1', '${user.user_class}')`;
    return db.queryAsync(sql);
    },
    get_user: function(user_id){
        let sql = `SELECT *
        FROM users
        WHERE id = '${user_id}'`;
        return db.queryAsync(sql);
    },
    get_users: function(){
        let sql = `SELECT 
        id, email, first_name, last_name, user_country, user_city, user_district, user_street, home_phone, mobile_phone, date_created, user_class 
        FROM users`;
        return db.queryAsync(sql);
    },
    get_user_emails: function(){
        let sql = `SELECT email 
        FROM users`;
        return db.queryAsync(sql);
    },
    delete_user: function(id){
        let sql =`DELETE FROM users
        WHERE id='${id}'`; 
        return db.queryAsync(sql);
    },
    update_user: function(data, user_id){
        let sql = `UPDATE users
        SET first_name= '${data.first_name}', last_name= '${data.last_name}', user_country= '${data.user_country}', user_city= '${data.user_city}', 
        user_district= '${data.user_district}', user_street= '${data.user_street}', home_phone= '${data.home_phone}', mobile_phone= '${data.mobile_phone}', user_class = '${data.user_class}'
        WHERE id ='${user_id}'`;
        return db.queryAsync(sql);
    },
    update_user_pw: function (encrypted_password, email){
        let sql = `UPDATE users 
        SET password = '${encrypted_password}', new_user = 'false' WHERE email = '${email}';`;
        return db.queryAsync(sql);
    },

    //-----------------------------------PROFILES-------------------------------------------
    get_profile: function (email) {
        let sql = `SELECT * FROM users 
        WHERE email = '${email}'`;
        return db.queryAsync(sql);
    },
    update_user_reset_password: function (email, value) {
        let sql = `UPDATE users
        SET user_reset_password = '${value}'
        WHERE email ='${email}'`;
        return db.queryAsync(sql);
    },
    update_profile: function (data) {
        let sql = `UPDATE users
        SET first_name= '${data.first_name}', last_name= '${data.last_name}', address= '${data.address}', 
        home_phone= '${data.home_phone}', mobile_phone= '${data.mobile_phone}'
        WHERE email ='${data.email}'`;
        return db.queryAsync(sql);
    }
}