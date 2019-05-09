let AFR_1 = { headers: '"Device Uplink ID,Device ID,Sub-Network ID"',
            device_uplink_id_min: 8183,
            device_uplink_id_max: 8728,
            network: '[342]',
            sub_network: '[156]',
            vessel: '[2]',
            device: '[7]',
            start_date: null,
            end_data: null,
            sort_by: null,
            order: null,
            user_id: 68 };


let DUR_1 = {
	"data":
		[
			{
				"device_uplink_id": 4072,
				"device_id": 2,
				"sub_network_id": "156",
				"vessel_id": 3,
				"time_stamp": "2019-03-18 01:08:02",
				"sub_network_name": "Marine_IoT",
				"device_eui": "2222222222222222",
				"device_name": "Device_2",
				"gateway_id_lora": "2222222222222222",
				"gateway_name": "Gateway_1",
				"rx_time": "2019-03-07T20:43:02Z",
				"rx_rssi": "3",
				"rx_lora_snr": "0.8193636",
				"gateway_latitude": "10.248639",
				"gateway_longitude": "10.248639",
				"gateway_altitude": "0",
				"tx_frequency": "0",
				"tx_data_rate": "4",
				"adr": "false",
				"frame_counter": "0",
				"fport": "1",
				"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
				"gps_latitude": 12.088338683329,
				"gps_longitude": -61.8399810791016,
				"gps_altitude": "8.66",
				"temperature": "28.85",
				"humidity": "25",
				"accelerometer": "30",
				"sos": 0
			}
		]
}

let DUR_2 = {
	"_id": {
		"$oid": "5c8f27b2a488b55a357f534c"
	},
	"applicationID": "156",
	"applicationName": "Marine_IoT",
	"deviceName": "Device_2",
	"devEUI": "2222222222222222",
	"rxInfo": [
		{
			"gatewayID": "2222222222222222",
			"name": "Gateway_1",
			"time": "2019-03-07T20:43:02Z",
			"rssi": 3,
			"loRaSNR": 0.8193636,
			"location": {
				"latitude": 10.248639,
				"longitude": 10.248639,
				"altitude": 0
			}
		}
	],
	"txInfo": {
		"frequency": 0,
		"dr": 4
	},
	"adr": false,
	"fCnt": 0,
	"fPort": 1,
	"data": "BGYAA2cKAAGIAaKx9pYIAANi",
	"object": {
		"humiditySensor": {
			"1": 30
		},
		"accelerometerSensor": {
			"1": 25.67
		},
		"temperatureSensor": {
			"3": 28.85
		},
		"gpsLocation": {
			"1": {
				"latitude": "12.088338683329036",
				"longitude": "-61.83998107910156",
				"altitude": 8.66
			}
		}
	},
	"vessel_id": 3,
	"device_id": 2
}
//----------------------------------------------------------------------------------------------------------------Database Test----------------------------------------------------------------------------------------------------------------

//Organization----------------------------------------------------------------------------------------------------------------
let get_organizations_1 = {
	"data":
	[
		{
			"network_id": "342",
			"network_name": "CIRP",
			"network_display_name": "Caribbean ICT Research Program",
			"network_can_have_gateways": 1,
			"network_deleted": 0
		}
	]
}
let get_organizations_2 = {
	"data":
	[
		{
			"network_id": "342",
			"network_name": "CIRP",
			"network_display_name": "Caribbean ICT Research Program",
			"network_can_have_gateways": 1,
			"network_deleted": 0
		}
	]
}

let create_organization_1 = {
	"data":
	[
		{
			"network_id": "376",
			"network_name": "Test_Organization",
			"network_display_name": "This is just for testing",
			"network_can_have_gateways": 1,
			"network_deleted": 0
		}
	]
}

let update_organization_1 = {
	"data":
	[
		{
			"network_id": "376",
			"network_name": "Test_Organization",
			"network_display_name": "This is just for testing",
			"network_can_have_gateways": 1,
			"network_deleted": 1
		}
	]
}

let update_organization_2 = {
	"data":
	[
		{
			"network_id": "342",
			"network_name": "CIRP_S",
			"network_display_name": "Caribbean ICT Research Program",
			"network_can_have_gateways": 1,
			"network_deleted": 0
		}
	]
}
//Application----------------------------------------------------------------------------------------------------------------

let get_application_1 = {
	"data":
	[
		{
			"sub_network_id": "156",
			"network_id": "342",
			"service_profile_id": "ae2ed918-d653-4a14-b638-b52236d2d0ae",
			"sub_network_name": "Marine_IoT",
			"sub_network_description": "This application encompasses all of the vessels and devices which are part of the Marine IoT application which falls under the CIRP organization.",
			"sub_network_deleted": 0
		}
	]
}
let get_application_2 = {
	"data":
	[
		{
			"sub_network_id": "156",
			"network_id": "342",
			"service_profile_id": "ae2ed918-d653-4a14-b638-b52236d2d0ae",
			"sub_network_name": "Marine_IoT",
			"sub_network_description": "This application encompasses all of the vessels and devices which are part of the Marine IoT application which falls under the CIRP organization.",
			"sub_network_deleted": 0
		}
	]
}

let create_application_1 = {
	"data":
	[
		{
			"sub_network_id": "161",
			"network_id": "342",
			"service_profile_id": "ae2ed918-d653-4a14-b638-b52236d2d0ae",
			"sub_network_name": "Test_Application",
			"sub_network_description": "Test",
			"sub_network_deleted": 0
		}
	]
}

let update_application_1 = {
	"data":
	[
		{
			"sub_network_id": "161",
			"network_id": "342",
			"service_profile_id": "ae2ed918-d653-4a14-b638-b52236d2d0ae",
			"sub_network_name": "Test_Application",
			"sub_network_description": "Test",
			"sub_network_deleted": 1
		}
	]
}

let update_application_2 = {
	"data":
	[
		{
			"sub_network_id": "156",
			"network_id": "342",
			"service_profile_id": "ae2ed918-d653-4a14-b638-b52236d2d0ae",
			"sub_network_name": "Marine_IoT_1",
			"sub_network_description": "This application encompasses all of the vessels and devices which are part of the Marine IoT application which falls under the CIRP organization.",
			"sub_network_deleted": 0
		}
	]
}

//Vessels----------------------------------------------------------------------------------------------------------------
let get_vessel_1 = {
	"data":
	[
		{
			"vessel_id": 2,
			"vessel_name": "Time Chaser",
			"sub_network_id": "156",
			"vessel_unique_vessel_identifier": "11111",
			"vessel_international_radio_call_sign": "111",
			"vessel_type": "Artisanal Fishing",
			"vessel_deleted": 0
		}
	]
}

let get_vessel_2 = {
	"data":
	[
		{
			"vessel_id": 3,
			"vessel_name": "Sunset",
			"sub_network_id": "156",
			"vessel_unique_vessel_identifier": "3456",
			"vessel_international_radio_call_sign": "3456",
			"vessel_type": "Artisanal Fishing",
			"vessel_deleted": 0
		}
	]
}
let get_vessel_3 = {
	"data":
	[
		{
			"vessel_id": 2,
			"vessel_name": "Time Chaser",
			"sub_network_id": "156",
			"vessel_unique_vessel_identifier": "11111",
			"vessel_international_radio_call_sign": "111",
			"vessel_type": "Artisanal Fishing",
			"vessel_deleted": 0
		},
		{
			"vessel_id": 3,
			"vessel_name": "Sunset",
			"sub_network_id": "156",
			"vessel_unique_vessel_identifier": "3456",
			"vessel_international_radio_call_sign": "3456",
			"vessel_type": "Artisanal Fishing",
			"vessel_deleted": 0
		},
		{
			"vessel_id": 4,
			"vessel_name": "Paria",
			"sub_network_id": "156",
			"vessel_unique_vessel_identifier": "csdf",
			"vessel_international_radio_call_sign": "wert",
			"vessel_type": "Artisanal Fishing",
			"vessel_deleted": 0
		}
	]
}
let get_vessel_5 = {
	"data":
	[
		{
			"vessel_id": 2,
			"vessel_name": "Time Chaser",
			"sub_network_id": "156",
			"vessel_unique_vessel_identifier": "11111",
			"vessel_international_radio_call_sign": "111",
			"vessel_type": "Artisanal Fishing",
			"vessel_deleted": 0
		},
		{
			"vessel_id": 3,
			"vessel_name": "Sunset",
			"sub_network_id": "156",
			"vessel_unique_vessel_identifier": "3456",
			"vessel_international_radio_call_sign": "3456",
			"vessel_type": "Artisanal Fishing",
			"vessel_deleted": 0
		},
		{
			"vessel_id": 4,
			"vessel_name": "Paria",
			"sub_network_id": "156",
			"vessel_unique_vessel_identifier": "csdf",
			"vessel_international_radio_call_sign": "wert",
			"vessel_type": "Artisanal Fishing",
			"vessel_deleted": 0
		}
	]
}

let get_vessel_6 = {
	"data":
	[
		{
			"vessel_id": 1,
			"vessel_name": "Default",
			"sub_network_id": "156",
			"vessel_unique_vessel_identifier": null,
			"vessel_international_radio_call_sign": null,
			"vessel_type": "default",
			"vessel_deleted": 1
		}
	]
}

let create_vessel_1 = {
	"data":
	[
		{
			"vessel_id": 2,
			"vessel_name": "Time Chaser",
			"sub_network_id": "156",
			"vessel_unique_vessel_identifier": "11111",
			"vessel_international_radio_call_sign": "111",
			"vessel_type": "Artisanal Fishing",
			"vessel_deleted": 0
		}
	]
}

let create_vessel_2 = {
	"data":
	[
		{
			"vessel_id": 1,
			"vessel_name": "Default",
			"sub_network_id": "156",
			"vessel_unique_vessel_identifier": null,
			"vessel_international_radio_call_sign": null,
			"vessel_type": "default",
			"vessel_deleted": 1
		}
	]
}

let update_vessel_1 = {
	"data":
	[
		{
			"vessel_id": 2,
			"vessel_name": "Time Chaser 1",
			"sub_network_id": "156",
			"vessel_unique_vessel_identifier": "11111",
			"vessel_international_radio_call_sign": "111",
			"vessel_type": "Artisanal Fishing",
			"vessel_deleted": 0
		}
	]
}

let delete_vessel_1 = {
	"data":
	[
		{
			"vessel_id": 4,
			"vessel_name": "Paria",
			"sub_network_id": "156",
			"vessel_unique_vessel_identifier": "csdf",
			"vessel_international_radio_call_sign": "wert",
			"vessel_type": "Artisanal Fishing",
			"vessel_deleted": 1
		}
	]
}
//Devices----------------------------------------------------------------------------------------------------------------

let get_device_1 = {
	"data":
	[
		{
			"device_id": 1,
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device",
			"device_deleted": 0
		},
		{
			"device_id": 2,
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "This device is a test device for Grenada",
			"device_deleted": 0
		},
		{
			"device_id": 3,
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "This is a test device for tobago",
			"device_deleted": 0
		},
		{
			"device_id": 4,
			"device_eui": "4444444444444444",
			"device_name": "Device_4",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 4",
			"device_deleted": 0
		},
		{
			"device_id": 5,
			"device_eui": "5555555555555555",
			"device_name": "Device_5",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 5",
			"device_deleted": 0
		},
		{
			"device_id": 6,
			"device_eui": "6666666666666666",
			"device_name": "Device_6",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 6",
			"device_deleted": 0
		},
		{
			"device_id": 7,
			"device_eui": "7777777777777777",
			"device_name": "Device_7",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 7",
			"device_deleted": 1
		},
		{
			"device_id": 8,
			"device_eui": "8888888888888888",
			"device_name": "Device_8",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 8",
			"device_deleted": 0
		},
		{
			"device_id": 9,
			"device_eui": "9999999999999999",
			"device_name": "Device_9",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 9",
			"device_deleted": 0
		},
		{
			"device_id": 10,
			"device_eui": "1000000000000000",
			"device_name": "Device_10",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 10",
			"device_deleted": 0
		}
	]
}

let get_device_2 = {
        "device_id": 3,
        "device_eui": "3333333333333333",
        "device_name": "Device_3",
        "sub_network_id": "156",
        "device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
        "device_description": "This is a test device for tobago",
        "device_deleted": 0
}

