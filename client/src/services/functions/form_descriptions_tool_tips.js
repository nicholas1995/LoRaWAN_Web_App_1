//Network Forms
const description_network_name = "Name of the network to be created on the LoRa Server. Name must be unique, less than 80 characters, only contain words, numbers and the symbols - and _.";
const description_network_display_name = "Additional field which holds the display name of the network being created. Display name must be less than 80 characters,";

//Sub-network Forms
const description_sub_network_name = "Name of the sub-network to be created on the LoRa Server. Name must be unique to all sub-network names belonging to sub-networks on the same network, less than 80 characters, only contain words, numbers and the symbols - and _.";
const description_sub_network_descripton = "Description of the sub-network which holds additional details about the sub-network. Must be less than 200 characters long.";
const description_sub_network_network_name = "Network under which the sub-network to be created will be assigned. Cannot be changed once sub-network is created.";
const description_sub_network_service_profile = "Service profile to be assigned to the sub-network to be created. Cannot be changed once sub-network is created. The service profile assigns the capabilites of all the devices under the created sub-network.";
const description_sub_network_payload_codec = "FILL OUT";

//Gateway Forms
const description_gateway_name = "hgjkgh world";
const description_gateway_id = "ID of the LoRaWAN gateway being created. This value is set by an IoT Network Admin";
const description_gateway_description = "Bye world";
const description_gateway_network = "hgjkgh world";
const description_gateway_network_server = "Bye world";
const description_gateway_profile = "Bye world";
const description_gateway_location_accuracy = "The accuracy with which the gateway location has been specified. This is determined by the measurement source.";
const description_gateway_location_altitude = "Bye world";
const description_gateway_location_latitude = "Bye world";
const description_gateway_location_longitude = "Bye world";
const description_gateway_location_source = "Bye world";
const description_fine_time_stamp_key = "Bye world";
const description_gateway_fpga_id = "Bye world";

//Device Forms
const description_device_name = "Name of the device to be created on the LoRa Server. Name must be unique to all device names belonging to devices on the same sub-network, less than 80 characters, only contain words, numbers and the symbols - and _.";
const description_device_eui = "Unique identifier for all devices on the LoRa Server that cannot be changed once the device is created. Consists of 16 hexadecimal digits.";
const description_device_description = "Description of the device which holds additional details about the device. Must be less than 200 characters long.";
const description_device_reference_altitude = "This is used for geolocation purposes to increase the accuracy of the location of devices.";
const description_skip_frame_counter = "";
const description_device_network = "Network under which the device to be created will be placed. Cannot be changed once device is created.";
const description_device_sub_network = "Sub-network under which the device to be created will be placed. Cannot be changed once device is created.";
const description_vessel_device = "Vessel the device will be placed on. If no vessel selected the device will be associated with the default vessel for the selected Sub-Network"
const description_device_device_profile = "The profile that defines the device capabilities.";

//Device Activation
const description_dev_addr = "description_dev_addr";
const description_nwk_s_enc_key = "description_nwk_s_enc_key";
const description_app_s_key = "description_app_s_key";
const description_f_cnt_up = "description_f_cnt_up";
const description_n_f_cnt_down = "description_n_f_cnt_down";

//Service Profile
const description_service_profile_name = '';
const description_network_service_profile = '';
const description_network_server_service_profile = '';
const description_add_gw_metadata = '';
const description_report_device_status_battery = '';
const description_report_device_status_margin = '';
const description_network_geo_location = '';
const description_device_status_req_frequency = '';
const description_dr_min = '';
const description_dr_max = 'DR max';

//Device Profile Forms
const description_device_profile_name = "";
const description_mac_version = "";
const description_reg_params_revision = "";
const description_network_device_profile = "";
const description_network_server_device_profile = "";
const description_max_eirp = "";
const description_supports_join = "";
const description_rx_delay_1 = "";
const description_rx_dr_offset_1 = "";
const description_rx_dr_2 = "";
const description_rx_frequency_2 = "";
const description_factory_preset_frequencies = "";
const description_supports_class_b = "";
const description_class_b_timeout = "";
const description_ping_slot_period = "";
const description_ping_slot_dr = "";
const description_ping_slot_frequency = "";
const description_supports_class_c = "";
const description_class_c_timeout = "";

