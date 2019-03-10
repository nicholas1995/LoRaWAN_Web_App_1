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
    "timestamp": "2019-02-08T00:00:00Z",
    "rxPacketsReceived": 5, 
    "rxPacketsReceivedOk": 5, 
    "txPacketsReceived": 5, 
    "txPacketsEmitted": 5
}
let date_1 = "2019-03-08T02:11:15Z"
let date_2 = "2019-11-08T22:11:15Z"

let sample_device_data = [ //This is an example of filtered data
 { device_id: 7, device_uplink_id: 8728, sub_network_id: '156' },
 { device_id: 7, device_uplink_id: 8720, sub_network_id: '156' },
 { device_id: 7, device_uplink_id: 8717, sub_network_id: '156' },
 { device_id: 7, device_uplink_id: 8702, sub_network_id: '156' },
 { device_id: 7, device_uplink_id: 8699, sub_network_id: '156' },
 { device_id: 7, device_uplink_id: 8680, sub_network_id: '156' },
 { device_id: 7, device_uplink_id: 8668, sub_network_id: '156' },
 { device_id: 7, device_uplink_id: 8662, sub_network_id: '156' },
 { device_id: 7, device_uplink_id: 8654, sub_network_id: '156' },
 { device_id: 7, device_uplink_id: 8643, sub_network_id: '156' },
 { device_id: 7, device_uplink_id: 8633, sub_network_id: '156' },
 { device_id: 7, device_uplink_id: 8622, sub_network_id: '156' },
 { device_id: 7, device_uplink_id: 8609, sub_network_id: '156' },
 { device_id: 7, device_uplink_id: 8608, sub_network_id: '156' },
 { device_id: 7, device_uplink_id: 8591, sub_network_id: '156' }];

 //Data used to test the map on the client
 let device_marker_information = {accelerometer: "30",
                                    adr: "false",
                                    device_eui: "5555555555555555",
                                    device_id: 5,
                                    device_name: "Device_5",
                                    device_uplink_id: 8718,
                                    encoded_data: "BGYAA2cKAAGIAaKx9pYIAANi",
                                    fport: "1",
                                    frame_counter: "0",
                                    gateway_altitude: "0",
                                    gateway_id_lora: "2222222222222222",
                                    gateway_latitude: "10.248639",
                                    gateway_longitude: "-61.496259",
                                    gateway_name: "Gateway_1",
                                    gps_altitude: "8.66",
                                    gps_latitude: "11.169744691960686",
                                    gps_longitude: "-60.740168094635",
                                    humidity: "25",
                                    rx_lora_snr: "0.44808426",
                                    rx_rssi: "2",
                                    rx_time: "2019-03-08T00:10:15Z",
                                    sos: 0,
                                    sub_network_id: "156",
                                    sub_network_name: "Marine_IoT",
                                    temperature: "26.33",
                                    time_stamp: "2019-03-07 20:10:16",
                                    tx_data_rate: "4",
                                    tx_frequency: "55",
                                    vessel_id: 1,
                                    vessel_name: "Default",
                                }
let device_marker_information_1 = {accelerometer: "30", //This is used to test that the marker created for a device with an sos set bounces
                                adr: "false",
                                device_eui: "5555555555555555",
                                device_id: 5,
                                device_name: "Device_5",
                                device_uplink_id: 8718,
                                encoded_data: "BGYAA2cKAAGIAaKx9pYIAANi",
                                fport: "1",
                                frame_counter: "0",
                                gateway_altitude: "0",
                                gateway_id_lora: "2222222222222222",
                                gateway_latitude: "10.248639",
                                gateway_longitude: "-61.496259",
                                gateway_name: "Gateway_1",
                                gps_altitude: "8.66",
                                gps_latitude: "11.169744691960686",
                                gps_longitude: "-60.740168094635",
                                humidity: "25",
                                rx_lora_snr: "0.44808426",
                                rx_rssi: "2",
                                rx_time: "2019-03-08T00:10:15Z",
                                sos: 1,
                                sub_network_id: "156",
                                sub_network_name: "Marine_IoT",
                                temperature: "26.33",
                                time_stamp: "2019-03-07 20:10:16",
                                tx_data_rate: "4",
                                tx_frequency: "55",
                                vessel_id: 1,
                                vessel_name: "Default",
                            }

let gateway_marker_information ={
                                    discovery_enabled: false,
                                    fine_time_stamp_key: "",
                                    fpga_id: "",
                                    gateway_accuracy: 0,
                                    gateway_altitude: 0,
                                    gateway_description: "First Gateway",
                                    gateway_id: 1,
                                    gateway_id_lora: "2222222222222222",
                                    gateway_latitude: 10.248639,
                                    gateway_location_source_form: "UNKNOWN",
                                    gateway_longitude: -61.496259,
                                    gateway_name: "Gateway_1",
                                    gateway_profile_id: "",
                                    gateway_statistics_id: 23,
                                    network_id: "342",
                                    network_server_id: "8",
                                    rx_packets_received: "5",
                                    rx_packets_received_ok: "5",
                                    time_stamp: "2019-02-08 00:00:00",
                                    tx_packets_emitted: "5",
                                    tx_packets_received: "5",
                                }

let gateway_marker_information_1 = {
                                        discovery_enabled: false,
                                        fine_time_stamp_key: "",
                                        fpga_id: "",
                                        gateway_accuracy: 0,
                                        gateway_altitude: 0,
                                        gateway_description: "To delete",
                                        gateway_id: 10,
                                        gateway_id_lora: "3333333333333333",
                                        gateway_latitude: 11,
                                        gateway_location_source_form: "UNKNOWN",
                                        gateway_longitude: -61.5,
                                        gateway_name: "Gateway-2",
                                        gateway_profile_id: "",
                                        network_id: "342",
                                        network_server_id: "8",
                                    }

let non_sensitive_create_marker_data = {
                                            gps_latitude: 10.864022744157063,
                                            gps_longitude: -61.27371711563518,
                                        }

let non_sensitive_create_marker_data_1 = {
                                            accelerometer: "30",
                                            gps_latitude: "10.704360987772956",
                                            gps_longitude: "-61.73192560672761",
                                            humidity: "25",
                                            network_id: "342",
                                            network_name: "CIRP",
                                            sub_network_id: "156",
                                            sub_network_name: "Marine_IoT",
                                            temperature: "26.25",
                                            time_stamp: "06-Mar-19 0:55:38",
                                        }

let non_sensitive_polyline_data = {
                                    gps_latitude: 10.7191,
                                    gps_longitude: -61.7238
                                }

let non_sensitive_polyline_data_1 = {
                                    gps_latitude: 10.7557,
                                    gps_longitude: -61.6987
                                }