let get_device_3 = 		{
    "device_id": 1,
    "device_eui": "1111111111111111",
    "device_name": "Device_1",
    "sub_network_id": "156",
    "device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
    "device_description": "Device",
    "device_deleted": 0
}

let get_device_4 = 		{
    "device_id": 10,
    "device_eui": "1000000000000000",
    "device_name": "Device_10",
    "sub_network_id": "156",
    "device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
    "device_description": "Device 10",
    "device_deleted": 0
}

let get_device_5 = {
	"data":
	[
		{
			"device_id": 1,
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device",
			"device_deleted": 0
		},
		{
			"device_id": 2,
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "This device is a test device for Grenada",
			"device_deleted": 0
		},
		{
			"device_id": 3,
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "This is a test device for tobago",
			"device_deleted": 0
		},
		{
			"device_id": 4,
			"device_eui": "4444444444444444",
			"device_name": "Device_4",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 4",
			"device_deleted": 0
		},
		{
			"device_id": 5,
			"device_eui": "5555555555555555",
			"device_name": "Device_5",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 5",
			"device_deleted": 0
		},
		{
			"device_id": 6,
			"device_eui": "6666666666666666",
			"device_name": "Device_6",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 6",
			"device_deleted": 0
		},
		{
			"device_id": 7,
			"device_eui": "7777777777777777",
			"device_name": "Device_7",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 7",
			"device_deleted": 1
		},
		{
			"device_id": 8,
			"device_eui": "8888888888888888",
			"device_name": "Device_8",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 8",
			"device_deleted": 0
		},
		{
			"device_id": 9,
			"device_eui": "9999999999999999",
			"device_name": "Device_9",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 9",
			"device_deleted": 0
		},
		{
			"device_id": 10,
			"device_eui": "1000000000000000",
			"device_name": "Device_10",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 10",
			"device_deleted": 0
		}
	]
}

let get_device_6 = {
	"data":
	[
		{
			"device_id": 1,
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device",
			"device_deleted": 0
		},
		{
			"device_id": 2,
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "This device is a test device for Grenada",
			"device_deleted": 0
		},
		{
			"device_id": 3,
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "This is a test device for tobago",
			"device_deleted": 0
		},
		{
			"device_id": 4,
			"device_eui": "4444444444444444",
			"device_name": "Device_4",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 4",
			"device_deleted": 0
		},
		{
			"device_id": 5,
			"device_eui": "5555555555555555",
			"device_name": "Device_5",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 5",
			"device_deleted": 0
		},
		{
			"device_id": 6,
			"device_eui": "6666666666666666",
			"device_name": "Device_6",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 6",
			"device_deleted": 0
		},
		{
			"device_id": 8,
			"device_eui": "8888888888888888",
			"device_name": "Device_8",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 8",
			"device_deleted": 0
		},
		{
			"device_id": 9,
			"device_eui": "9999999999999999",
			"device_name": "Device_9",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 9",
			"device_deleted": 0
		},
		{
			"device_id": 10,
			"device_eui": "1000000000000000",
			"device_name": "Device_10",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 10",
			"device_deleted": 0
		}
	]
}

let get_device_7 = 		{
    "device_id": 7,
    "device_eui": "7777777777777777",
    "device_name": "Device_7",
    "sub_network_id": "156",
    "device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
    "device_description": "Device 7",
    "device_deleted": 1
}

let get_device_8 = {
	"data":
	[
		{
			"device_id": 1,
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device",
			"device_deleted": 0
		},
		{
			"device_id": 2,
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "This device is a test device for Grenada",
			"device_deleted": 0
		},
		{
			"device_id": 3,
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "This is a test device for tobago",
			"device_deleted": 0
		},
		{
			"device_id": 4,
			"device_eui": "4444444444444444",
			"device_name": "Device_4",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 4",
			"device_deleted": 0
		},
		{
			"device_id": 5,
			"device_eui": "5555555555555555",
			"device_name": "Device_5",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 5",
			"device_deleted": 0
		},
		{
			"device_id": 6,
			"device_eui": "6666666666666666",
			"device_name": "Device_6",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 6",
			"device_deleted": 0
		},
		{
			"device_id": 8,
			"device_eui": "8888888888888888",
			"device_name": "Device_8",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 8",
			"device_deleted": 0
		},
		{
			"device_id": 9,
			"device_eui": "9999999999999999",
			"device_name": "Device_9",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 9",
			"device_deleted": 0
		},
		{
			"device_id": 10,
			"device_eui": "1000000000000000",
			"device_name": "Device_10",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 10",
			"device_deleted": 0
		}
	]
}

let get_device_9 = 		{
    "device_id": 10,
    "device_eui": "1000000000000000",
    "device_name": "Device_10",
    "sub_network_id": "156",
    "device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
    "device_description": "Device 10",
    "device_deleted": 0
}

let create_device = {
	"data":
	[
		{
			"device_name": 'Device_11',
            "device_eui": '1111111123332433',
            "device_description": 'This is a test device',
            "sub_network_id": '156',
            "vessel_id": '',
            "device_profile_id_lora": 'f7963621-76d3-4f9b-bd5b-858468a14b8b',
            "reference_altitude": '0',
            "skip_frame_counter": true 
		}
	]
}

let update_device_1  = {
	"data":
	[
		{
			"device_id": 7,
			"device_eui": "7777777777777777",
			"device_name": "Device_7",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "Device 7",
            "device_deleted": 1
        }
	]
}

let update_device_2 = {
	"data":
	[
		{
			"device_id": 14,
			"device_eui": "1111111123332433",
			"device_name": "Device_1123",
			"sub_network_id": "156",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_description": "This is a test",
			"device_deleted": 0
		}
	]
}
//Gateway----------------------------------------------------------------------------------------------------------------
let get_gateway_1 = {
	"data":
	[
		{
			"gateway_id": 1,
			"network_id": "342",
			"gateway_name": "Gateway_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_description": "First Gateway",
			"network_server_id": "8",
			"gateway_created_at": "2019-02-14 01:36:36",
			"gateway_deleted": "0"
		}
	]
}

let get_gateway_2 = {
	"data":
	[
		{
			"gateway_id": 1,
			"network_id": "342",
			"gateway_name": "Gateway_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_description": "First Gateway",
			"network_server_id": "8",
			"gateway_created_at": "2019-02-14 01:36:36",
			"gateway_deleted": "0"
		}
	]
}

let get_gateway_3 = {
	"data":
	[
		{
			"gateway_id": 1,
			"network_id": "342",
			"gateway_name": "Gateway_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_description": "First Gateway",
			"network_server_id": "8",
			"gateway_created_at": "2019-02-14 01:36:36",
			"gateway_deleted": "0"
		},
		{
			"gateway_id": 2,
			"network_id": "342",
			"gateway_name": "sdfgsdf",
			"gateway_id_lora": "4325634563456345",
			"gateway_description": "gfhjfghj",
			"network_server_id": "8",
			"gateway_created_at": "2019-02-24 22:43:28",
			"gateway_deleted": "1"
		},
		{
			"gateway_id": 3,
			"network_id": "342",
			"gateway_name": "sdfgsdfdfg",
			"gateway_id_lora": "4325634563434543",
			"gateway_description": "gfhjfghj",
			"network_server_id": "8",
			"gateway_created_at": "2019-02-24 22:43:26",
			"gateway_deleted": "1"
		}
	]
}

let create_gateway_1 = {
	"data":
	[
		{
			"gateway_id": 11,
			"network_id": "342",
			"gateway_name": "Test_Gateway",
			"gateway_id_lora": "6545674567456745",
			"gateway_description": "This is a test Gateway",
			"network_server_id": "8",
			"gateway_created_at": "2019-03-10 01:17:37",
			"gateway_deleted": "0"
		}
	]
}

let update_gateway_1 = {
	"data":
	[
		{
			"gateway_id": 11,
			"network_id": "342",
			"gateway_name": "Test_Gateway",
			"gateway_id_lora": "6545674567456745",
			"gateway_description": "This is a test Gateway",
			"network_server_id": "8",
			"gateway_created_at": "2019-03-10 01:17:37",
			"gateway_deleted": "1"
		}
	]
}

let update_gateway_2 = {
	"data":
	[
		{
			"gateway_id": 1,
			"network_id": "342",
			"gateway_name": "Gateway_1995",
			"gateway_id_lora": "2222222222222222",
			"gateway_description": "First Gateway 1",
			"network_server_id": "8",
			"gateway_created_at": "2019-03-10 01:19:02",
			"gateway_deleted": "0"
		}
	]
}

//Service Profile----------------------------------------------------------------------------------------------------------------
let get_service_profile ={
	"data":
	[
		{
			"service_profile_id": 1,
			"service_profile_id_lora": "ae2ed918-d653-4a14-b638-b52236d2d0ae",
			"service_profile_name": "Service Profile 1",
			"network_server_id": "8",
			"network_id": "342",
			"service_profile_created_at": "2019-02-14T03:11:04.107833Z",
			"service_profile_deleted": 0
		}
	]
}

let create_service_profile = {
	"data":
	[
		{
			"service_profile_id": 2,
			"service_profile_id_lora": "fe592498-6c54-4f41-ac53-ef0e3088e7fe",
			"service_profile_name": "Test Service Profile",
			"network_server_id": "8",
			"network_id": "342",
			"service_profile_created_at": "2019-03-10T05:31:11.471296Z",
			"service_profile_deleted": 0
		}
	]
}

let update_service_profie_1 = {
	"data":
	[
		{
			"service_profile_id": 2,
			"service_profile_id_lora": "fe592498-6c54-4f41-ac53-ef0e3088e7fe",
			"service_profile_name": "Test Service Profile",
			"network_server_id": "8",
			"network_id": "342",
			"service_profile_created_at": "2019-03-10T05:31:11.471296Z",
			"service_profile_deleted": 1
		}
	]
}

let update_service_profile_2 = {
	"data":
	[
		{
			"service_profile_id": 1,
			"service_profile_id_lora": "ae2ed918-d653-4a14-b638-b52236d2d0ae",
			"service_profile_name": "Service Profile 1995",
			"network_server_id": "8",
			"network_id": "342",
			"service_profile_created_at": "2019-02-14T03:11:04.107833Z",
			"service_profile_deleted": 0
		}
	]
}

//Device Profile----------------------------------------------------------------------------------------------------------------
let get_device_profile = {
	"data":
	[
		{
			"device_profile_id": 1,
			"network_id": "342",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_profile_name": "ABP",
			"network_server_id": "8",
			"device_profile_created_at": "2019-02-14T05:09:43.235776Z",
			"device_profile_deleted": 0
		}
	]
}

let create_device_profile = {
	"data":
	[
		{
			"device_profile_id": 2,
			"network_id": "342",
			"device_profile_id_lora": "d0a189e2-21fa-476b-87f1-05607eb3ed30",
			"device_profile_name": "Test Device Profile",
			"network_server_id": "8",
			"device_profile_created_at": "2019-03-10T05:50:14.784612Z",
			"device_profile_deleted": 0
		}
	]
}

let update_device_profie_1= {
	"data":
	[
		{
			"device_profile_id": 2,
			"network_id": "342",
			"device_profile_id_lora": "d0a189e2-21fa-476b-87f1-05607eb3ed30",
			"device_profile_name": "Test Device Profile",
			"network_server_id": "8",
			"device_profile_created_at": "2019-03-10T05:50:14.784612Z",
			"device_profile_deleted": 1
		}
	]
}

let update_device_profile_2 = {
	"data":
	[
		{
			"device_profile_id": 1,
			"network_id": "342",
			"device_profile_id_lora": "f7963621-76d3-4f9b-bd5b-858468a14b8b",
			"device_profile_name": "ABP 1995",
			"network_server_id": "8",
			"device_profile_created_at": "2019-02-14T05:09:43.235776Z",
			"device_profile_deleted": 0
		}
	]
}

//Gateway Profile----------------------------------------------------------------------------------------------------------------
let get_gateway_profile = {
	"data":
	[
		{
			"gateway_profile_id": 6,
			"gateway_profile_id_lora": "0c2a8804-406e-4e30-b4d9-6313ac0147db",
			"gateway_profile_name": "Gateway Profile",
			"network_server_id": "8",
			"gateway_profile_created_at": "2019-02-27T02:42:33.261118Z",
			"gateway_profile_deleted": 0
		}
	]
}

