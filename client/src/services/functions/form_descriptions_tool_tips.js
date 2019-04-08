//Network Forms
const description_network_name = "Name of the organization to be created on the LoRa App Server. Name must be unique, less than 80 characters and only contain letters, numbers and the symbols - and _.";
const description_network_display_name = "Additional field which holds the display name of the organization being created. Display name must be less than 80 characters and only contain letters, numbers, spaces and the symbols - and _.";

//Sub-network Forms
const description_sub_network_name = "Name of the application to be created on the LoRa App Server. Name must be unique to all applications names belonging to the same organization, less than 80 characters, only contain letters, numbers and the symbols - and _.";
const description_sub_network_descripton = "Description of the application. Must be less than 200 characters long and only contain letters, numbers, spaces and the symbols - and _.";
const description_sub_network_network_name = "Organization which the application belongs to. Cannot be changed once the application is created.";
const description_sub_network_service_profile = "Service profile assigned to created application. Cannot be changed once application is created. The service profile assigns the capabilites of all the devices associated with the created application.";
const description_sub_network_payload_codec = "Codec used to encode and decode the data from the devices assigned to the created application.";

//Gateway Forms
const description_gateway_name = "Name of the gateway to be created on the LoRa App Server. Name must be unique, less than 80 characters and only contain letters, numbers and the symbols - and _.";
const description_gateway_id = "ID of the gateway being created. Must be a unique, 16 digit HEX encoded value";
const description_gateway_description = "Description of the gateway. Must be less than 200 characters long and only contain letters, numbers, spaces and the symbols - and _.";
const description_gateway_network = "Organization to which the gateway belongs. This cannot be changed once the gateway is created.";
const description_gateway_network_server = "Network server on which the gateway is provisioned";
const description_gateway_profile = "Optional profile which configures the channels used by the gateway.";
const description_gateway_location_accuracy = "The accuracy in meters with which the gateway location has been specified. This is determined by the measurement source and must be a number.";
const description_gateway_location_altitude = "Altitude of the gateway in meters. Must be a whole number.";
const description_gateway_location_latitude = "Latitude of the location of the gateway in decimal degrees format.";
const description_gateway_location_longitude = "Longitude of the location of the gateway in decimal degrees format.";
const description_gateway_location_source = "Method used to determine the location of the gateway.";
const description_fine_time_stamp_key = "This is only needed when the gateway supports the fine-timestamp and you would like to add the FPGA ID to the gateway meta-data or would like LoRa Server to decrypt the fine-timestamp. Must be a 32 digit HEX encoded value.";
const description_gateway_fpga_id = "Must be a 16 digit HEX encoded value.";

//Device Forms
const description_device_name = "Name of the device to be created on the LoRa Server. Name must be unique to all devices on the same application, less than 80 characters long and only contain letters, numbers and the symbols - and _.";
const description_device_eui = "Unique identifier for all devices. Cannot be changed once device is created and must be a 16 digit HEX encoded value.";
const description_device_description = "Description of the device. Must be less than 200 characters long and only contain letters, numbers, spaces and the symbols - and _.";
const description_device_reference_altitude = "When using geolocation, this altitude will be used as a reference to increase geolocation accuracy. Must be a number";
const description_skip_frame_counter = "Skip frame-counter checks. This is insecure but is helpful for debugging and testing.";
const description_device_network = "Organization of the application the device will belong to.";
const description_device_sub_network = "Application the device will be added to. Cannot be changed once device is created.";
const description_vessel_device = "Vessel the device will be placed on. If no vessel selected the device will be associated with the default vessel for the selected application"
const description_device_device_profile = "The device profile to be assoociated with the device which defines the capabilities and boot parameters for setting up the LoRaWAN radio access service.";

//Device Activation
const description_dev_addr = "A 16 digit HEX encoded value which is used as the address of the device.";
const description_nwk_s_enc_key = "A 32 digit HEX encoded value which defines the network session key.";
const description_app_s_key = "A 32 digit HEX encoded value which defines the application session key.";
const description_f_cnt_up = "Downlink network frame counter.";
const description_n_f_cnt_down = "Downlink application frame counter.";

//Service Profile
const description_service_profile_name = 'Name of the service profile to be created on the LoRa Server. Name must be less than 80 characters long and only contain letters, numbers, spaces and the symbols - and _.';
const description_network_service_profile = 'Organization to which the service profile is assigned.';
const description_network_server_service_profile = 'Network server on which the service profile is provisioned.';
const description_add_gw_metadata = 'Adds the RSSI, SNR, GW Location among other values to the packet sent to the application server from the devices.';
const description_report_device_status_battery = 'Report the device battery level to the application server.';
const description_report_device_status_margin = 'Reports the device margin to the application server.';
const description_network_geo_location = 'Enables the network geolocation service.';
const description_device_status_req_frequency = 'The frequency to initiate a device status request (request per day). Must be a number.';
const description_dr_min = 'Minimum allowed data rate. Used for adaptive data rate.';
const description_dr_max = 'Maximum allowed data rate. Used for adaptive data rate.';

