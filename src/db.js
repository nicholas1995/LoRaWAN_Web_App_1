//const mysql = require("mysql");
const config = require("./configeration/config");
var Promise = require('bluebird');
var mysql = require('mysql');
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

let db_config = {
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
};
let i =0;
//Create connection to database
let db = mysql.createConnection(db_config);
 
//Connect to database
db.connect(err => {
    if (err) { 
      console.log('Error connecting to database.')
      return;
    }else{
      console.log("Datebase connected as id: " + db.threadId);   
    }
});

db.on('error', function (err) {
  handleDisconnect();
}); 

function handleDisconnect() {  
  db = mysql.createConnection(db_config); 

  db.connect(err => {              // The server is either down
    if (err) {                                     // or restarting (takes a while sometimes).
      console.log("Reattempiting db connection: "+ i);
      i= i+1;
      setTimeout(handleDisconnect, 10000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to 
    else{
      console.log("Datebase connected as id:" + db.threadId);   
    }
  }
  );                                     
  db.on('error', function (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      //throw err;                                  // server variable configures this)
    }
  }); 
}

module.exports = db; 