let create_gateway_profile = {
	"data":
	[
		{
			"gateway_profile_id": 7,
			"gateway_profile_id_lora": "e26cad40-ab4b-406f-8958-0eb94ce41bc8",
			"gateway_profile_name": "Test Gateway Profile",
			"network_server_id": "8",
			"gateway_profile_created_at": "2019-03-10T06:01:45.329760Z",
			"gateway_profile_deleted": 0
		}
	]
}

let update_gateway_profie_1= {
	"data":
	[
		{
			"gateway_profile_id": 7,
			"gateway_profile_id_lora": "e26cad40-ab4b-406f-8958-0eb94ce41bc8",
			"gateway_profile_name": "Test Gateway Profile",
			"network_server_id": "8",
			"gateway_profile_created_at": "2019-03-10T06:01:45.329760Z",
			"gateway_profile_deleted": 1
		}
	]
}

let update_gateway_profile_2 = {
	"data":
	[
		{
			"gateway_profile_id": 6,
			"gateway_profile_id_lora": "0c2a8804-406e-4e30-b4d9-6313ac0147db",
			"gateway_profile_name": "Gateway Profile 1995asdf",
			"network_server_id": "8",
			"gateway_profile_created_at": "2019-02-27T02:42:33.261118Z",
			"gateway_profile_deleted": 0
		}
	]
}

//Activate User Account Token----------------------------------------------------------------------------------------------------------------
let get_activate_user_account_token = {
	"data":
	[
		{
			"activate_user_account_token_id": 1,
			"activate_user_account_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyZGZnaEBmZHNkZ2YuZGZnIiwidXNlcl9pZCI6IjcwIiwiaWF0IjoxNTUyMjM1NjExLCJleHAiOjE1NTI0MDg0MTF9.JPmEvWC5qb5TNfZOEnRXT0TEkceUh5uVV2W_x-_JkXA",
			"activate_user_account_token_time_stamp": "2019-03-10 12:33:34",
			"user_id": 70
		}
	]
}

let create_activate_user_account_token = {
	"data":
	[
		{
			"activate_user_account_token_id": 2,
			"activate_user_account_token": "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzdEB0dC5jb20iLCJ1c2VyX2lkIjoiNzEiLCJpYXQiOjE1NTIyMzY0NjUsImV4cCI6MTU1MjQwOTI2NX0.SKnG8iJqARhMxxB2xiZ96NU8sPDpYE9l5v-gP9pqm5A",
			"activate_user_account_token_time_stamp": "2019-03-10 12:33:34",
			"user_id": 71
		}
	]
}

//User Reset Password Token----------------------------------------------------------------------------------------------------------------
let get_user_reset_password_token = {
	"data":
	[
		{
			"user_reset_password_token_id": 1,
			"user_reset_password_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY2hvbGFzYm9zczFAaG90bWFpbC5jb20iLCJ1c2VyX2lkIjoiNjUiLCJpYXQiOjE1NTIyMzY5MjUsImV4cCI6MTU1MjMyMzMyNX0.1QGgBBJ23Nw3VTexaobujyWbgKM0xwouQJ29rKrvkrc",
			"user_reset_password_token_time_stamp": "2019-03-10 12:55:27",
			"user_id": 65
		}
	]
}

let create_user_reset_password_token = {
	"data":
	[
		{
			"user_reset_password_token_id": 2,
			"user_reset_password_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY2hvbGFzLmptaXRjaGVsbEBvdXRsb29rLmNvbSIsInVzZXJfaWQiOiI2OCIsImlhdCI6MTU1MjIzNzAyNSwiZXhwIjoxNTUyMzIzNDI1fQ.lvT5Q71ZJsw7zZ5EQkK8Bt_KBIvw9xSeKc5YwcpbHtI",
			"user_reset_password_token_time_stamp": "2019-03-10 12:57:07",
			"user_id": 68
		}
	]
}

//Users----------------------------------------------------------------------------------------------------------------
let add_user = {
	"data":
	[
		{
			"id": 72,
			"email": "t@t.tt",
			"first_name": "Test",
			"last_name": "Test",
			"password": "null",
			"home_phone": "4745764756",
			"mobile_phone": "7454564567",
			"new_user": 1,
			"date_created": "2019-03-10 13:15:19",
			"user_class": "Fisher",
			"user_country": "test",
			"user_city": "test",
			"user_district": "test",
			"user_street": "test",
			"user_reset_password": 0,
			"user_account_activation": 0
		}
	]
}

let get_user_1 = {
	"data":
	[
		{
			"id": 72,
			"email": "t@t.tt",
			"first_name": "Test",
			"last_name": "Test",
			"password": "null",
			"home_phone": "4745764756",
			"mobile_phone": "7454564567",
			"new_user": 1,
			"date_created": "2019-03-10 13:15:19",
			"user_class": "Fisher",
			"user_country": "test",
			"user_city": "test",
			"user_district": "test",
			"user_street": "test",
			"user_reset_password": 0,
			"user_account_activation": 0
		}
	]
}

let get_users_2 = {
	"data":
	[
		{
			"id": 3,
			"email": "swimdara@hotmail.com",
			"first_name": "Adara",
			"last_name": "Mitchell",
			"password": "$2a$05$SZ8Ma5nrCUTeg9NoXtEcgO/ozcgK2pJbEBCYiKK5nJfO1zKFrV5.e",
			"home_phone": "2147483647",
			"mobile_phone": "2222222222",
			"new_user": 0,
			"date_created": "2018-10-19 18:23:54",
			"user_class": "Fisher",
			"user_country": "Trinidad",
			"user_city": "Bobby Town",
			"user_district": "Bobs",
			"user_street": "BB",
			"user_reset_password": 0,
			"user_account_activation": 1
		},
		{
			"id": 4,
			"email": "lorawanconsole@gmail.com",
			"first_name": "Nick",
			"last_name": "Mitchell",
			"password": "$2a$05$i7bkbYG6X70iLCu8ougf9e4h2bL6srPGbJ8brsNxHPr6P0cjhsabS",
			"home_phone": "2147483647",
			"mobile_phone": "8683229648",
			"new_user": 0,
			"date_created": "2018-10-09 01:28:54",
			"user_class": "Software Admin",
			"user_country": "Trinidad",
			"user_city": "POS",
			"user_district": "WEST",
			"user_street": "MALL",
			"user_reset_password": 0,
			"user_account_activation": 1
		},
		{
			"id": 21,
			"email": "gabrielle_gibson12@yahoo.com",
			"first_name": "gabrielle",
			"last_name": "gibson",
			"password": "$2a$05$m2xiwBq3rT0ZAmD9r6s/1uroZ.0mlgyK2uFiolsPXRvRihlLchkdC",
			"home_phone": "2222222222",
			"mobile_phone": "2324523452",
			"new_user": 1,
			"date_created": "2019-01-24 22:27:24",
			"user_class": "Software Admin",
			"user_country": "Trinidad & Tobago",
			"user_city": "San Fernando",
			"user_district": "sdfsad",
			"user_street": "#18 Sunset Ridge La Romain",
			"user_reset_password": 0,
			"user_account_activation": 1
		},
		{
			"id": 23,
			"email": "gregory.mtchll@gmail.com",
			"first_name": "Gregory",
			"last_name": "Mitchell",
			"password": "$2a$05$S3dRANelDigdIH3/dIu1Fu3B6itG.Dv7b4cJR328PGo.NpO01M3/O",
			"home_phone": "1868687845",
			"mobile_phone": "8683229648",
			"new_user": 1,
			"date_created": "2019-02-05 21:18:31",
			"user_class": "IoT Network Admin",
			"user_country": "Trinidad & Tobago",
			"user_city": "San Fernando",
			"user_district": "sdfdsgfd",
			"user_street": "#18 Sunset Ridge La Romain",
			"user_reset_password": 0,
			"user_account_activation": 1
		},
		{
			"id": 24,
			"email": "nicmitch0@gmail.com",
			"first_name": "nicholas",
			"last_name": "mitchell",
			"password": "$2a$05$F9umQ/rhllAESbjgsYMveeDP.zE8y4hAVxSnKRaMaET44FxH21RVy",
			"home_phone": "8683229648",
			"mobile_phone": "8683229648",
			"new_user": 0,
			"date_created": "2019-02-05 21:20:18",
			"user_class": "IoT Network Admin",
			"user_country": "Trinidad & Tobago",
			"user_city": "San Fernando",
			"user_district": "sdfg sdfgsdf g",
			"user_street": "#18 Sunset Ridge La Romain",
			"user_reset_password": 0,
			"user_account_activation": 1
		},
		{
			"id": 64,
			"email": "nicholas.mitchell@my.uwi.edu",
			"first_name": "nicholas",
			"last_name": "mitchell",
			"password": "$2a$05$1c4OKWNacyQbahYEVHk5t.oABuL6m95ryT.PncqoAA5rFnxeJ/Yw2",
			"home_phone": "8683229648",
			"mobile_phone": "8683229648",
			"new_user": 0,
			"date_created": "2019-02-15 21:21:17",
			"user_class": "Analyst",
			"user_country": "Trinidad & Tobago",
			"user_city": "San Fernando",
			"user_district": "sdfsd",
			"user_street": "#18 Sunset Ridge La Romain",
			"user_reset_password": 0,
			"user_account_activation": 1
		},
		{
			"id": 65,
			"email": "nicholasboss1@hotmail.com",
			"first_name": "nicholas",
			"last_name": "mitchell",
			"password": "$2a$05$Pa0WNrE4de9IaoZzq1OUWuu6q.JlTe3wIZ/XdSQN3hv1O3CfisScO",
			"home_phone": "8683229648",
			"mobile_phone": "8683229648",
			"new_user": 0,
			"date_created": "2019-02-16 00:09:48",
			"user_class": "IoT Network Admin",
			"user_country": "Trinidad & Tobago",
			"user_city": "San Fernando",
			"user_district": "gfjhfg",
			"user_street": "#18 Sunset Ridge La Romain",
			"user_reset_password": 0,
			"user_account_activation": 1
		},
		{
			"id": 68,
			"email": "nicholas.jmitchell@outlook.com",
			"first_name": "nicholas",
			"last_name": "mitchell",
			"password": "$2a$05$N4uXmScgq5bUZt77k.k3p.MJORhdPu8z5upAozYC4V3CgJg6OftCu",
			"home_phone": "8683229648",
			"mobile_phone": "8683229648",
			"new_user": 0,
			"date_created": "2019-03-07 12:39:46",
			"user_class": "Fisher",
			"user_country": "Trinidad & Tobago",
			"user_city": "San Fernando",
			"user_district": "34534",
			"user_street": "#18 Sunset Ridge La Romain",
			"user_reset_password": 0,
			"user_account_activation": 1
		},
		{
			"id": 72,
			"email": "t@t.tt",
			"first_name": "Test",
			"last_name": "Test",
			"password": "null",
			"home_phone": "4745764756",
			"mobile_phone": "7454564567",
			"new_user": 1,
			"date_created": "2019-03-10 13:15:19",
			"user_class": "Fisher",
			"user_country": "test",
			"user_city": "test",
			"user_district": "test",
			"user_street": "test",
			"user_reset_password": 0,
			"user_account_activation": 0
		}
	]
}

let get_users_3 = {
	"data":
	[
		{
			"email": "gabrielle_gibson12@yahoo.com"
		},
		{
			"email": "gregory.mtchll@gmail.com"
		},
		{
			"email": "lorawanconsole@gmail.com"
		},
		{
			"email": "nicholas.jmitchell@outlook.com"
		},
		{
			"email": "nicholas.mitchell@my.uwi.edu"
		},
		{
			"email": "nicholasboss1@hotmail.com"
		},
		{
			"email": "nicmitch0@gmail.com"
		},
		{
			"email": "swimdara@hotmail.com"
		}
	]
}

let update_user_1 = {
	"data":
	[
		{
			"id": 64,
			"email": "nicholas.mitchell@my.uwi.edu",
			"first_name": "Nick",
			"last_name": "Mitch",
			"password": "$2a$05$1c4OKWNacyQbahYEVHk5t.oABuL6m95ryT.PncqoAA5rFnxeJ/Yw2",
			"home_phone": "8683229648",
			"mobile_phone": "8683229648",
			"new_user": 0,
			"date_created": "2019-02-15 21:21:17",
			"user_class": "Analyst",
			"user_country": "Trinidad",
			"user_city": "San Fernando",
			"user_district": "sdfsd",
			"user_street": "18 Sunset Ridge La Romain",
			"user_reset_password": 0,
			"user_account_activation": 1
		}
	]
}


