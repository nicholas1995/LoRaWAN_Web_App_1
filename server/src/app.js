const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); //find out what it does
const morgan = require('morgan'); //logs which device etc hit the request
const config = require('./configeration/config');
const app = express();

const mqtt = require('mqtt');
// to be changed to own local server/service
const client = mqtt.connect('http://broker.hivemq.com');


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



/*  client.on('connect', () => { 
    client.subscribe('lora/#',()=> {
        console.log('subscribed')  
    }); 
});

client.on('message', function (topic, message) {  
    // message is Buffer
    console.log('MSG: %s: %s', topic, message);
  })  */
    