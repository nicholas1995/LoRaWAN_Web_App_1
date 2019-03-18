/* //UTC = unit test case
let user = { id: 4, email: 'lorawanconsole@gmail.com', user_class: 'Software Admin' }
let jwt_1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJsb3Jhd2FuY29uc29sZUBnbWFpbC5jb20iLCJ1c2VyX2NsYXNzIjoiU29mdHdhcmUgQWRtaW4iLCJpYXQiOjE1NTE5MTk5MDIsImV4cCI6MTU1MTk2MzEwMn0.TJtFBlyUoOZWZnx7-8ntKaN-Y--WNj4gT9KUcDLVIZE"; //Valid JWT
let jwt_2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJsb3Jhd2FuY29uc29sZUBnbWFpbC5jb20iLCJ1c2VyX2NsYXNzIjoiU29mdHdhcmUgQWRtaW4iLCJpYXQiOjE1NTE5MjE1ODQsImV4cCI6MTU1MTk2NDc4NH0.x_4dhke2fjE-YKf3_5aWklIcCzrNd_JFJs_Xy8wSfGY"; //JWT signed with different secret
let jwt_3 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJsb3Jhd2FuY29uc29sZUBnbWFpbC5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NTE5MjE2OTUsImV4cCI6MTU1MTk2NDg5NX0.C5_7806b9mQo58yW-Q0PakL9MnsOeWn3NuJTXhPDc4k"; //JWT with altered claim values
let DUR = {
    "applicationID": "156",
    "applicationName": "Marine_IoT",
    "deviceName": "Device_2",
    "devEUI": "2222222222222222",
    "rxInfo":
    [ { "gatewayID": "2222222222222222",
        "name": "Gateway_1",
        "time": "2019-03-07T20:43:02Z",
        "rssi": 3,
        "loRaSNR": 0.8193636,
        "location": [{ "latitude": 10.248639, "longitude": 10.248639, "altitude": 0 }] } ],
    "txInfo": { "frequency": 0, "dr": 4 },
    "adr": false,
    "fCnt": 0,
    "fPort": 1,
    "data": "BGYAA2cKAAGIAaKx9pYIAANi",
    "object":
    { "humiditySensor": { "1": 30 },
    "accelerometerSensor": { "1": 25.67 },
    "temperatureSensor": { "1": 28.85 },
    "gpsLocation": { "1": [{ "latitude": "12.088338683329036","longitude": "-61.83998107910156","altitude": 8.66 }] } },
    "vessel_id": 3,
    "device_id": 2 
}

let dur = {"applicationID":"156","applicationName":"Marine_IoT","deviceName":"Device_2","devEUI":"2222222222222222","rxInfo":[{"gatewayID":"2222222222222222","name":"Gateway_1","time":"2019-03-07T20:43:02Z","rssi":3,"loRaSNR":0.8193636,"location":{"latitude":10.248639,"longitude":10.248639,"altitude":0}}],"txInfo":{"frequency":0,"dr":4},"adr":false,"fCnt":0,"fPort":1,"data":"BGYAA2cKAAGIAaKx9pYIAANi","object":{"humiditySensor":{"1":30},"accelerometerSensor":{"1":25.67},"temperatureSensor":{"3":28.85},"gpsLocation":{"1":{"latitude":"12.088338683329036","longitude":"-61.83998107910156","altitude":8.66}}},"vessel_id":3,"device_id":2}
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

//----------------------------------------------------------------------------------------------------------------Database test data ----------------------------------------------------------------------------------------------------------------

//Organization----------------------------------------------------------------------------------------------------------------

let create_organization_2 = {
    network_id: 376, 
    network_name: "Test_Organization", 
    network_display_name: "This is just for testing", 
    network_can_have_gateways: true
}

let update_organization_1 = {
    col: "network_deleted",
    value: 1, 
    condition: 376
}

let update_organization_2 = { 
    network_name: 'CIRP_S',
    network_display_name: 'Caribbean ICT Research Program',
    network_can_have_gateways: true 
}

//Application----------------------------------------------------------------------------------------------------------------

let get_application_2 = {
    organization_id = 342
}
    
let create_application_1 = {
    sub_network_id: 161,
    network_id: 342,
    service_profile_id: "ae2ed918-d653-4a14-b638-b52236d2d0ae",
    sub_network_name: "Test_Application", 
    sub_network_description: "Test"
}

let update_application_1 = {
    col: "sub_network_deleted",
    value: 1, 
    condition: 161
}

let update_application_2 = { 
    sub_network_name: 'Marine_IoT_1',
    sub_network_description: 'This application encompasses all of the vessels and devices which are part of the Marine IoT application which falls under the CIRP organization.',
    network_id: '342',
    service_profile_id: 'ae2ed918-d653-4a14-b638-b52236d2d0ae',
    payload_codec: 'CAYENNE_LPP' 
}

//Vessels----------------------------------------------------------------------------------------------------------------
let get_vessel_1 = {
    id: 2, 
    name: null, 
    deleted: null, 
    sub_network_id: null
}

let get_vessel_2 = {
    id: null, 
    name: 'Sunset', 
    deleted: null, 
    sub_network_id: null
}

let get_vessel_3 = {
    id: null, 
    name: null, 
    deleted: 0, 
    sub_network_id: null
}

let get_vessel_4 = {
    id: null, 
    name: null, 
    deleted: 1, 
    sub_network_id: null
}

let get_vessel_5 = {
    id: null, 
    name: null, 
    deleted: null, 
    sub_network_id: 156
}

let get_vessel_6 = {
    sub_network_id: 156
}

let create_vessel_1 = {
        vessel_name: "Time Chaser",
        vessel_unique_vessel_identifier: "11111",
        vessel_international_radio_call_sign: "111",
        vessel_type: "Artisanal Fishing",
        sub_network_id: 156
}

let create_vessel_2 = {
    sub_network_id: 156
}

let update_vessel_1 = {
    col: "vessel_name",
    value: "Time Chaser 1",
    condition: 2
}

//Devices----------------------------------------------------------------------------------------------------------------

let get_devices_1 = {
    device_id : 3, 
    device_eui: null, 
    device_name: null, 
    sub_network_id: null,  
    deleted: null, 
}
let get_devices_2 = {
    device_id : null, 
    device_eui: "111111111111111", 
    device_name: null, 
    sub_network_id: null,  
    deleted: null, 
}
let get_devices_3 = {
    device_id : null, 
    device_eui: null, 
    device_name: "Device_10", 
    sub_network_id: null,  
    deleted: null, 
}
let get_devices_4 = {
    device_id : null, 
    device_eui: null, 
    device_name: null, 
    sub_network_id: 156,  
    deleted: null, 
}
let get_devices_5 = {
    device_id : null, 
    device_eui: null, 
    device_name: null, 
    sub_network_id: null,  
    deleted: 0, 
}
let get_devices_6 = {
    device_id : null, 
    device_eui: null, 
    device_name: null, 
    sub_network_id: null,  
    deleted: 1, 
}

let create_device_data = {
                            device_name: 'Device_11',
                            device_eui: '1111111123332433',
                            device_description: 'This is a test device',
                            sub_network_id: '156',
                            vessel_id: '',
                            device_profile_id_lora: 'f7963621-76d3-4f9b-bd5b-858468a14b8b',
                            reference_altitude: '0',
                            skip_frame_counter: true 
                        }

let update_device = {
    col: "device_deleted",
    value: 1,
    condition: "777777777777777"
}
let update_device_data = {
                            device_id: 14,
                            device_name: 'Device_1123',
                            device_eui: '1111111123332433',
                            device_description: 'This is a test',
                            sub_network_id: '156',
                            vessel_id: '',
                            device_profile_id_lora: 'f7963621-76d3-4f9b-bd5b-858468a14b8b',
                            reference_altitude: '10',
                            skip_frame_counter: true 
                        }

                        
//Gateways----------------------------------------------------------------------------------------------------------------  

let get_gateway_2 = {
    gateway_id = 342
}

let create_gateway_1 = {
    network_id: 342, 
    gateway_name: "Test_Gateway", 
    gateway_id_lora: "6545674567456745", 
    gateway_description: "This is a test Gateway", 
    network_server_id: 8
}

let update_gateway_1 = {
    col: "gateway_deleted",
    value: 1, 
    condition: 11
}

let update_gateway_2 = { 
    gateway_name: 'Gateway_1995',
    gateway_id: 1,
    gateway_id_lora: '2222222222222222',
    gateway_description: 'First Gateway 1',
    network_id: '342',
    network_server_id: 8,
}       

//Service Profile----------------------------------------------------------------------------------------------------------------  
let create_service_profile = {
    service_profile_id_lora: "fe592498-6c54-4f41-ac53-ef0e3088e7fe", 
    service_profile_name: "Test Service Profile", 
    network_server_id: 8, 
    network_id: 342, 
    created_at_time_stamp: "2019-03-10T05:31:11.471296Z"
}

let update_service_profie_1 = {
    col: "service_profile_deleted",
    value: 1, 
    condition: 2
}

let update_service_profie_2 = { 
    service_profile_name: 'Service Profile 1995',
    add_gw_metadata: true,
    report_device_status_battery: true,
    report_device_status_margin: true,
    network_geo_location: true,
    device_status_req_frequency: 2,
    dr_min: 0,
    dr_max: 10 
}
//Device Profile----------------------------------------------------------------------------------------------------------------  
let create_device_profile = {
    network_id: 342, 
    device_profile_id_lora: 'd0a189e2-21fa-476b-87f1-05607eb3ed30', 
    device_profile_name: 'Test Device Profile', 
    network_server_id: 8, 
    device_profile_created_at: "2019-03-10T05:50:14.784612Z"
}

let update_device_profie_1 = {
    col: "device_profile_deleted",
    value: 1, 
    condition: 2
}

let update_device_profie_2 = { 
    device_profile_name: 'ABP 1995',
    network_id: '342',
    network_server_id: '8',
}
//Gateway Profile----------------------------------------------------------------------------------------------------------------  
let create_gateway_profile = {
    gateway_profile_id_lora: "e26cad40-ab4b-406f-8958-0eb94ce41bc8", 
    gateway_profile_name: "Test Gateway Profile", 
    network_server_id: 8, 
    gateway_profile_created_at: "2019-03-10T06:01:45.329760Z"
}

let update_gateway_profie_1 = {
    col: "gateway_profile_deleted",
    value: 1, 
    condition: 7
}

let update_gateway_profie_2 = { 
    gateway_profile_name: 'Gateway Profile 1995asdf',
    gateway_profile_channels: [ 45 ],
    network_server_id_lora: '8',
    gateway_profile_modulation: 'LORA',
    gateway_profile_bandwidth: 125,
    gateway_profile_frequency: 3456,
    gateway_profile_spreading_factors: [ 0 ],
    gateway_profile_bit_rate: 0 
}

//Activate User Account Token----------------------------------------------------------------------------------------------------------------
let get_activate_user_account_token = {
    activate_user_account_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyZGZnaEBmZHNkZ2YuZGZnIiwidXNlcl9pZCI6IjcwIiwiaWF0IjoxNTUyMjM1NjExLCJleHAiOjE1NTI0MDg0MTF9.JPmEvWC5qb5TNfZOEnRXT0TEkceUh5uVV2W_x-_JkXA"
}

let create_activate_user_account_token ={
    activate_user_account_token: "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzdEB0dC5jb20iLCJ1c2VyX2lkIjoiNzEiLCJpYXQiOjE1NTIyMzY0NjUsImV4cCI6MTU1MjQwOTI2NX0.SKnG8iJqARhMxxB2xiZ96NU8sPDpYE9l5v-gP9pqm5A", 
    user_id: 71
}

let delete_activate_user_account_token = {
    activate_user_account_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyZGZnaEBmZHNkZ2YuZGZnIiwidXNlcl9pZCI6IjcwIiwiaWF0IjoxNTUyMjM1NjExLCJleHAiOjE1NTI0MDg0MTF9.JPmEvWC5qb5TNfZOEnRXT0TEkceUh5uVV2W_x-_JkXA"
}

//User Reset Password Token----------------------------------------------------------------------------------------------------------------
let get_user_reset_password_token = {
    user_reset_password_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY2hvbGFzYm9zczFAaG90bWFpbC5jb20iLCJ1c2VyX2lkIjoiNjUiLCJpYXQiOjE1NTIyMzY5MjUsImV4cCI6MTU1MjMyMzMyNX0.1QGgBBJ23Nw3VTexaobujyWbgKM0xwouQJ29rKrvkrc"
}

let create_user_reset_password_token ={
    user_reset_password_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY2hvbGFzLmptaXRjaGVsbEBvdXRsb29rLmNvbSIsInVzZXJfaWQiOiI2OCIsImlhdCI6MTU1MjIzNzAyNSwiZXhwIjoxNTUyMzIzNDI1fQ.lvT5Q71ZJsw7zZ5EQkK8Bt_KBIvw9xSeKc5YwcpbHtI", 
    user_id: 68
}

let delete_user_reset_password_token ={
    user_reset_password_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY2hvbGFzLmptaXRjaGVsbEBvdXRsb29rLmNvbSIsInVzZXJfaWQiOiI2OCIsImlhdCI6MTU1MjIzNzAyNSwiZXhwIjoxNTUyMzIzNDI1fQ.lvT5Q71ZJsw7zZ5EQkK8Bt_KBIvw9xSeKc5YwcpbHtI", 
}

//Users----------------------------------------------------------------------------------------------------------------
let add_user = {
        user:{ first_name: 'Test',
        last_name: 'Test',
        user_country: 'test',
        user_city: 'test',
        user_district: 'test',
        user_street: 'test',
        home_phone: '4745764756',
        mobile_phone: '7454564567',
        email: 't@t.tt',
        user_class: 'Fisher',
        vessels: [] } ,
    pw_encrypt: 'null'
}

let get_user_1 = {
    user_id: 72
}

let delete_user ={
    user_id: 72
}

let update_user_1 ={
    data: { 
        first_name: 'Nick',
        last_name: 'Mitch',
        user_country: 'Trinidad',
        user_city: 'San Fernando',
        user_district: 'sdfsd',
        user_street: '18 Sunset Ridge La Romain',
        home_phone: '8683229648',
        mobile_phone: '8683229648',
        user_class: 'Analyst',
        vessels: { added: [], deleted: [] } 
    },
    user_id: '64'
}


let update_user_2 ={
    email: "nicholas.jmitchell@outlook.com", 
    value: 1
}

let update_user_3 ={
    email: "nicholas.jmitchell@outlook.com", 
}
//User Vessel----------------------------------------------------------------------------------------------------------------
let get_user_vessel_1 = {
    id: 6,
    user_id: null,
    vessel_id: null,
    deleted: null
}

let get_user_vessel_2 = {
    id: null,
    user_id: 68,
    vessel_id: null,
    deleted: null
}

let get_user_vessel_3 = {
    id: null,
    user_id: null,
    vessel_id: 2,
    deleted: null
}

let get_user_vessel_4 = {
    id: null,
    user_id: null,
    vessel_id: null,
    deleted: 0
}

let create_user_vessel = {
    user_id: 68,
    vessel_id: 3
}

let delete_user_vessel = {
    user_id: 68,
    vessel_id: 3
}

//Vessel Device ----------------------------------------------------------------------------------------------------------------
let get_vessel_device_2 = {

}

let get_vessel_device_3 = {
    user_vessel_info: [ { vessel_id: 2,
        date_created: '2019-02-16 22:44:18',
        date_deleted: null } ]
}

let get_vessel_device_4 = {
    device_eui: "8888888888888888"
}

let create_vessel_device = {
    device_id: 8,
    device_eui: "8888888888888888",
    vessel_id: 2
}

let delete_vessel_device_1 = {
    device_eui: "6666666666666666"
}


//Device Uplink Data----------------------------------------------------------------------------------------------------------------
let create_devie_uplink = { applicationID: '156',
                                applicationName: 'Marine_IoT',
                                deviceName: 'Device_2',
                                devEUI: '2222222222222222',
                                rxInfo:
                                [ { gatewayID: '2222222222222222',
                                    name: 'Gateway_1',
                                    time: '2019-03-07T20:43:02Z',
                                    rssi: 3,
                                    loRaSNR: 0.8193636,
                                    location: [{ latitude: 10.248639, longitude: 10.248639, altitude: 0 }] } ],
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

let create_devie_uplink_no_rx = { 
                                    applicationID: '156',
                                    applicationName: 'Marine_IoT',
                                    deviceName: 'Device_2',
                                    devEUI: '2222222222222222',
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
                                    device_id: 2 
                                }

let get_device_uplink_1 = {
    order_by: 'device_uplink_id',
    order: 'ASC'
}

let get_device_uplink_2 = {
        vessel_device_id: 3,
        device_id: 1,
        device_eui: '1111111111111111',
        vessel_id: 2,
        vessel_device_deleted: 0,
        vessel_device_created_at: "2019-02-14T05:45:43.000Z",
        vessel_device_deleted_at: null,
        device_name: 'Device_1',
        user_vessel_info:
         [ { vessel_id: 2,
             date_created: '2019-03-09 22:36:33',
             date_deleted: null } ] 
    }

let get_device_uplink_3 =  {
    vessel_device_id: 3,
    device_id: 1,
    device_eui: '1111111111111111',
    vessel_id: 2,
    vessel_device_deleted: 0,
    vessel_device_created_at: "2019-02-14T05:45:43.000Z",
    vessel_device_deleted_at: null,
    device_name: 'Device_1',
    user_vessel_info:
     [ { vessel_id: 2,
         date_created: '2019-03-09 22:36:33',
         date_deleted: null } ] }

let get_device_uplink_4 = { 
    lat: { min: 10.7931, max: 10.8131 },
    lng: { min: -61.5707, max: -61.5507 } 
}

let get_device_uplink_5 = { 
    lat: { min: 10.7066, max: 10.7086 },
    lng: { min: -61.6857, max: -61.6837 } 
}


let get_device_uplink_6 = "SELECT device_uplink_id,device_id,sub_network_id,vessel_id,time_stamp,sub_network_name,device_eui,device_name,gateway_id_lora,gateway_name,rx_time,rx_rssi,rx_lora_snr,gateway_latitude,gateway_longitude,gateway_altitude,tx_frequency,tx_data_rate,adr,frame_counter,fport,encoded_data,gps_latitude,gps_longitude,gps_altitude,temperature,humidity,accelerometer,sos FROM device_uplink  WHERE time_stamp > '2019-03-10 23:57:00' AND device_id IN (1,2) AND vessel_id IN (2,3) AND sub_network_id IN (156) ORDER BY time_stamp DESC"

let get_device_uplink_7 = "SELECT device_uplink_id,device_id,sub_network_id,vessel_id,time_stamp,sub_network_name,device_eui,device_name,gateway_id_lora,gateway_name,rx_time,rx_rssi,rx_lora_snr,gateway_latitude,gateway_longitude,gateway_altitude,tx_frequency,tx_data_rate,adr,frame_counter,fport,encoded_data,gps_latitude,gps_longitude,gps_altitude,temperature,humidity,accelerometer,sos FROM device_uplink  WHERE device_id IN (1) AND vessel_id IN (2,3) AND sub_network_id IN (156) ORDER BY time_stamp DESC"

let get_device_uplink_8 = "SELECT device_uplink_id,device_id,vessel_id,time_stamp,device_eui,device_name,gps_latitude,gps_longitude,gps_altitude,temperature,humidity,accelerometer,sos FROM device_uplink  WHERE ( (time_stamp > '2019-03-09 22:36:33' AND vessel_id = '2'))  ORDER BY time_stamp DESC"

let get_device_uplink_9 = "SELECT device_uplink.device_uplink_id, device_uplink.sub_network_id, device_uplink.vessel_id, vessel.vessel_name,  device_uplink.device_id, device_uplink.device_name,device_uplink.gps_latitude, device_uplink.gps_longitude, device_uplink.gps_altitude, device_uplink.temperature, device_uplink.humidity, device_uplink.accelerometer, device_uplink.sos, DATE_FORMAT(device_uplink.time_stamp, GET_FORMAT(DATETIME, 'JIS')) AS time_stamp FROM device_uplink LEFT JOIN vessel ON device_uplink.vessel_id = vessel.vessel_id  WHERE ( (time_stamp > '2019-03-09 22:36:33' AND device_uplink.vessel_id = '2'))   ORDER BY time_stamp DESC"

//Gateway Stats----------------------------------------------------------------------------------------------------------------
let get_gateway_stats_2 = {
    parameters: { start_date: '2019-02-05T15:56:00Z', gateway_id: [ 11, 1 ] }, 
    columns:   [ 'gateway_statistics_id',
    'gateway_id',
    'gateway_id_lora',
    'gateway_name',
    'rx_packets_received_ok',
    'tx_packets_received',
    'tx_packets_emitted' ]
}

let get_gateway_stats_3 = {
    gateway_id: 1
}

let create_gateway_stat = {
    gateway_statistic: {
        gateway_id: 1,
        gateway_id_lora: "2222222222222222",
        gateway_name: "Gateway_1",
        network_id: 342, 
        timestamp: "2019-02-08T00:00:00Z",
        rxPacketsReceived: 5,
        rxPacketsReceivedOk: 5,
        txPacketsReceived: 5,
        txPacketsEmitted: 5,
    }
} */