let update_user_2 = {
	"data":
	[
		{
			"id": 68,
			"email": "nicholas.jmitchell@outlook.com",
			"first_name": "nicholas",
			"last_name": "mitchell",
			"password": "$2a$05$N4uXmScgq5bUZt77k.k3p.MJORhdPu8z5upAozYC4V3CgJg6OftCu",
			"home_phone": "8683229648",
			"mobile_phone": "8683229648",
			"new_user": 0,
			"date_created": "2019-03-07 12:39:46",
			"user_class": "Fisher",
			"user_country": "Trinidad & Tobago",
			"user_city": "San Fernando",
			"user_district": "34534",
			"user_street": "#18 Sunset Ridge La Romain",
			"user_reset_password": 1,
			"user_account_activation": 1
		}
	]
}

let update_user_3 = {
	"data":
	[
		{
			"id": 68,
			"email": "nicholas.jmitchell@outlook.com",
			"first_name": "nicholas",
			"last_name": "mitchell",
			"password": "$2a$05$jp/YDnM2V5MZXCOBUjutXunVueWhWP9tB5atwUFZdRjKrWBEwdEA2",
			"home_phone": "8683229648",
			"mobile_phone": "8683229648",
			"new_user": 0,
			"date_created": "2019-03-07 12:39:46",
			"user_class": "Fisher",
			"user_country": "Trinidad & Tobago",
			"user_city": "San Fernando",
			"user_district": "34534",
			"user_street": "#18 Sunset Ridge La Romain",
			"user_reset_password": 0,
			"user_account_activation": 1
		}
	]
}

//User Vessel----------------------------------------------------------------------------------------------------------------
let get_user_vessel_1 = {
	"data":
	[
		{
			"id": 6,
			"user_id": 65,
			"vessel_id": 2,
			"date_created": "2019-02-16 00:11:10",
			"date_deleted": "2019-02-16 00:11:49",
			"deleted": 1
		}
	]
}

let get_user_vessel_2 = {
	"data":
	[
		{
			"id": 9,
			"user_id": 68,
			"vessel_id": 2,
			"date_created": "2019-03-09 22:36:33",
			"date_deleted": null,
			"deleted": 0
		}
	]
}

let get_user_vessel_3 = {
	"data":
	[
		{
			"id": 6,
			"user_id": 65,
			"vessel_id": 2,
			"date_created": "2019-02-16 00:11:10",
			"date_deleted": "2019-02-16 00:11:49",
			"deleted": 1
		},
		{
			"id": 7,
			"user_id": 65,
			"vessel_id": 2,
			"date_created": "2019-02-16 00:12:33",
			"date_deleted": "2019-02-28 21:02:15",
			"deleted": 1
		},
		{
			"id": 8,
			"user_id": 64,
			"vessel_id": 2,
			"date_created": "2019-02-16 22:44:18",
			"date_deleted": null,
			"deleted": 0
		},
		{
			"id": 9,
			"user_id": 68,
			"vessel_id": 2,
			"date_created": "2019-03-09 22:36:33",
			"date_deleted": null,
			"deleted": 0
		}
	]
}

let get_user_vessel_4 = {
	"data":
	[
		{
			"id": 8,
			"user_id": 64,
			"vessel_id": 2,
			"date_created": "2019-02-16 22:44:18",
			"date_deleted": null,
			"deleted": 0
		},
		{
			"id": 9,
			"user_id": 68,
			"vessel_id": 2,
			"date_created": "2019-03-09 22:36:33",
			"date_deleted": null,
			"deleted": 0
		}
	]
}

let create_user_vessel = {
	"data":
	[
		{
			"id": 10,
			"user_id": 68,
			"vessel_id": 3,
			"date_created": "2019-03-10 14:18:53",
			"date_deleted": null,
			"deleted": 0
		}
	]
}

let delete_user_vessel = {
	"data":
	[
		{
			"id": 10,
			"user_id": 68,
			"vessel_id": 3,
			"date_created": "2019-03-10 14:18:53",
			"date_deleted": "2019-03-10 14:19:40",
			"deleted": 1
		}
	]
}

//Vessel Device ----------------------------------------------------------------------------------------------------------------
let get_vessel_device_1 = {
	"data":
	[
		{
			"vessel_device_id": 7,
			"device_id": 2,
			"device_eui": "2222222222222222",
			"vessel_id": 3,
			"vessel_device_deleted": 0,
			"vessel_device_created_at": "2019-02-20 14:16:52",
			"vessel_device_deleted_at": null
		},
		{
			"vessel_device_id": 9,
			"device_id": 4,
			"device_eui": "4444444444444444",
			"vessel_id": 1,
			"vessel_device_deleted": 0,
			"vessel_device_created_at": "2019-03-07 19:53:21",
			"vessel_device_deleted_at": null
		},
		{
			"vessel_device_id": 10,
			"device_id": 5,
			"device_eui": "5555555555555555",
			"vessel_id": 1,
			"vessel_device_deleted": 0,
			"vessel_device_created_at": "2019-03-07 19:54:32",
			"vessel_device_deleted_at": null
		},
		{
			"vessel_device_id": 11,
			"device_id": 6,
			"device_eui": "6666666666666666",
			"vessel_id": 2,
			"vessel_device_deleted": 0,
			"vessel_device_created_at": "2019-03-07 19:59:23",
			"vessel_device_deleted_at": null
		},
		{
			"vessel_device_id": 13,
			"device_id": 8,
			"device_eui": "8888888888888888",
			"vessel_id": 1,
			"vessel_device_deleted": 0,
			"vessel_device_created_at": "2019-03-07 20:02:14",
			"vessel_device_deleted_at": null
		},
		{
			"vessel_device_id": 14,
			"device_id": 9,
			"device_eui": "9999999999999999",
			"vessel_id": 1,
			"vessel_device_deleted": 0,
			"vessel_device_created_at": "2019-03-07 20:03:26",
			"vessel_device_deleted_at": null
		},
		{
			"vessel_device_id": 15,
			"device_id": 10,
			"device_eui": "1000000000000000",
			"vessel_id": 1,
			"vessel_device_deleted": 0,
			"vessel_device_created_at": "2019-03-07 20:04:28",
			"vessel_device_deleted_at": null
		},
		{
			"vessel_device_id": 21,
			"device_id": 14,
			"device_eui": "1111111123332433",
			"vessel_id": 1,
			"vessel_device_deleted": 0,
			"vessel_device_created_at": "2019-03-09 21:34:24",
			"vessel_device_deleted_at": null
		},
		{
			"vessel_device_id": 22,
			"device_id": 3,
			"device_eui": "3333333333333333",
			"vessel_id": 1,
			"vessel_device_deleted": 0,
			"vessel_device_created_at": "2019-03-10 00:02:06",
			"vessel_device_deleted_at": null
		},
		{
			"vessel_device_id": 24,
			"device_id": 1,
			"device_eui": "1111111111111111",
			"vessel_id": 2,
			"vessel_device_deleted": 0,
			"vessel_device_created_at": "2019-03-10 11:28:36",
			"vessel_device_deleted_at": null
		}
	]
}


let get_vessel_device_3 = {
	"data":
	[
		{
			"vessel_device_id": 3,
			"device_id": 1,
			"device_eui": "1111111111111111",
			"vessel_id": 2,
			"vessel_device_deleted": 1,
			"vessel_device_created_at": "2019-02-14 01:45:43",
			"vessel_device_deleted_at": "2019-03-10 11:28:28",
			"device_name": "Device_1"
		},
		{
			"vessel_device_id": 11,
			"device_id": 6,
			"device_eui": "6666666666666666",
			"vessel_id": 2,
			"vessel_device_deleted": 0,
			"vessel_device_created_at": "2019-03-07 19:59:23",
			"vessel_device_deleted_at": null,
			"device_name": "Device_6"
		},
		{
			"vessel_device_id": 23,
			"device_id": 1,
			"device_eui": "1111111111111111",
			"vessel_id": 2,
			"vessel_device_deleted": 1,
			"vessel_device_created_at": "2019-03-10 11:28:28",
			"vessel_device_deleted_at": "2019-03-10 11:28:36",
			"device_name": "Device_1"
		},
		{
			"vessel_device_id": 24,
			"device_id": 1,
			"device_eui": "1111111111111111",
			"vessel_id": 2,
			"vessel_device_deleted": 0,
			"vessel_device_created_at": "2019-03-10 11:28:36",
			"vessel_device_deleted_at": null,
			"device_name": "Device_1"
		}
	]
}

let get_vessel_device_4 = {
	"data":
	[
		{
			"device_id": 8,
			"vessel_id": 1
		}
	]
}

let create_vessel_device = {
	"data":
	[
		{
			"vessel_device_id": 25,
			"device_id": 8,
			"device_eui": "8888888888888888",
			"vessel_id": 2,
			"vessel_device_deleted": 0,
			"vessel_device_created_at": "2019-03-10 14:55:08",
			"vessel_device_deleted_at": null
		}
	]
}

let delete_vessel_device_1 = {
	"data":
	[
		{
			"vessel_device_id": 11,
			"device_id": 6,
			"device_eui": "6666666666666666",
			"vessel_id": 2,
			"vessel_device_deleted": 1,
			"vessel_device_created_at": "2019-03-07 19:59:23",
			"vessel_device_deleted_at": "2019-03-10 14:57:07"
		}
	]
}



//Device Uplink Data Tests ----------------------------------------------------------------------------------------------------------------

create_device_uplink = {
	"data":
	[
		{
			"device_uplink_id": 8764,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-07 22:06:57",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-08T02:06:57Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.8193636",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "10.248639",
			"gateway_altitude": "0",
			"tx_frequency": "0",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.181675220995192",
			"gps_longitude": "-60.7378077507019",
			"gps_altitude": "8.66",
			"temperature": "28.85",
			"humidity": "30",
			"accelerometer": "25.67",
			"sos": 0
		}
	]
}

create_device_uplink_no_rx = {
	"data":
	[
		{
			"device_uplink_id": 8764,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-07 22:06:57",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "NA",
			"gateway_name": "NA",
			"rx_time": "NA",
			"rx_rssi": "NA",
			"rx_lora_snr": "NA",
			"gateway_latitude": "NA",
			"gateway_longitude": "NA",
			"gateway_altitude": "NA",
			"tx_frequency": "0",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.181675220995192",
			"gps_longitude": "-60.7378077507019",
			"gps_altitude": "8.66",
			"temperature": "28.85",
			"humidity": "30",
			"accelerometer": "25.67",
			"sos": 0
		}
	]
}

