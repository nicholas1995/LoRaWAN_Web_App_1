//UTC = unit test case
let user = { id: 4, email: 'lorawanconsole@gmail.com', user_class: 'Software Admin' }
let jwt_1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJsb3Jhd2FuY29uc29sZUBnbWFpbC5jb20iLCJ1c2VyX2NsYXNzIjoiU29mdHdhcmUgQWRtaW4iLCJpYXQiOjE1NTE5MTk5MDIsImV4cCI6MTU1MTk2MzEwMn0.TJtFBlyUoOZWZnx7-8ntKaN-Y--WNj4gT9KUcDLVIZE"; //Valid JWT
let jwt_2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJsb3Jhd2FuY29uc29sZUBnbWFpbC5jb20iLCJ1c2VyX2NsYXNzIjoiU29mdHdhcmUgQWRtaW4iLCJpYXQiOjE1NTE5MjE1ODQsImV4cCI6MTU1MTk2NDc4NH0.x_4dhke2fjE-YKf3_5aWklIcCzrNd_JFJs_Xy8wSfGY"; //JWT signed with different secret
let jwt_3 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJsb3Jhd2FuY29uc29sZUBnbWFpbC5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NTE5MjE2OTUsImV4cCI6MTU1MTk2NDg5NX0.C5_7806b9mQo58yW-Q0PakL9MnsOeWn3NuJTXhPDc4k"; //JWT with altered claim values
let DUR = { applicationID: '156',
                                applicationName: 'Marine_IoT',
                                deviceName: 'Device_2',
                                devEUI: '2222222222222222',
                                rxInfo:
                                [ { gatewayID: '2222222222222222',
                                    name: 'Gateway_1',
                                    time: '2019-03-07T20:43:02Z',
                                    rssi: 3,
                                    loRaSNR: 0.8193636,
                                    location: [{ latitude: 10.248639, longitude: -61.496259, altitude: 0 }] } ],
                                txInfo: { frequency: 0, dr: 4 },
                                adr: false,
                                fCnt: 0,
                                fPort: 1,
                                data: 'BGYAA2cKAAGIAaKx9pYIAANi',
                                object:
                                { humiditySensor: { '1': 30 },
                                accelerometerSensor: { '1': 25.67 },
                                temperatureSensor: { '1': 28.85 },
                                gpsLocation: { '1': [{ latitude: '12.088338683329036',longitude: '-61.83998107910156',altitude: 8.66 }] } },
                                vessel_id: 3,
                                device_id: 2 }
let GSR = {
    gatewayID: '2222222222222222', 
    rxPacketsReceived: 5, 
    rxPacketsReceivedOk: 5, 
    txPacketsReceived: 5, 
    txPacketsEmitted: 5
}