//Gateway Profiles
const description_gateway_profile_name = "gateway_profile_name";
const description_gateway_profile_channels = "gateway_profile_channels";
const description_network_server_id_lora = "network_server_id_lora";
const description_gateway_profile_bandwidth = "gateway_profile_bandwidth";
const description_gateway_profile_bitrate = "gateway_profile_bitrate";
const description_gateway_profile_frequency = "gateway_profile_frequency";
const description_gateway_profile_modulation = "gateway_profile_modulation";
const description_gateway_profile_spreading_factors = "gateway_profile_spreading_factors";
const description_gateway_profile_bit_rate = "description_gateway_profile_bit_rate";

//Users
const description_first_name = "description_first_name";
const description_last_name = "description_last_name";
const description_user_country = "description_user_country";
const description_user_city = "description_user_city";
const description_user_district = "description_user_district";
const description_user_street = "description_user_street";
const description_home_phone = "description_home_phone";
const description_mobile_phone = "description_mobile_phone";
const description_email = "description_email";
const description_user_class = "description_user_class";
const description_user_network = "description_user_network";
const description_user_sub_network = "description_user_sub_network";
const description_user_vessels = "description_user_vessels";


export {
  description_network_name,//Network
  description_network_display_name,

  description_sub_network_name,//Sub-Network
  description_sub_network_descripton,
  description_sub_network_network_name,
  description_sub_network_service_profile,
  description_sub_network_payload_codec,

  description_gateway_name,//Gateway
  description_gateway_id,
  description_gateway_description,
  description_gateway_network,
  description_gateway_network_server,
  description_gateway_profile,
  description_gateway_location_accuracy,
  description_gateway_location_altitude,
  description_gateway_location_latitude,
  description_gateway_location_longitude,
  description_gateway_location_source,
  description_fine_time_stamp_key,
  description_gateway_fpga_id,

  description_device_name,//Device
  description_device_eui,
  description_device_description,
  description_device_reference_altitude,
  description_skip_frame_counter,
  description_device_network,
  description_device_sub_network,
  description_vessel_device,
  description_device_device_profile,

  description_dev_addr,//Device Activation
  description_nwk_s_enc_key,
  description_app_s_key,
  description_f_cnt_up,
  description_n_f_cnt_down,

  description_service_profile_name,//Service Profile
  description_network_service_profile,
  description_network_server_service_profile,
  description_add_gw_metadata,
  description_report_device_status_battery,
  description_report_device_status_margin,
  description_network_geo_location,
  description_device_status_req_frequency,
  description_dr_min,
  description_dr_max,

  description_device_profile_name,//Device Profile
  description_mac_version,
  description_reg_params_revision,
  description_network_device_profile,
  description_network_server_device_profile,
  description_max_eirp,
  description_supports_join,
  description_rx_delay_1,
  description_rx_dr_offset_1,
  description_rx_dr_2,
  description_rx_frequency_2,
  description_factory_preset_frequencies,
  description_supports_class_b,
  description_class_b_timeout,
  description_ping_slot_period,
  description_ping_slot_dr,
  description_ping_slot_frequency,
  description_supports_class_c,
  description_class_c_timeout,

  description_gateway_profile_name,//Gateway Profiles
  description_gateway_profile_channels,
  description_network_server_id_lora,
  description_gateway_profile_bandwidth,
  description_gateway_profile_bitrate,
  description_gateway_profile_frequency,
  description_gateway_profile_modulation,
  description_gateway_profile_spreading_factors,
  description_gateway_profile_bit_rate,

  description_first_name,//User
  description_last_name,
  description_user_country,
  description_user_city,
  description_user_district,
  description_user_street,
  description_home_phone,
  description_mobile_phone,
  description_email,
  description_user_class,
  description_user_network, 
  description_user_sub_network,
  description_user_vessels,
};
