const mqtt = require("mqtt");
// to be changed to own local server/service
//const client = mqtt.connect("mqtt:broker.mqttdashboard.com"); //TO TEST USING HIVEMQ
const client = mqtt.connect("mqtt:localhost:1883");

const VESSEL_DEVICE_DB = require("./database/vessel_device_db");
const GATEWAY_DB = require("./database/gateway_db");
const DEVICE_RX = require("./database/device_rx_db");
const GATEWAY_STATS = require("./database/gateway_statistics_db")
const DB_SECONDARY = require("../db_secondary");
const simulation = require("./sample_device_tracks");

//    application/123/device/1111111111111111/rx (topic example)
//    gateway/2222222222222222/stats
client.on('connect', () => {
    client.subscribe("application/#", () => {
        console.log("subscribed to all applications");
    }); 
    client.subscribe("gateway/#", () => {
      console.log("subscribed to all gateways"); 
    });
});

client.on('message', async function (topic, message) {
    try{
        // message is Buffer
        //message = message.toString()  //TO TEST USING HIVEMQ
        message = JSON.parse(message);
        let topic_information = extract_topic_information(topic);
        if(topic_information.type == 0){ //device
            let data = await VESSEL_DEVICE_DB.return_vessel_id_device_id(topic_information.device_eui)
                .catch(err => {
                    //Error fetching device information from db
                    console.log('error MQTT fetch vessels from db')
                    console.log(err)
                });
            if(data[0]){ //if device is assocaited with a gateway
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
        }else if(topic_information.type == 1){ //gateway
            let gateway_information = await GATEWAY_DB.get_gateway_specified(topic_information.gateway_id_lora)
                .catch(err => {
                    //Error fetching specific gateway from database
                    console.log(err)
                })
            if(gateway_information[0]){
                if (topic_information.event == 'stats') {
                    message = JSON.parse(message)
                    message['gateway_id'] = gateway_information[0].gateway_id;
                    message['gateway_id_lora'] = topic_information.gateway_id_lora;
                    message['gateway_name'] = gateway_information[0].gateway_name;
                    message['network_id'] = gateway_information[0].network_id;
                    await GATEWAY_STATS.create_gateway_statistics(message)
                        .catch(err => {
                            //Error creating gateway stat record
                            console.log(err)
                        })
                }
                else{//gateway message other than stats

                }
            }         
        }
    }catch(err){
        console.log(err)
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
                return { type: 2};
            }
        } else if (topic.search("gateway") != -1) {//Received message contains gateway information
            if(topic.search('rx') != -1){
                let gateway_id_lora = extract_gateway_id_lora(topic);
                return { type: 1, gateway_id_lora: gateway_id_lora, event: "rx" };
            } else if (topic.search('tx') != -1) {
                let gateway_id_lora = extract_gateway_id_lora(topic);
                return { type: 1, gateway_id_lora: gateway_id_lora, event: "tx" };
            } else if (topic.search('stats') != -1) {
                let gateway_id_lora = extract_gateway_id_lora(topic);
                return { type: 1, gateway_id_lora: gateway_id_lora, event: "stats" };
            } else if (topic.search('ack') != -1) {
                let gateway_id_lora = extract_gateway_id_lora(topic);
                return { type: 1, gateway_id_lora: gateway_id_lora, event: "ack" };
            } else if (topic.search('config') != -1) {
                let gateway_id_lora = extract_gateway_id_lora(topic);
                return { type: 1, gateway_id_lora: gateway_id_lora, event: "config" };
            }else{
                throw err;
            }
        }
    }catch(err){
        //Unknown messgae
        return { type: 2};
    }
}

function extract_application_id(topic){
    let pos_1 = topic.indexOf('/') + 1 ;
    let pos_2 = topic.indexOf('/', pos_1);
    return app_id = topic.slice(pos_1, pos_2);
}
function extract_gateway_id_lora(topic){
    let pos_1 = topic.indexOf('/') + 1 ;
    let pos_2 = topic.indexOf('/', pos_1);
    return topic.slice(pos_1, pos_2);
}
function extract_device_eui(topic) {
    let pos_1 = topic.search("device");
    let pos_2 = topic.indexOf('/', pos_1) + 1 ;
    let pos_3 = topic.indexOf('/', pos_2);
    return device_eui = topic.slice(pos_2, pos_3);
}