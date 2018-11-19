//Network Forms
const description_network_name = "Name of the network to be created on the LoRa Server. Name must be unique, less than 80 characters, only contain words, numbers and the symbols - and _.";
const description_network_display_name = "Additional field which holds the display name of the network being created. Display name must be less than 80 characters,";

//Sub-network Forms
const description_sub_network_name = "Name of the sub-network to be created on the LoRa Server. Name must be unique to all sub-network names belonging to sub-networks on the same network, less than 80 characters, only contain words, numbers and the symbols - and _.";
const description_sub_network_descripton = "Description of the sub-network which holds additional details about the sub-network. Must be less than 200 characters long.";
const description_sub_network_network_name = "Network under which the sub-network to be created will be assigned. Cannot be changed once sub-network is created.";
const description_sub_network_service_profile = "Service profile to be assigned to the sub-network to be created. Cannot be changed once sub-network is created. The service profile assigns the capabilites of all the devices under the created sub-network.";

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
const description_device_sub_network = "Sub-network under which the device to be created will be placed. Cannot be changed once device is created.";
const description_device_device_profile = "The profile that defines the device capabilities.";
const description_device_reference_altitude = "This is used for geolocation purposes to increase the accuracy of the location of devices.";


export {
  description_network_name,
  description_network_display_name,
  description_sub_network_name,
  description_sub_network_descripton,
  description_sub_network_network_name,
  description_sub_network_service_profile,
  description_gateway_name,
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
  description_device_name,
  description_device_eui,
  description_device_description,
  description_device_sub_network,
  description_device_device_profile,
  description_device_reference_altitude,
};
