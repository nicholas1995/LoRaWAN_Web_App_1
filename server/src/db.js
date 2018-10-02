const mysql = require('mysql');
const config = require('./configeration/config');

//Create connection to database
const db = mysql.createConnection({
    host     : config.db.host,
    user     : config.db.user,
    password : config.db.password,
    database: config.db.database
});

//Connect to database
db.connect((err)=> {
    if(err){
        throw err;
    }
    console.log('Mysql Connected...');
});

module.exports = db;
