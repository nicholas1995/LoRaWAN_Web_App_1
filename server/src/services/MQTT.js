const mqtt = require("mqtt");
// to be changed to own local server/service
const client = mqtt.connect("mqtt://localhost:1883");
const VESSEL_DEVICE_DB = require("./database/vessel_device_db");
const DEVICE_RX = require("./database/device_rx_db");
const DB_SECONDARY = require("../db_secondary");
const simulation = require("./sample_device_tracks");

client.on('connect', () => {
    client.subscribe("application/#", () => {
        console.log("subscribed");
    }); 
/*     client.subscribe("gateway/#", () => {
      console.log("subscribed");
    }); */
});

client.on('message', async function (topic, message) {
    // message is Buffer
    message = JSON.parse(message);
/*     if (message.rxInfo) {
        console.log('trueeee')
    } else {
        console.log('falseee')
    }
     */
    let topic_information = extract_topic_information(topic);
    if(topic_information.type == 0){
        let data = await VESSEL_DEVICE_DB.return_vessel_id_device_id(topic_information.device_eui)
            .catch(err => {
                //Error fetching device information from db
            });
        if(data[0]){
            message["vessel_id"] = data[0].vessel_id;
            message["device_id"] = data[0].device_id;
            if (topic_information.event == 'rx') {
                if (message.rxInfo) { 
                    //--------THIS IS JUST FOR THE SIMILATION
                    if(message.rxInfo[0].rssi ==1){//Trinidad north west
                        message.object.gpsLocation["1"]["latitude"] = simulation.track_1[message.txInfo.frequency].lat;
                        message.object.gpsLocation["1"]["longitude"] = simulation.track_1[message.txInfo.frequency].lng;
                    }else if(message.rxInfo[0].rssi ==2){//Tobago north west
                        message.object.gpsLocation["1"]["latitude"] = simulation.tobago_tracks_1[message.txInfo.frequency].lat;
                        message.object.gpsLocation["1"]["longitude"] = simulation.tobago_tracks_1[message.txInfo.frequency].lng;
                    }else if(message.rxInfo[0].rssi ==3){//Grenada
                        message.object.gpsLocation["1"]["latitude"] = simulation.grenada_track_1[message.txInfo.frequency].lat;
                        message.object.gpsLocation["1"]["longitude"] = simulation.grenada_track_1[message.txInfo.frequency].lng;
                    }

                    message.object.temperatureSensor["3"] = simulation.random_temperatue();
                    await DEVICE_RX.create(message)
                        .catch(err => {
                            //Error adding rx device data to the database
                            console.log(err);
                        })
                    DB_SECONDARY.device_uplink.save(message, function(err){
                            if(err){
                                console.log(err)
                            }
                        });
                } else {
                    await DEVICE_RX.create_no_rxInfo(message).catch(
                      err => {
                        //Error adding rx device data to the database
                        console.log(err);
                      }
                    );
                    DB_SECONDARY.device_uplink.save(message, function(err){
                        if(err){
                            console.log(err)
                        }
                    });
                }
            }
        }else{
        }
    }
})

function extract_topic_information(topic){
    try{
        //Type 0 is used for device events, type 1 is used for gateway events
        if (topic.search('application') != -1){//Received messeage contains application information
            if(topic.search('rx') != -1){
                let sub_network_id = extract_application_id(topic);
                let device_eui = extract_device_eui(topic);
                return { type: 0, sub_network_id: sub_network_id, device_eui: device_eui, event: "rx" };
            } else if (topic.search('status') != -1) {
                let sub_network_id = extract_application_id(topic);
                let device_eui = extract_device_eui(topic);
                return { type: 0, sub_network_id: sub_network_id, device_eui: device_eui, event: "status" };
            } else if (topic.search('ack') != -1) {
                let sub_network_id = extract_application_id(topic);
                let device_eui = extract_device_eui(topic);
                return { type: 0, sub_network_id: sub_network_id, device_eui: device_eui, event: "ack" };
            } else if (topic.search('error') != -1) {
                let sub_network_id = extract_application_id(topic);
                let device_eui = extract_device_eui(topic);
                return { type: 0, sub_network_id: sub_network_id, device_eui: device_eui, event: "error" };
            } else{
                //Unknown data type
            }
        }
        if (topic.search("gateway") != -1) {//Received message contains device information
          console.log("gateway");
        }
    }catch(err){
        console.log(err);
    }
}

function extract_application_id(topic){
    let pos_1 = topic.indexOf('/') + 1 ;
    let pos_2 = topic.indexOf('/', pos_1);
    return app_id = topic.slice(pos_1, pos_2);
}
function extract_device_eui(topic) {
    let pos_1 = topic.search("device");
    let pos_2 = topic.indexOf('/', pos_1) + 1 ;
    let pos_3 = topic.indexOf('/', pos_2);
    return device_eui = topic.slice(pos_2, pos_3);
}