const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); //find out what it does
const config = require('./configeration/config');
const app = express();
const DB = require('./services/database/device_rx_db')

require("./services/MQTT");

app.use(bodyParser.json({limit: '50mb'}));//this fixed the bug with the email size
app.use(cors()); 
require('./passport');


const db = require('./db');
module.exports = app;
require('./routes')(app);


//------------NEW FOR DEPLOYMENT-------------
var serveStatic = require('serve-static');
const path = require("path")

app.use(serveStatic(path.join(__dirname, "../client", "dist")));

//Start Express Server
app.listen(config.port, () =>{
    console.log('Server started on port: '+ config.port)
});  