get_device_uplink_records_1 = {
	"data":
	[
		{
			"device_uplink_id": 6217,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:24",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:24Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.9056601",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "104",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.70900476484511",
			"gps_longitude": "-61.681349873542786",
			"gps_altitude": "8.66",
			"temperature": "27.23",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6218,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:24",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:24Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.82415336",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "105",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.047924558319059",
			"gps_longitude": "-61.79116487503051",
			"gps_altitude": "8.66",
			"temperature": "26.36",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6219,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:25",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:25Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.7929708",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "106",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.167536937705185",
			"gps_longitude": "-60.738071948289864",
			"gps_altitude": "8.66",
			"temperature": "27.14",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6220,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:25",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:25Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.047921006",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "105",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708967867918433",
			"gps_longitude": "-61.68156981468201",
			"gps_altitude": "8.66",
			"temperature": "27.43",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6221,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:25",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:25Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.43533254",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "106",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.047882588252696",
			"gps_longitude": "-61.79009199142455",
			"gps_altitude": "8.66",
			"temperature": "27.24",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6222,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:26",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:26Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.060278777",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "107",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.167496150668805",
			"gps_longitude": "-60.7380585372448",
			"gps_altitude": "8.66",
			"temperature": "27.4",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6223,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:26",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:26Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.19332853",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "106",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708930970987264",
			"gps_longitude": "-61.68175756931305",
			"gps_altitude": "8.66",
			"temperature": "27.88",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6224,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:26",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:26Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.20961356",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "107",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.047567812545807",
			"gps_longitude": "-61.78919076919555",
			"gps_altitude": "8.66",
			"temperature": "27.07",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6225,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:27",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:27Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.546551",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "108",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.167457995048924",
			"gps_longitude": "-60.73804780840874",
			"gps_altitude": "8.66",
			"temperature": "27.67",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6226,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:27",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:27Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.056785334",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "107",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708904616033672",
			"gps_longitude": "-61.68198287487029",
			"gps_altitude": "8.66",
			"temperature": "27.52",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6227,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:27",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:27Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.11170247",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "108",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.047672737822449",
			"gps_longitude": "-61.7882251739502",
			"gps_altitude": "8.66",
			"temperature": "26.79",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6228,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:28",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:28Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.57869744",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "109",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.167429049402925",
			"gps_longitude": "-60.73803573846818",
			"gps_altitude": "8.66",
			"temperature": "26.71",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6229,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:28",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:28Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.27163687",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "108",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708872990086356",
			"gps_longitude": "-61.682170629501336",
			"gps_altitude": "8.66",
			"temperature": "26.97",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6230,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:28",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:28Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.7010878",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "109",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.0471271259361",
			"gps_longitude": "-61.786723136901855",
			"gps_altitude": "8.66",
			"temperature": "26.03",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6231,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:29",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:29Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.43799832",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "110",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.167396156619851",
			"gps_longitude": "-60.73803305625915",
			"gps_altitude": "8.66",
			"temperature": "27.19",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6232,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:29",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:29Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.5110422",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "109",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708857177111444",
			"gps_longitude": "-61.68245494365692",
			"gps_altitude": "8.66",
			"temperature": "27.55",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6233,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:29",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:29Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.624294",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "110",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.046371661493648",
			"gps_longitude": "-61.78479194641113",
			"gps_altitude": "8.66",
			"temperature": "27.21",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6234,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:30",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:30Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.64918554",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "111",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.167371158102235",
			"gps_longitude": "-60.73803305625915",
			"gps_altitude": "8.66",
			"temperature": "27.1",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6235,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:30",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:30Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.55458647",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "110",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708830822151452",
			"gps_longitude": "-61.682626605033875",
			"gps_altitude": "8.66",
			"temperature": "27.88",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6236,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:30",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:30Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.7428059",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "111",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.045951958107095",
			"gps_longitude": "-61.78294658660888",
			"gps_altitude": "8.66",
			"temperature": "26.36",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6237,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:31",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:31Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.7210369",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "112",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.167323792483993",
			"gps_longitude": "-60.738029032945626",
			"gps_altitude": "8.66",
			"temperature": "26.57",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6238,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:31",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:31Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.40641105",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "111",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708830822151452",
			"gps_longitude": "-61.68292164802551",
			"gps_altitude": "8.66",
			"temperature": "27.65",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6239,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:31",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:31Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.22206162",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "112",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.04498663782828",
			"gps_longitude": "-61.78110122680664",
			"gps_altitude": "8.66",
			"temperature": "27.73",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6240,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:32",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:32Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.8208285",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "113",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.167305372519259",
			"gps_longitude": "-60.73803305625915",
			"gps_altitude": "8.66",
			"temperature": "27.89",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6241,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:32",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:32Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.39139032",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "112",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708730673282524",
			"gps_longitude": "-61.68311476707458",
			"gps_altitude": "8.66",
			"temperature": "27.25",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6242,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:32",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:32Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.19977154",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "113",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.044692844011117",
			"gps_longitude": "-61.77938461303711",
			"gps_altitude": "8.66",
			"temperature": "26.4",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6243,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:33",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:33Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.4696884",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "114",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.167279058281892",
			"gps_longitude": "-60.73802635073662",
			"gps_altitude": "8.66",
			"temperature": "26.81",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6244,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:33",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:33Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.9405945",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "113",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708704318311513",
			"gps_longitude": "-61.683366894721985",
			"gps_altitude": "8.66",
			"temperature": "26.54",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6245,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:33",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:33Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.025182795",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "114",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.044524961685555",
			"gps_longitude": "-61.7775821685791",
			"gps_altitude": "8.66",
			"temperature": "27.52",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6246,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:34",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:34Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.27108377",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "115",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.167244849769759",
			"gps_longitude": "-60.73803171515464",
			"gps_altitude": "8.66",
			"temperature": "26.11",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6247,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:34",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:34Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.12230021",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "114",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708588356411848",
			"gps_longitude": "-61.68346345424652",
			"gps_altitude": "8.66",
			"temperature": "26.39",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6248,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:34",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:34Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.6615111",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "115",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.044189196719572",
			"gps_longitude": "-61.776251792907715",
			"gps_altitude": "8.66",
			"temperature": "26.23",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6249,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:35",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:35Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.7641983",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "116",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.167208009829093",
			"gps_longitude": "-60.73803573846818",
			"gps_altitude": "8.66",
			"temperature": "26.69",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6250,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:35",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:35Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.6432875",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "115",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708493478460907",
			"gps_longitude": "-61.68373167514801",
			"gps_altitude": "8.66",
			"temperature": "27.44",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6251,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:35",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:35Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.30769262",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "116",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.043853431333755",
			"gps_longitude": "-61.7750072479248",
			"gps_altitude": "8.66",
			"temperature": "26.92",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6252,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:36",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:36Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.9181996",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "117",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.167177748445773",
			"gps_longitude": "-60.73803976178169",
			"gps_altitude": "8.66",
			"temperature": "26.08",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6253,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:36",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:36Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.96221864",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "116",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708446039474305",
			"gps_longitude": "-61.683892607688904",
			"gps_altitude": "8.66",
			"temperature": "26.14",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6254,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:36",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:36Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.35682666",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "117",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.04347569477291",
			"gps_longitude": "-61.77294731140137",
			"gps_altitude": "8.66",
			"temperature": "27.5",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6255,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:37",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:37Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.6703475",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "118",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.167143539921694",
			"gps_longitude": "-60.73804780840874",
			"gps_altitude": "8.66",
			"temperature": "26.48",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6256,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:37",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:37Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.31849927",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "117",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708351161478824",
			"gps_longitude": "-61.68404817581177",
			"gps_altitude": "8.66",
			"temperature": "27.69",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6257,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:37",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:37Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.90545654",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "118",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.043265840898416",
			"gps_longitude": "-61.7711877822876",
			"gps_altitude": "8.66",
			"temperature": "27.67",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6258,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:38",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:38Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.86374706",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "119",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.167113278531646",
			"gps_longitude": "-60.73805585503579",
			"gps_altitude": "8.66",
			"temperature": "26.52",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6259,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:38",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:38Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.41815507",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "118",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708208844429873",
			"gps_longitude": "-61.68421447277069",
			"gps_altitude": "8.66",
			"temperature": "26.63",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6260,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:38",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:38Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.5567535",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "119",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.042510365592486",
			"gps_longitude": "-61.76895618438721",
			"gps_altitude": "8.66",
			"temperature": "26.68",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6261,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:39",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:39Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.7617462",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "120",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.167084332851257",
			"gps_longitude": "-60.738071948289864",
			"gps_altitude": "8.66",
			"temperature": "27.76",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6262,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:39",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:39Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.7483574",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "119",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708066527314092",
			"gps_longitude": "-61.684391498565674",
			"gps_altitude": "8.66",
			"temperature": "27.02",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6263,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:39",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:39Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.8018457",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "120",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.043055986859944",
			"gps_longitude": "-61.76693916320801",
			"gps_altitude": "8.66",
			"temperature": "26.56",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6264,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:40",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:40Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.55444765",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "121",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.167054071455025",
			"gps_longitude": "-60.73807865381241",
			"gps_altitude": "8.66",
			"temperature": "27.57",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6265,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:40",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:40Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.8816611",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "120",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.707897855090282",
			"gps_longitude": "-61.684568524360664",
			"gps_altitude": "8.66",
			"temperature": "26.28",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6266,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:40",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:40Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.71589833",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "121",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.042720220057305",
			"gps_longitude": "-61.76535129547119",
			"gps_altitude": "8.66",
			"temperature": "26.72",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6267,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:41",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:41Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.08058479",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "122",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.167019862916378",
			"gps_longitude": "-60.73808670043945",
			"gps_altitude": "8.66",
			"temperature": "26.93",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6268,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:41",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:41Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.48911777",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "121",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.707792434902743",
			"gps_longitude": "-61.684665083885186",
			"gps_altitude": "8.66",
			"temperature": "26.9",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6269,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:41",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:41Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.5943645",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "122",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.042678249177458",
			"gps_longitude": "-61.76436424255371",
			"gps_altitude": "8.66",
			"temperature": "27.48",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6270,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:42",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:42Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.8372305",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "123",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.166985654373686",
			"gps_longitude": "-60.73808804154396",
			"gps_altitude": "8.66",
			"temperature": "26.98",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6271,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:42",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:42Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.94497746",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "122",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.707697556702573",
			"gps_longitude": "-61.6848474740982",
			"gps_altitude": "8.66",
			"temperature": "26.61",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6272,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:42",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:42Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.5798604",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "123",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.04263627829106",
			"gps_longitude": "-61.762990951538086",
			"gps_altitude": "8.66",
			"temperature": "26.5",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6273,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:43",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:43Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.7263248",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "124",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.166958024393951",
			"gps_longitude": "-60.73809742927551",
			"gps_altitude": "8.66",
			"temperature": "27.5",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6274,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:43",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:43Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.15473041",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "123",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.707571052389495",
			"gps_longitude": "-61.684949398040764",
			"gps_altitude": "8.66",
			"temperature": "26.7",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6275,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:43",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:43Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.32078078",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "124",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.042594307398083",
			"gps_longitude": "-61.762003898620605",
			"gps_altitude": "8.66",
			"temperature": "26.66",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6276,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:44",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:44Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.2478397",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "125",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.166926447271036",
			"gps_longitude": "-60.73810547590256",
			"gps_altitude": "8.66",
			"temperature": "27.33",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6277,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:44",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:44Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.32400241",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "124",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.707571052389495",
			"gps_longitude": "-61.684949398040764",
			"gps_altitude": "8.66",
			"temperature": "26.38",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6278,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:44",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:44Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.5034339",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "125",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.04263627829106",
			"gps_longitude": "-61.76063060760498",
			"gps_altitude": "8.66",
			"temperature": "26.07",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6279,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:45",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:45Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.90508276",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "126",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.166904080140235",
			"gps_longitude": "-60.73811888694763",
			"gps_altitude": "8.66",
			"temperature": "26.77",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6280,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:45",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:45Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.48373556",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "125",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.707365482768084",
			"gps_longitude": "-61.685185432434075",
			"gps_altitude": "8.66",
			"temperature": "26.96",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6281,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:45",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:45Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.66865355",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "126",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.04263627829106",
			"gps_longitude": "-61.758956909179695",
			"gps_altitude": "8.66",
			"temperature": "27.88",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6282,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:46",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:46Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.9014525",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "127",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.166868555870108",
			"gps_longitude": "-60.7381322979927",
			"gps_altitude": "8.66",
			"temperature": "26.38",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6283,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:46",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:46Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.6403587",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "126",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.707244249336227",
			"gps_longitude": "-61.68539464473725",
			"gps_altitude": "8.66",
			"temperature": "27.12",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6284,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:46",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:46Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.15043928",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "127",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.043139928495012",
			"gps_longitude": "-61.757626533508294",
			"gps_altitude": "8.66",
			"temperature": "27.75",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6285,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:47",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:47Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.9691769",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "128",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.16682776873979",
			"gps_longitude": "-60.738143026828766",
			"gps_altitude": "8.66",
			"temperature": "26.59",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6286,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:47",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:47Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.16844209",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "127",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.707159913007198",
			"gps_longitude": "-61.68552875518798",
			"gps_altitude": "8.66",
			"temperature": "27.14",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6287,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:47",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:47Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.73141456",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "128",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.043433724011125",
			"gps_longitude": "-61.756510734558105",
			"gps_altitude": "8.66",
			"temperature": "27.26",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6288,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:48",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:48Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.91868645",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "129",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.166793560174463",
			"gps_longitude": "-60.73814034461975",
			"gps_altitude": "8.66",
			"temperature": "27.95",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6289,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:48",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:48Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.10118814",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "128",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.70703340846965",
			"gps_longitude": "-61.685673594474785",
			"gps_altitude": "8.66",
			"temperature": "27.46",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6290,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:48",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:48Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.96780133",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "129",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.044441020483413",
			"gps_longitude": "-61.75522327423095",
			"gps_altitude": "8.66",
			"temperature": "27.59",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6291,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:49",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:49Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.042229697",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "130",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.16675145731928",
			"gps_longitude": "-60.73814436793327",
			"gps_altitude": "8.66",
			"temperature": "26.96",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6292,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:49",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:49Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.6835573",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "130",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.04498663782828",
			"gps_longitude": "-61.754493713378906",
			"gps_altitude": "8.66",
			"temperature": "27.33",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6293,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:49",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:49Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.01769646",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "129",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.70692271695598",
			"gps_longitude": "-61.685861349105835",
			"gps_altitude": "8.66",
			"temperature": "26.87",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6294,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:50",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:50Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.3837178",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "131",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.16671198588702",
			"gps_longitude": "-60.7381510734558",
			"gps_altitude": "8.66",
			"temperature": "27.69",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6295,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:50",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:50Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.21828915",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "130",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.706806754374467",
			"gps_longitude": "-61.68602764606476",
			"gps_altitude": "8.66",
			"temperature": "27.26",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6296,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:50",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:50Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.662539",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "131",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.045658165346143",
			"gps_longitude": "-61.753506660461426",
			"gps_altitude": "8.66",
			"temperature": "26.19",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6297,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:51",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:51Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.23526907",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "132",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.166675145878736",
			"gps_longitude": "-60.738143026828766",
			"gps_altitude": "8.66",
			"temperature": "26.15",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6298,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:51",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:51Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.5669698",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "131",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.706674978659803",
			"gps_longitude": "-61.6861617565155",
			"gps_altitude": "8.66",
			"temperature": "26.61",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6299,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:51",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:51Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.9677087",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "132",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.046581512940897",
			"gps_longitude": "-61.752605438232415",
			"gps_altitude": "8.66",
			"temperature": "27.75",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6300,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:52",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:52Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.042380244",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "133",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.166647515869446",
			"gps_longitude": "-60.738143026828766",
			"gps_altitude": "8.66",
			"temperature": "26.66",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6301,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:52",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:52Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.7625185",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "132",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.706569558046821",
			"gps_longitude": "-61.686349511146545",
			"gps_altitude": "8.66",
			"temperature": "27.75",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6302,
			"device_id": 2,
			"sub_network_id": "156",
			"vessel_id": 3,
			"time_stamp": "2019-03-06 02:22:52",
			"sub_network_name": "Marine_IoT",
			"device_eui": "2222222222222222",
			"device_name": "Device_2",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:52Z",
			"rx_rssi": "3",
			"rx_lora_snr": "0.83304393",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "133",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "12.047462887228148",
			"gps_longitude": "-61.7518329620361",
			"gps_altitude": "8.66",
			"temperature": "26.39",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6303,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:53",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:53Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.6995437",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "134",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.166610675852956",
			"gps_longitude": "-60.738143026828766",
			"gps_altitude": "8.66",
			"temperature": "26.79",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6304,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:54",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:53Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.5272791",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "133",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.706432511195093",
			"gps_longitude": "-61.68648362159729",
			"gps_altitude": "8.66",
			"temperature": "27.23",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6305,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:54",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:54Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.33886814",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "135",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.166576467262047",
			"gps_longitude": "-60.73816180229187",
			"gps_altitude": "8.66",
			"temperature": "27.09",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6306,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:55",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:54Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.774318",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "134",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.706290193245026",
			"gps_longitude": "-61.68653190135956",
			"gps_altitude": "8.66",
			"temperature": "27.25",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6307,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:55",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:55Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.34464067",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "136",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.166538311521265",
			"gps_longitude": "-60.73817387223243",
			"gps_altitude": "8.66",
			"temperature": "26.37",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6308,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:55",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:55Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.111758344",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "135",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.706205856650472",
			"gps_longitude": "-61.686682105064385",
			"gps_altitude": "8.66",
			"temperature": "27.24",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6309,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:56",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:56Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.34091702",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "137",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.166514628645157",
			"gps_longitude": "-60.73819532990455",
			"gps_altitude": "8.66",
			"temperature": "27.53",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6310,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:56",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:56Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.38057792",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "136",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.706100435874301",
			"gps_longitude": "-61.68681085109711",
			"gps_altitude": "8.66",
			"temperature": "27.41",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6311,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:57",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:57Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.94112974",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "138",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.1664896300516",
			"gps_longitude": "-60.73821544647216",
			"gps_altitude": "8.66",
			"temperature": "26.08",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6312,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:57",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:57Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.5683842",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "137",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.705973930894464",
			"gps_longitude": "-61.686971783638",
			"gps_altitude": "8.66",
			"temperature": "27.07",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6313,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:58",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:58Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.16519852",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "139",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.166473841465105",
			"gps_longitude": "-60.738243609666824",
			"gps_altitude": "8.66",
			"temperature": "27.96",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6314,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:58",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:58Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.7198762",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "138",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.705852696905897",
			"gps_longitude": "-61.68707907199859",
			"gps_altitude": "8.66",
			"temperature": "27.82",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6315,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:59",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:59Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.16366926",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "140",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.166447527152348",
			"gps_longitude": "-60.73827713727952",
			"gps_altitude": "8.66",
			"temperature": "27.72",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6316,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:59",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:59Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.51318324",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "139",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.705726191822654",
			"gps_longitude": "-61.68722391128539",
			"gps_altitude": "8.66",
			"temperature": "27.47",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		}
	]
}

