const mqtt = require("mqtt");
// to be changed to own local server/service
const client = mqtt.connect("mqtt://localhost:1883");
const VESSEL_DEVICE_DB = require("./database/vessel_device_db");
const DEVICE_RX = require("./database/device_rx_db");
let test_data = [{lat: "10.715936036343724", lng: "-61.666860580444336"},
{lat: "10.717201042159227", lng: "-61.66748821735382"},
{lat: "10.716905874608388", lng: "-61.667375564575195"},
{lat: "10.717332813294362", lng: "-61.6675740480423"},
{lat: "10.717480396897619", lng: "-61.66767060756683"},
{lat: "10.717654334623377", lng: "-61.66779398918152"},
{lat: "10.717786105561204", lng: "-61.667917370796204"},
{lat: "10.717865168096361", lng: "-61.66806757450104"},
{lat: "10.717917876441676", lng: "-61.66826069355011"},
{lat: "10.718060188928137", lng: "-61.668384075164795"},
{lat: "10.718239397149276", lng: "-61.66857182979584"},
{lat: "10.71843441773994", lng: "-61.66872203350067"},
{lat: "10.718639979848147", lng: "-61.66874349117279"},
{lat: "10.71888243753994", lng: "-61.66879177093506"},
{lat: "10.719030020387676", lng: "-61.66893661022187"},
{lat: "10.719103811784558", lng: "-61.669102907180786"},
{lat: "10.71915651991417", lng: "-61.66931748390197"},
{lat: "10.719019478758078", lng: "-61.669478416442864"},
{lat: "10.718829729362595", lng: "-61.66967153549194"},
{lat: "10.718777021176063", lng: "-61.669886112213135"},
{lat: "10.71870850051987", lng: "-61.67013823986053"},
{lat: "10.718792833632989", lng: "-61.670368909835815"},
{lat: "10.718803375270474", lng: "-61.670685410499566"},
{lat: "10.718682146417203", lng: "-61.670899987220764"},
{lat: "10.718555646692444", lng: "-61.671114563941956"},
{lat: "10.71843441773994", lng: "-61.671232581138604"},
{lat: "10.71832373039309", lng: "-61.671377420425415"},
{lat: "10.718123438900658", lng: "-61.671468615531914"},
{lat: "10.717960043111294", lng: "-61.671618819236755"},
{lat: "10.717775563888289", lng: "-61.67172610759735"},
{lat: "10.717670147138953", lng: "-61.67185485363006"},
{lat: "10.717580542873147", lng: "-61.67201578617095"},
{lat: "10.717490938580815", lng: "-61.672219634056084"},
{lat: "10.717448771845845", lng: "-61.672385931015015"},
{lat: "10.717380250888976", lng: "-61.67258977890015"},
{lat: "10.717285375692333", lng: "-61.67277216911316"},
{lat: "10.71723266723689", lng: "-61.67294919490814"},
{lat: "10.717174687925318", lng: "-61.673163771629326"},
{lat: "10.717158875383879", lng: "-61.6733032464981"},
{lat: "10.717090354361387", lng: "-61.67348027229309"},
{lat: "10.71705345841978", lng: "-61.67369484901428"},
{lat: "10.717048187570619", lng: "-61.673904061317444"},
{lat: "10.716990208223715", lng: "-61.674118638038635"},
{lat: "10.716916416311594", lng: "-61.67432248592377"},
{lat: "10.716826811822692", lng: "-61.67449414730071"},
{lat: "10.716716123888023", lng: "-61.67468190193176"},
{lat: "10.716594894198865", lng: "-61.674891114234924"},
{lat: "10.71644203930421", lng: "-61.675019860267646"},
{lat: "10.716257559156148", lng: "-61.675148606300354"},
{lat: "10.7160572662967", lng: "-61.675282716751106"},
{lat: "10.715851702434751", lng: "-61.67543292045593"},
{lat: "10.715688305419283", lng: "-61.67552947998047"},
{lat: "10.715509095688015", lng: "-61.675652861595154"},
{lat: "10.71535096936647", lng: "-61.675786972045906"},
{lat: "10.715182301199128", lng: "-61.67593717575073"},
{lat: "10.715092696197011", lng: "-61.67610883712769"},
{lat: "10.714887131680198", lng: "-61.67628049850464"},
{lat: "10.7147659012587", lng: "-61.676398515701294"},
{lat: "10.71463939989757", lng: "-61.67652189731598"},
{lat: "10.7145392529492", lng: "-61.67666137218475"},
{lat: "10.714407480598254", lng: "-61.67680084705353"},
{lat: "10.714302062676197", lng: "-61.67695641517639"},
{lat: "10.714201915616254", lng: "-61.677106618881226"},
{lat: "10.714033246808869", lng: "-61.67727828025818"},
{lat: "10.713880390621025", lng: "-61.67744994163513"},
{lat: "10.71372226344895", lng: "-61.677626967430115"},
{lat: "10.713558865284398", lng: "-61.677718162536614"},
{lat: "10.713437634331147", lng: "-61.6778951883316"},
{lat: "10.713253152352662", lng: "-61.67799174785614"},
{lat: "10.712984335554244", lng: "-61.678093671798706"},
{lat: "10.712836749759521", lng: "-61.678152680397034"},
{lat: "10.712736602215028", lng: "-61.67799711227416"},
{lat: "10.712942168191663", lng: "-61.67783081531525"},
{lat: "10.712857833448892", lng: "-61.67768597602844"},
{lat: "10.712668080191806", lng: "-61.677712798118584"},
{lat: "10.712457243100038", lng: "-61.67773962020875"},
{lat: "10.712256947726923", lng: "-61.677905917167664"},
{lat: "10.712093548771799", lng: "-61.67800784111023"},
{lat: "10.711914336913187", lng: "-61.678088307380676"},
{lat: "10.711766750597082", lng: "-61.67818486690521"},
{lat: "10.711550641933048", lng: "-61.67823314666748"},
{lat: "10.711387242596881", lng: "-61.678335070610046"}, 
{lat: "10.71123965602394", lng: "-61.67835652828216"},
{lat: "10.711107882237343", lng: "-61.67842626571655"},
{lat: "10.710949753617733", lng: "-61.67847990989684"},
{lat: "10.710807437789528", lng: "-61.67857110500336"},
{lat: "10.710670392854722", lng: "-61.67862474918365"},
{lat: "10.710517534969684", lng: "-61.67869448661804"},
{lat: "10.710385760868935", lng: "-61.67864084243774"},
{lat: "10.710143296373806", lng: "-61.67873740196228"},
{lat: "10.709964083361378", lng: "-61.67868912220001"},
{lat: "10.709848121943883", lng: "-61.678592562675476"},
{lat: "10.709684721689364", lng: "-61.678705215454094"},
{lat: "10.70960565701845", lng: "-61.67890906333924"},
{lat: "10.709484424482964", lng: "-61.679134368896484"},
{lat: "10.70947915350205", lng: "-61.679375767707825"},
{lat: "10.709384275830082", lng: "-61.6796064376831"},
{lat: "10.709331565999484", lng: "-61.6798746585846"},
{lat: "10.709278856159727", lng: "-61.680057048797615"},
{lat: "10.709257772221244", lng: "-61.68025016784667"}]

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
                    message.object.gpsLocation["1"]["latitude"] = test_data[message.txInfo.frequency].lat;
                    message.object.gpsLocation["1"]["longitude"] = test_data[message.txInfo.frequency].lng;
                    await DEVICE_RX.create(message)
                        .catch(err => {
                            //Error adding rx device data to the database
                            console.log(err);
                        })
                } else {
                    await DEVICE_RX.create_no_rxInfo(message).catch(
                      err => {
                        //Error adding rx device data to the database
                        console.log(err);
                      }
                    );
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