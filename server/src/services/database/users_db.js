const db = require("../../db");

module.exports = {
    add_user: function(user, pw_encrypt){
        let sql = `INSERT INTO users (email,first_name,last_name,password,address,home_phone,mobile_phone,new_user,user_class)
    VALUES ('${user.email}','${user.first_name}','${user.last_name}','${pw_encrypt}','${user.address}','${user.home_phone}','${user.mobile_phone}','1', '${user.user_class}')`;
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
    get_user_emails: function(){
        let sql = `SELECT 
        email 
        FROM users`;
        return db.queryAsync(sql);
    },
    delete_user: function(email){
        let sql =`DELETE FROM users
        WHERE email='${email}'`; 
        return db.queryAsync(sql);
    },
    update_user: function(data){
        let sql = `UPDATE users
        SET first_name= '${data.first_name}', last_name= '${data.last_name}', address= '${data.address}', 
        home_phone= '${data.home_phone}', mobile_phone= '${data.mobile_phone}', user_class = '${data.user_class}'
        WHERE email ='${data.email}'`;
        return db.queryAsync(sql);
    },
    update_user_pw: function (encrypted_password, email){
        let sql = `UPDATE users 
        SET password = '${encrypted_password}', new_user = 'false' WHERE email = '${email}';`;
        return db.queryAsync(sql);
    },
    //Add a device for a fisher
    add_device_fisher: function(email, device_eui){
        let sql = `INSERT INTO users_devices (email, device_eui)
        VALUES ('${email}', '${device_eui}')`;
        return db.queryAsync(sql);
    },
    //Get devices associated with a fisher
    get_fisher_devices: function (email) {
        let sql = `SELECT device_eui
        FROM users_devices
        WHERE email='${email}'`;
        return db.queryAsync(sql);
    },
    delete_fisher_devices: function (email){
        let sql = `DELETE FROM users_devices 
        WHERE email='${email}'`;
        return db.queryAsync(sql);
    }
}