let get_device_uplink_records_2 = {
	"data":
	[
		{
			"device_uplink_id": 6315,
			"device_id": 3,
			"sub_network_id": "156",
			"vessel_id": 4,
			"time_stamp": "2019-03-06 02:22:59",
			"sub_network_name": "Marine_IoT",
			"device_eui": "3333333333333333",
			"device_name": "Device_3",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:59Z",
			"rx_rssi": "2",
			"rx_lora_snr": "0.16366926",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "140",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "11.166447527152348",
			"gps_longitude": "-60.73827713727952",
			"gps_altitude": "8.66",
			"temperature": "27.72",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0,
			"vessel_name": "Paria",
			"time_stamp": "2019-03-06 02:22:59"
		}
	]
}

let get_device_uplink_records_3 = {
	"data":
	[
		{
			"device_uplink_id": 8820,
			"sub_network_id": "156",
			"vessel_id": 2,
			"vessel_name": "Time Chaser",
			"device_id": 1,
			"device_name": "Device_1",
			"gps_latitude": "10.717332813294362",
			"gps_longitude": "-61.6675740480423",
			"gps_altitude": "8.66",
			"temperature": "26.58",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0,
			"time_stamp": "2019-03-09 22:41:08"
		}
	]
}

let get_device_uplink_records_4 = {
	"data":
	[
		{
			"gps_latitude": "10.70900476484511",
			"gps_longitude": "-61.681349873542786"
		},
		{
			"gps_latitude": "12.047924558319059",
			"gps_longitude": "-61.79116487503051"
		},
		{
			"gps_latitude": "11.167536937705185",
			"gps_longitude": "-60.738071948289864"
		},
		{
			"gps_latitude": "10.708967867918433",
			"gps_longitude": "-61.68156981468201"
		},
		{
			"gps_latitude": "12.047882588252696",
			"gps_longitude": "-61.79009199142455"
		},
		{
			"gps_latitude": "11.167496150668805",
			"gps_longitude": "-60.7380585372448"
		},
		{
			"gps_latitude": "10.708930970987264",
			"gps_longitude": "-61.68175756931305"
		},
		{
			"gps_latitude": "12.047567812545807",
			"gps_longitude": "-61.78919076919555"
		},
		{
			"gps_latitude": "11.167457995048924",
			"gps_longitude": "-60.73804780840874"
		},
		{
			"gps_latitude": "10.708904616033672",
			"gps_longitude": "-61.68198287487029"
		},
		{
			"gps_latitude": "12.047672737822449",
			"gps_longitude": "-61.7882251739502"
		},
		{
			"gps_latitude": "11.167429049402925",
			"gps_longitude": "-60.73803573846818"
		},
		{
			"gps_latitude": "10.708872990086356",
			"gps_longitude": "-61.682170629501336"
		},
		{
			"gps_latitude": "12.0471271259361",
			"gps_longitude": "-61.786723136901855"
		},
		{
			"gps_latitude": "11.167396156619851",
			"gps_longitude": "-60.73803305625915"
		},
		{
			"gps_latitude": "10.708857177111444",
			"gps_longitude": "-61.68245494365692"
		},
		{
			"gps_latitude": "12.046371661493648",
			"gps_longitude": "-61.78479194641113"
		},
		{
			"gps_latitude": "11.167371158102235",
			"gps_longitude": "-60.73803305625915"
		},
		{
			"gps_latitude": "10.708830822151452",
			"gps_longitude": "-61.682626605033875"
		},
		{
			"gps_latitude": "12.045951958107095",
			"gps_longitude": "-61.78294658660888"
		},
		{
			"gps_latitude": "11.167323792483993",
			"gps_longitude": "-60.738029032945626"
		},
		{
			"gps_latitude": "10.708830822151452",
			"gps_longitude": "-61.68292164802551"
		},
		{
			"gps_latitude": "12.04498663782828",
			"gps_longitude": "-61.78110122680664"
		},
		{
			"gps_latitude": "11.167305372519259",
			"gps_longitude": "-60.73803305625915"
		},
		{
			"gps_latitude": "10.708730673282524",
			"gps_longitude": "-61.68311476707458"
		},
		{
			"gps_latitude": "12.044692844011117",
			"gps_longitude": "-61.77938461303711"
		},
		{
			"gps_latitude": "11.167279058281892",
			"gps_longitude": "-60.73802635073662"
		},
		{
			"gps_latitude": "10.708704318311513",
			"gps_longitude": "-61.683366894721985"
		},
		{
			"gps_latitude": "12.044524961685555",
			"gps_longitude": "-61.7775821685791"
		},
		{
			"gps_latitude": "11.167244849769759",
			"gps_longitude": "-60.73803171515464"
		},
		{
			"gps_latitude": "10.708588356411848",
			"gps_longitude": "-61.68346345424652"
		},
		{
			"gps_latitude": "12.044189196719572",
			"gps_longitude": "-61.776251792907715"
		},
		{
			"gps_latitude": "11.167208009829093",
			"gps_longitude": "-60.73803573846818"
		},
		{
			"gps_latitude": "10.708493478460907",
			"gps_longitude": "-61.68373167514801"
		},
		{
			"gps_latitude": "12.043853431333755",
			"gps_longitude": "-61.7750072479248"
		},
		{
			"gps_latitude": "11.167177748445773",
			"gps_longitude": "-60.73803976178169"
		},
		{
			"gps_latitude": "10.708446039474305",
			"gps_longitude": "-61.683892607688904"
		},
		{
			"gps_latitude": "12.04347569477291",
			"gps_longitude": "-61.77294731140137"
		},
		{
			"gps_latitude": "11.167143539921694",
			"gps_longitude": "-60.73804780840874"
		},
		{
			"gps_latitude": "10.708351161478824",
			"gps_longitude": "-61.68404817581177"
		},
		{
			"gps_latitude": "12.043265840898416",
			"gps_longitude": "-61.7711877822876"
		},
		{
			"gps_latitude": "11.167113278531646",
			"gps_longitude": "-60.73805585503579"
		},
		{
			"gps_latitude": "10.708208844429873",
			"gps_longitude": "-61.68421447277069"
		},
		{
			"gps_latitude": "12.042510365592486",
			"gps_longitude": "-61.76895618438721"
		},
		{
			"gps_latitude": "11.167084332851257",
			"gps_longitude": "-60.738071948289864"
		},
		{
			"gps_latitude": "10.708066527314092",
			"gps_longitude": "-61.684391498565674"
		},
		{
			"gps_latitude": "12.043055986859944",
			"gps_longitude": "-61.76693916320801"
		},
		{
			"gps_latitude": "11.167054071455025",
			"gps_longitude": "-60.73807865381241"
		},
		{
			"gps_latitude": "10.707897855090282",
			"gps_longitude": "-61.684568524360664"
		},
		{
			"gps_latitude": "12.042720220057305",
			"gps_longitude": "-61.76535129547119"
		},
		{
			"gps_latitude": "11.167019862916378",
			"gps_longitude": "-60.73808670043945"
		},
		{
			"gps_latitude": "10.707792434902743",
			"gps_longitude": "-61.684665083885186"
		},
		{
			"gps_latitude": "12.042678249177458",
			"gps_longitude": "-61.76436424255371"
		},
		{
			"gps_latitude": "11.166985654373686",
			"gps_longitude": "-60.73808804154396"
		},
		{
			"gps_latitude": "10.707697556702573",
			"gps_longitude": "-61.6848474740982"
		},
		{
			"gps_latitude": "12.04263627829106",
			"gps_longitude": "-61.762990951538086"
		},
		{
			"gps_latitude": "11.166958024393951",
			"gps_longitude": "-60.73809742927551"
		},
		{
			"gps_latitude": "10.707571052389495",
			"gps_longitude": "-61.684949398040764"
		},
		{
			"gps_latitude": "12.042594307398083",
			"gps_longitude": "-61.762003898620605"
		},
		{
			"gps_latitude": "11.166926447271036",
			"gps_longitude": "-60.73810547590256"
		},
		{
			"gps_latitude": "10.707571052389495",
			"gps_longitude": "-61.684949398040764"
		},
		{
			"gps_latitude": "12.04263627829106",
			"gps_longitude": "-61.76063060760498"
		},
		{
			"gps_latitude": "11.166904080140235",
			"gps_longitude": "-60.73811888694763"
		},
		{
			"gps_latitude": "10.707365482768084",
			"gps_longitude": "-61.685185432434075"
		},
		{
			"gps_latitude": "12.04263627829106",
			"gps_longitude": "-61.758956909179695"
		},
		{
			"gps_latitude": "11.166868555870108",
			"gps_longitude": "-60.7381322979927"
		},
		{
			"gps_latitude": "10.707244249336227",
			"gps_longitude": "-61.68539464473725"
		},
		{
			"gps_latitude": "12.043139928495012",
			"gps_longitude": "-61.757626533508294"
		},
		{
			"gps_latitude": "11.16682776873979",
			"gps_longitude": "-60.738143026828766"
		},
		{
			"gps_latitude": "10.707159913007198",
			"gps_longitude": "-61.68552875518798"
		},
		{
			"gps_latitude": "12.043433724011125",
			"gps_longitude": "-61.756510734558105"
		},
		{
			"gps_latitude": "11.166793560174463",
			"gps_longitude": "-60.73814034461975"
		},
		{
			"gps_latitude": "10.70703340846965",
			"gps_longitude": "-61.685673594474785"
		},
		{
			"gps_latitude": "12.044441020483413",
			"gps_longitude": "-61.75522327423095"
		},
		{
			"gps_latitude": "11.16675145731928",
			"gps_longitude": "-60.73814436793327"
		},
		{
			"gps_latitude": "12.04498663782828",
			"gps_longitude": "-61.754493713378906"
		},
		{
			"gps_latitude": "10.70692271695598",
			"gps_longitude": "-61.685861349105835"
		},
		{
			"gps_latitude": "11.16671198588702",
			"gps_longitude": "-60.7381510734558"
		},
		{
			"gps_latitude": "10.706806754374467",
			"gps_longitude": "-61.68602764606476"
		},
		{
			"gps_latitude": "12.045658165346143",
			"gps_longitude": "-61.753506660461426"
		},
		{
			"gps_latitude": "11.166675145878736",
			"gps_longitude": "-60.738143026828766"
		},
		{
			"gps_latitude": "10.706674978659803",
			"gps_longitude": "-61.6861617565155"
		},
		{
			"gps_latitude": "12.046581512940897",
			"gps_longitude": "-61.752605438232415"
		},
		{
			"gps_latitude": "11.166647515869446",
			"gps_longitude": "-60.738143026828766"
		},
		{
			"gps_latitude": "10.706569558046821",
			"gps_longitude": "-61.686349511146545"
		},
		{
			"gps_latitude": "12.047462887228148",
			"gps_longitude": "-61.7518329620361"
		},
		{
			"gps_latitude": "11.166610675852956",
			"gps_longitude": "-60.738143026828766"
		},
		{
			"gps_latitude": "10.706432511195093",
			"gps_longitude": "-61.68648362159729"
		},
		{
			"gps_latitude": "11.166576467262047",
			"gps_longitude": "-60.73816180229187"
		},
		{
			"gps_latitude": "10.706290193245026",
			"gps_longitude": "-61.68653190135956"
		},
		{
			"gps_latitude": "11.166538311521265",
			"gps_longitude": "-60.73817387223243"
		},
		{
			"gps_latitude": "10.706205856650472",
			"gps_longitude": "-61.686682105064385"
		},
		{
			"gps_latitude": "11.166514628645157",
			"gps_longitude": "-60.73819532990455"
		},
		{
			"gps_latitude": "10.706100435874301",
			"gps_longitude": "-61.68681085109711"
		},
		{
			"gps_latitude": "11.1664896300516",
			"gps_longitude": "-60.73821544647216"
		},
		{
			"gps_latitude": "10.705973930894464",
			"gps_longitude": "-61.686971783638"
		},
		{
			"gps_latitude": "11.166473841465105",
			"gps_longitude": "-60.738243609666824"
		},
		{
			"gps_latitude": "10.705852696905897",
			"gps_longitude": "-61.68707907199859"
		},
		{
			"gps_latitude": "11.166447527152348",
			"gps_longitude": "-60.73827713727952"
		},
		{
			"gps_latitude": "10.705726191822654",
			"gps_longitude": "-61.68722391128539"
		},
		{
			"gps_latitude": "10.715936036343724",
			"gps_longitude": "-61.666860580444336"
		},
		{
			"gps_latitude": "10.716905874608388",
			"gps_longitude": "-61.667375564575195"
		},
		{
			"gps_latitude": "10.717201042159227",
			"gps_longitude": "-61.66748821735382"
		},
		{
			"gps_latitude": "10.717332813294362",
			"gps_longitude": "-61.6675740480423"
		}
	]
}

