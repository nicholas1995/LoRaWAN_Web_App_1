const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); //find out what it does
const morgan = require('morgan'); //logs which device etc hit the request
const mysql = require('mysql');
const config = require('./configeration/config');
const app = express();

//app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors()); //DO RESEACH ON THIS.... 29:42 on first video


//Start Express Server
app.listen(config.port, () =>{
    console.log('Server started on port: '+ config.port)
});  

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

require('./routes/database')(app,db);