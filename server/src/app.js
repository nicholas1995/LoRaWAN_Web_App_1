const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); //find out what it does
const morgan = require('morgan'); //logs which device etc hit the request
const config = require('./configeration/config');
const app = express();
const DB = require('./services/database/device_uplink_db')

const mqtt = require('mqtt');
// to be changed to own local server/service
const client = mqtt.connect("mqtt://localhost:1883");


//app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors()); //DO RESEACH ON THIS.... 29:42 on first video
require('./passport');
//Start Express Server
app.listen(config.port, () =>{
    console.log('Server started on port: '+ config.port)
});  

const db = require('./db');
module.exports = app;
require('./routes')(app);

let i= 0;
function intervalFunct(){
    console.log('interval: '+ i);
    i++; 
} 
//setInterval(intervalFunct,6000);     



   client.on('connect', () => { 
       client.subscribe("application/#", () => {
         console.log("subscribed");
       }); 
});

client.on('message', async function (topic, message) {   
    // message is Buffer
    message = JSON.parse(message);
    if (message.rxInfo){
        console.log('trueeee')
    }else{
        console.log('falseee')
    }
    /* await DB.create(message)
        .catch(err => {
            console.log(err);
        }) */
  })   
     