let get_device_uplink_records_5 = {
	"data":
	[
		{
			"sub_network_id": "156",
			"sub_network_name": "Marine_IoT",
			"network_id": "342",
			"network_name": "CIRP",
			"time_stamp": "2019-03-06 02:22:48",
			"gps_latitude": "10.70703340846965",
			"gps_longitude": "-61.685673594474785",
			"temperature": "27.46",
			"humidity": "25",
			"accelerometer": "30"
		},
		{
			"sub_network_id": "156",
			"sub_network_name": "Marine_IoT",
			"network_id": "342",
			"network_name": "CIRP",
			"time_stamp": "2019-03-06 02:22:47",
			"gps_latitude": "10.707159913007198",
			"gps_longitude": "-61.68552875518798",
			"temperature": "27.14",
			"humidity": "25",
			"accelerometer": "30"
		},
		{
			"sub_network_id": "156",
			"sub_network_name": "Marine_IoT",
			"network_id": "342",
			"network_name": "CIRP",
			"time_stamp": "2019-03-06 02:22:46",
			"gps_latitude": "10.707244249336227",
			"gps_longitude": "-61.68539464473725",
			"temperature": "27.12",
			"humidity": "25",
			"accelerometer": "30"
		},
		{
			"sub_network_id": "156",
			"sub_network_name": "Marine_IoT",
			"network_id": "342",
			"network_name": "CIRP",
			"time_stamp": "2019-03-06 02:22:45",
			"gps_latitude": "10.707365482768084",
			"gps_longitude": "-61.685185432434075",
			"temperature": "26.96",
			"humidity": "25",
			"accelerometer": "30"
		},
		{
			"sub_network_id": "156",
			"sub_network_name": "Marine_IoT",
			"network_id": "342",
			"network_name": "CIRP",
			"time_stamp": "2019-03-06 02:22:44",
			"gps_latitude": "10.707571052389495",
			"gps_longitude": "-61.684949398040764",
			"temperature": "26.38",
			"humidity": "25",
			"accelerometer": "30"
		},
		{
			"sub_network_id": "156",
			"sub_network_name": "Marine_IoT",
			"network_id": "342",
			"network_name": "CIRP",
			"time_stamp": "2019-03-06 02:22:43",
			"gps_latitude": "10.707571052389495",
			"gps_longitude": "-61.684949398040764",
			"temperature": "26.7",
			"humidity": "25",
			"accelerometer": "30"
		},
		{
			"sub_network_id": "156",
			"sub_network_name": "Marine_IoT",
			"network_id": "342",
			"network_name": "CIRP",
			"time_stamp": "2019-03-06 02:22:42",
			"gps_latitude": "10.707697556702573",
			"gps_longitude": "-61.6848474740982",
			"temperature": "26.61",
			"humidity": "25",
			"accelerometer": "30"
		},
		{
			"sub_network_id": "156",
			"sub_network_name": "Marine_IoT",
			"network_id": "342",
			"network_name": "CIRP",
			"time_stamp": "2019-03-06 02:22:41",
			"gps_latitude": "10.707792434902743",
			"gps_longitude": "-61.684665083885186",
			"temperature": "26.9",
			"humidity": "25",
			"accelerometer": "30"
		},
		{
			"sub_network_id": "156",
			"sub_network_name": "Marine_IoT",
			"network_id": "342",
			"network_name": "CIRP",
			"time_stamp": "2019-03-06 02:22:40",
			"gps_latitude": "10.707897855090282",
			"gps_longitude": "-61.684568524360664",
			"temperature": "26.28",
			"humidity": "25",
			"accelerometer": "30"
		},
		{
			"sub_network_id": "156",
			"sub_network_name": "Marine_IoT",
			"network_id": "342",
			"network_name": "CIRP",
			"time_stamp": "2019-03-06 02:22:39",
			"gps_latitude": "10.708066527314092",
			"gps_longitude": "-61.684391498565674",
			"temperature": "27.02",
			"humidity": "25",
			"accelerometer": "30"
		},
		{
			"sub_network_id": "156",
			"sub_network_name": "Marine_IoT",
			"network_id": "342",
			"network_name": "CIRP",
			"time_stamp": "2019-03-06 02:22:38",
			"gps_latitude": "10.708208844429873",
			"gps_longitude": "-61.68421447277069",
			"temperature": "26.63",
			"humidity": "25",
			"accelerometer": "30"
		},
		{
			"sub_network_id": "156",
			"sub_network_name": "Marine_IoT",
			"network_id": "342",
			"network_name": "CIRP",
			"time_stamp": "2019-03-06 02:22:37",
			"gps_latitude": "10.708351161478824",
			"gps_longitude": "-61.68404817581177",
			"temperature": "27.69",
			"humidity": "25",
			"accelerometer": "30"
		},
		{
			"sub_network_id": "156",
			"sub_network_name": "Marine_IoT",
			"network_id": "342",
			"network_name": "CIRP",
			"time_stamp": "2019-03-06 02:22:36",
			"gps_latitude": "10.708446039474305",
			"gps_longitude": "-61.683892607688904",
			"temperature": "26.14",
			"humidity": "25",
			"accelerometer": "30"
		},
		{
			"sub_network_id": "156",
			"sub_network_name": "Marine_IoT",
			"network_id": "342",
			"network_name": "CIRP",
			"time_stamp": "2019-03-06 02:22:35",
			"gps_latitude": "10.708493478460907",
			"gps_longitude": "-61.68373167514801",
			"temperature": "27.44",
			"humidity": "25",
			"accelerometer": "30"
		}
	]
}