//Device Profile Forms
const description_device_profile_name = "Name of the device profile to be created on the LoRa Server. Name must be less than 80 characters long and only contain letters, numbers, spaces and the symbols - and _.";
const description_mac_version = "Version of LoRaWAN supported by the device.";
const description_reg_params_revision = "Revision of the Regional Parameters document supported by the device.";
const description_network_device_profile = "Organization to which the device profile is assigned.";
const description_network_server_device_profile = "Network server on which the service-profile is provisioned.";
const description_max_eirp = "Max EIRP supported by the device.";
const description_supports_join = "Select if device supports over the air activation (OTAA). Disselect if device only supports activation by personalization(ABP)";
const description_rx_delay_1 = "Class A RX1 delay (mandatory for ABP).";
const description_rx_dr_offset_1 = "RX1 data rate offset (mandatory for ABP)";
const description_rx_dr_2 = "RX2 data rate (mandatory for ABP)";
const description_rx_frequency_2 = "RX2 channel frequency (mandatory for ABP)";
const description_factory_preset_frequencies = "List of factory-preset frequencies (mandatory for ABP)";
const description_supports_class_b = "Select if device supports class B communication.";
const description_class_b_timeout = "Maximum delay for the device to answer a MAC request or a confirmed DL frame (mandatory if class B mode supported).";
const description_ping_slot_period = "Mandatory if class B mode supported.";
const description_ping_slot_dr = "Mandatory if class B mode supported.";
const description_ping_slot_frequency = "Mandatory if class B mode supported.";
const description_supports_class_c = "Select if device supports class B communication.";
const description_class_c_timeout = "Maximum delay for the device to answer a MAC request or a confirmed DL frame (mandatory if class C mode supported)";

//Gateway Profiles
const description_gateway_profile_name = "Name of the gateway profile to be created on the LoRa Server. Name must be less than 80 characters long and only contain letters, numbers, spaces and the symbols - and _.";
const description_gateway_profile_channels = "Default channels enabled for this configuration. (Channels specified by the LoRaWAN Regional Parameters specification)";
const description_network_server_id_lora = "Network server on which the gateway profile is provisioned.";
const description_gateway_profile_bandwidth = "Bandwidth.";
const description_gateway_profile_bitrate = "Bitrate (in case of FSK modulation).";
const description_gateway_profile_frequency = "Frequency.";
const description_gateway_profile_modulation = "Modulation.";
const description_gateway_profile_spreading_factors = "Spreading factors (in case of LoRa modulation).";
const description_gateway_profile_bit_rate = "Bitrate (in case of FSK modulation).";

//Users
const description_first_name = "First name of the user. Must be less than 32 characters and only contain letters and the symbols - and _.";
const description_last_name = "Last name of the user. Must be less than 32 characters and only contain letters and the symbols - and _.";
const description_user_country = "Country the user lives in. Must be less than 32 characters and only contain letters and the symbols -, _ and &.";
const description_user_city = "City the user lives in. Must be less than 32 characters and only contain letters and the symbols -, _ and &.";
const description_user_district = "District the user lives in. Must be less than 32 characters and only contain letters and the symbols -, _ and &.";
const description_user_street = "Street the user lives in. Must be less than 32 characters and only contain letters and the symbols -, _ and &.";
const description_home_phone = "Users home contact phone number.";
const description_mobile_phone = "Users mobile contact phone number.";
const description_email = "Email address of the user. Must be a valid email and cannot be changed once the account is created.";
const description_user_class = "User class to assign to the user. This will determine the privilages which the user has access to.";
const description_user_network = "Organization of the applications which the user can select a vessel from.";
const description_user_sub_network = "Application which the user can select a vessel from.";
const description_user_vessels = "Vessel/s the user account has ownership over";

//Vessel
const description_vessel_name = "Name of the vessel. Must be unique, less than 80 characters and only contain letters, spaces and the symbols - and _.";
const description_vessel_unique_vessel_identifier = "The unique vessel identifier of the vessel to be created. Must be less than 20 characters and only contain letters and the symbols - and _.";
const description_vessel_international_radio_call_sign = "The international radio call sign assigned to the vessel.";
const description_vessel_type = "The type of the vessel.";
const description_vessel_organization = "The organization the vessel will belong to. This cannot be changed once the vessel is created.";
const description_vessel_application = "The application the vessel belongs to. This cannot be changed once the vessel is created.";


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

  description_vessel_name,//Vessel
  description_vessel_unique_vessel_identifier,
  description_vessel_international_radio_call_sign,
  description_vessel_type,
  description_vessel_organization,
  description_vessel_application,
};
