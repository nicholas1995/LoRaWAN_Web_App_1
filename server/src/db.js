//const mysql = require("mysql");
const config = require("./configeration/config");
var Promise = require('bluebird');
var mysql = require('mysql');
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);


//Create connection to database
const db = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
});

//Connect to database
db.connect(err => {
  try {
    if (err) {
      throw err;
    }
  } catch (err) {console.log("Database not available...");}
  if(!err){
      console.log("Mysql Connected...");
    }

});
module.exports = db;   
   