let get_device_uplink_records_6 = {
	"data":
	[
		{
			"device_uplink_id": 8820,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-09 22:41:08",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-10T02:41:08Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.26204807",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "3",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.717332813294362",
			"gps_longitude": "-61.6675740480423",
			"gps_altitude": "8.66",
			"temperature": "26.58",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 8819,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-09 22:41:07",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-10T02:41:07Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.94296014",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "2",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.717201042159227",
			"gps_longitude": "-61.66748821735382",
			"gps_altitude": "8.66",
			"temperature": "27.32",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 8818,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-09 22:41:06",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-10T02:41:06Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.9998655",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "1",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.716905874608388",
			"gps_longitude": "-61.667375564575195",
			"gps_altitude": "8.66",
			"temperature": "27.78",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 8817,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-09 22:41:05",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-10T02:41:05Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.41511762",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "0",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.715936036343724",
			"gps_longitude": "-61.666860580444336",
			"gps_altitude": "8.66",
			"temperature": "27.72",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6316,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:59",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:59Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.51318324",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "139",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.705726191822654",
			"gps_longitude": "-61.68722391128539",
			"gps_altitude": "8.66",
			"temperature": "27.47",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6314,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:58",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:58Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.7198762",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "138",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.705852696905897",
			"gps_longitude": "-61.68707907199859",
			"gps_altitude": "8.66",
			"temperature": "27.82",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6312,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:57",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:57Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.5683842",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "137",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.705973930894464",
			"gps_longitude": "-61.686971783638",
			"gps_altitude": "8.66",
			"temperature": "27.07",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6310,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:56",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:56Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.38057792",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "136",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.706100435874301",
			"gps_longitude": "-61.68681085109711",
			"gps_altitude": "8.66",
			"temperature": "27.41",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6306,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:55",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:54Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.774318",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "134",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.706290193245026",
			"gps_longitude": "-61.68653190135956",
			"gps_altitude": "8.66",
			"temperature": "27.25",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6308,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:55",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:55Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.111758344",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "135",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.706205856650472",
			"gps_longitude": "-61.686682105064385",
			"gps_altitude": "8.66",
			"temperature": "27.24",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6304,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:54",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:53Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.5272791",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "133",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.706432511195093",
			"gps_longitude": "-61.68648362159729",
			"gps_altitude": "8.66",
			"temperature": "27.23",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6301,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:52",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:52Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.7625185",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "132",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.706569558046821",
			"gps_longitude": "-61.686349511146545",
			"gps_altitude": "8.66",
			"temperature": "27.75",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6298,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:51",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:51Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.5669698",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "131",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.706674978659803",
			"gps_longitude": "-61.6861617565155",
			"gps_altitude": "8.66",
			"temperature": "26.61",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6295,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:50",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:50Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.21828915",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "130",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.706806754374467",
			"gps_longitude": "-61.68602764606476",
			"gps_altitude": "8.66",
			"temperature": "27.26",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6293,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:49",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:49Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.01769646",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "129",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.70692271695598",
			"gps_longitude": "-61.685861349105835",
			"gps_altitude": "8.66",
			"temperature": "26.87",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6289,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:48",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:48Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.10118814",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "128",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.70703340846965",
			"gps_longitude": "-61.685673594474785",
			"gps_altitude": "8.66",
			"temperature": "27.46",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6286,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:47",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:47Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.16844209",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "127",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.707159913007198",
			"gps_longitude": "-61.68552875518798",
			"gps_altitude": "8.66",
			"temperature": "27.14",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6283,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:46",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:46Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.6403587",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "126",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.707244249336227",
			"gps_longitude": "-61.68539464473725",
			"gps_altitude": "8.66",
			"temperature": "27.12",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6280,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:45",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:45Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.48373556",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "125",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.707365482768084",
			"gps_longitude": "-61.685185432434075",
			"gps_altitude": "8.66",
			"temperature": "26.96",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6277,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:44",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:44Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.32400241",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "124",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.707571052389495",
			"gps_longitude": "-61.684949398040764",
			"gps_altitude": "8.66",
			"temperature": "26.38",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6274,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:43",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:43Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.15473041",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "123",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.707571052389495",
			"gps_longitude": "-61.684949398040764",
			"gps_altitude": "8.66",
			"temperature": "26.7",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6271,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:42",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:42Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.94497746",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "122",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.707697556702573",
			"gps_longitude": "-61.6848474740982",
			"gps_altitude": "8.66",
			"temperature": "26.61",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6268,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:41",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:41Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.48911777",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "121",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.707792434902743",
			"gps_longitude": "-61.684665083885186",
			"gps_altitude": "8.66",
			"temperature": "26.9",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6265,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:40",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:40Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.8816611",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "120",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.707897855090282",
			"gps_longitude": "-61.684568524360664",
			"gps_altitude": "8.66",
			"temperature": "26.28",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6262,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:39",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:39Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.7483574",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "119",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708066527314092",
			"gps_longitude": "-61.684391498565674",
			"gps_altitude": "8.66",
			"temperature": "27.02",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6259,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:38",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:38Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.41815507",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "118",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708208844429873",
			"gps_longitude": "-61.68421447277069",
			"gps_altitude": "8.66",
			"temperature": "26.63",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6256,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:37",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:37Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.31849927",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "117",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708351161478824",
			"gps_longitude": "-61.68404817581177",
			"gps_altitude": "8.66",
			"temperature": "27.69",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6253,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:36",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:36Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.96221864",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "116",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708446039474305",
			"gps_longitude": "-61.683892607688904",
			"gps_altitude": "8.66",
			"temperature": "26.14",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6250,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:35",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:35Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.6432875",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "115",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708493478460907",
			"gps_longitude": "-61.68373167514801",
			"gps_altitude": "8.66",
			"temperature": "27.44",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6247,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:34",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:34Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.12230021",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "114",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708588356411848",
			"gps_longitude": "-61.68346345424652",
			"gps_altitude": "8.66",
			"temperature": "26.39",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6244,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:33",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:33Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.9405945",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "113",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708704318311513",
			"gps_longitude": "-61.683366894721985",
			"gps_altitude": "8.66",
			"temperature": "26.54",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6241,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:32",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:32Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.39139032",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "112",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708730673282524",
			"gps_longitude": "-61.68311476707458",
			"gps_altitude": "8.66",
			"temperature": "27.25",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6238,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:31",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:31Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.40641105",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "111",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708830822151452",
			"gps_longitude": "-61.68292164802551",
			"gps_altitude": "8.66",
			"temperature": "27.65",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6235,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:30",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:30Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.55458647",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "110",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708830822151452",
			"gps_longitude": "-61.682626605033875",
			"gps_altitude": "8.66",
			"temperature": "27.88",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6232,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:29",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:29Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.5110422",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "109",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708857177111444",
			"gps_longitude": "-61.68245494365692",
			"gps_altitude": "8.66",
			"temperature": "27.55",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6229,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:28",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:28Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.27163687",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "108",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708872990086356",
			"gps_longitude": "-61.682170629501336",
			"gps_altitude": "8.66",
			"temperature": "26.97",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6226,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:27",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:27Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.056785334",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "107",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708904616033672",
			"gps_longitude": "-61.68198287487029",
			"gps_altitude": "8.66",
			"temperature": "27.52",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6223,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:26",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:26Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.19332853",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "106",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708930970987264",
			"gps_longitude": "-61.68175756931305",
			"gps_altitude": "8.66",
			"temperature": "27.88",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6220,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:25",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:25Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.047921006",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "105",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.708967867918433",
			"gps_longitude": "-61.68156981468201",
			"gps_altitude": "8.66",
			"temperature": "27.43",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 6217,
			"device_id": 1,
			"sub_network_id": "156",
			"vessel_id": 2,
			"time_stamp": "2019-03-06 02:22:24",
			"sub_network_name": "Marine_IoT",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_time": "2019-03-06T06:22:24Z",
			"rx_rssi": "1",
			"rx_lora_snr": "0.9056601",
			"gateway_latitude": "10.248639",
			"gateway_longitude": "-61.496259",
			"gateway_altitude": "0",
			"tx_frequency": "104",
			"tx_data_rate": "4",
			"adr": "false",
			"frame_counter": "0",
			"fport": "1",
			"encoded_data": "BGYAA2cKAAGIAaKx9pYIAANi",
			"gps_latitude": "10.70900476484511",
			"gps_longitude": "-61.681349873542786",
			"gps_altitude": "8.66",
			"temperature": "27.23",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		}
	]
}

let get_device_uplink_records_7 = {
	"data":
	[
		{
			"device_uplink_id": 8820,
			"device_id": 1,
			"vessel_id": 2,
			"time_stamp": "2019-03-09 22:41:08",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gps_latitude": "10.717332813294362",
			"gps_longitude": "-61.6675740480423",
			"gps_altitude": "8.66",
			"temperature": "26.58",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 8819,
			"device_id": 1,
			"vessel_id": 2,
			"time_stamp": "2019-03-09 22:41:07",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gps_latitude": "10.717201042159227",
			"gps_longitude": "-61.66748821735382",
			"gps_altitude": "8.66",
			"temperature": "27.32",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 8818,
			"device_id": 1,
			"vessel_id": 2,
			"time_stamp": "2019-03-09 22:41:06",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gps_latitude": "10.716905874608388",
			"gps_longitude": "-61.667375564575195",
			"gps_altitude": "8.66",
			"temperature": "27.78",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		},
		{
			"device_uplink_id": 8817,
			"device_id": 1,
			"vessel_id": 2,
			"time_stamp": "2019-03-09 22:41:05",
			"device_eui": "1111111111111111",
			"device_name": "Device_1",
			"gps_latitude": "10.715936036343724",
			"gps_longitude": "-61.666860580444336",
			"gps_altitude": "8.66",
			"temperature": "27.72",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0
		}
	]
}

let get_device_uplink_records_8 = {
	"data":
	[
		{
			"device_uplink_id": 8820,
			"sub_network_id": "156",
			"vessel_id": 2,
			"vessel_name": "Time Chaser",
			"device_id": 1,
			"device_name": "Device_1",
			"gps_latitude": "10.717332813294362",
			"gps_longitude": "-61.6675740480423",
			"gps_altitude": "8.66",
			"temperature": "26.58",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0,
			"time_stamp": "2019-03-09 22:41:08"
		},
		{
			"device_uplink_id": 8819,
			"sub_network_id": "156",
			"vessel_id": 2,
			"vessel_name": "Time Chaser",
			"device_id": 1,
			"device_name": "Device_1",
			"gps_latitude": "10.717201042159227",
			"gps_longitude": "-61.66748821735382",
			"gps_altitude": "8.66",
			"temperature": "27.32",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0,
			"time_stamp": "2019-03-09 22:41:07"
		},
		{
			"device_uplink_id": 8818,
			"sub_network_id": "156",
			"vessel_id": 2,
			"vessel_name": "Time Chaser",
			"device_id": 1,
			"device_name": "Device_1",
			"gps_latitude": "10.716905874608388",
			"gps_longitude": "-61.667375564575195",
			"gps_altitude": "8.66",
			"temperature": "27.78",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0,
			"time_stamp": "2019-03-09 22:41:06"
		},
		{
			"device_uplink_id": 8817,
			"sub_network_id": "156",
			"vessel_id": 2,
			"vessel_name": "Time Chaser",
			"device_id": 1,
			"device_name": "Device_1",
			"gps_latitude": "10.715936036343724",
			"gps_longitude": "-61.666860580444336",
			"gps_altitude": "8.66",
			"temperature": "27.72",
			"humidity": "25",
			"accelerometer": "30",
			"sos": 0,
			"time_stamp": "2019-03-09 22:41:05"
		}
	]
}

//Gateway Stats----------------------------------------------------------------------------------------------------------------
let get_gateway_stats_1 = {
	"data":
	[
		{
			"gateway_statistics_id": 1,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "4",
			"rx_packets_received_ok": "1",
			"tx_packets_received": "0",
			"tx_packets_emitted": "1"
		},
		{
			"gateway_statistics_id": 2,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "4",
			"rx_packets_received_ok": "1",
			"tx_packets_received": "0",
			"tx_packets_emitted": "1"
		},
		{
			"gateway_statistics_id": 5,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 6,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 7,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 8,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 9,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 10,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 11,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 12,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 13,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 14,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 15,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 16,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 17,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 18,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 19,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 20,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 21,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 22,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 23,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		}
	]
}

let get_gateway_stats_2 = {
	"data":
	[
		{
			"gateway_statistics_id": 1,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "1",
			"tx_packets_received": "0",
			"tx_packets_emitted": "1"
		},
		{
			"gateway_statistics_id": 2,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "1",
			"tx_packets_received": "0",
			"tx_packets_emitted": "1"
		},
		{
			"gateway_statistics_id": 5,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 6,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 7,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 8,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 9,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 10,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 11,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 12,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 13,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 14,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 15,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 16,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 17,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 18,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 19,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 20,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 21,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 22,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		},
		{
			"gateway_statistics_id": 23,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		}
	]
}

let get_gateway_stats_3 = {
	"data":
	[
		{
			"gateway_statistics_id": 23,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5",
			"time_stamp": "2019-02-08 00:00:00"
		}
	]
}

let create_gateway_stat = {
	"data":
	[
		{
			"gateway_statistics_id": 23,
			"gateway_id": 1,
			"gateway_id_lora": "2222222222222222",
			"gateway_name": "Gateway_1",
			"network_id": "342",
			"time_stamp": "2019-02-08T00:00:00Z",
			"rx_packets_received": "5",
			"rx_packets_received_ok": "5",
			"tx_packets_received": "5",
			"tx_packets_emitted": "5"
		}
	]
}