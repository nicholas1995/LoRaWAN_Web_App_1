const axios =require('axios');
const instance = axios.create({    
    //this will need to change to whatever the base url for the lora app server is
    //i am just using it to send the route to this server  
    baseURL: 'http://localhost:8080', 
});
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJleHAiOjE3MTYyMzkwNTAsImlzcyI6ImxvcmEtYXBwLXNlcnZlciIsIm5iZiI6MTU0MTM1ODQ0OCwic3ViIjoidXNlciIsInVzZXJuYW1lIjoiYWRtaW4ifQ.283SFXl8zV4IirYWAYuw5wl8x5iz5ZvGR1H8kz6LkmQ";
module.exports = {
  //------------------------Network------------------------
  //---------Read---------
  get_organizations: function(data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/organizations?limit=${data.limit}`);
  },
  //---------Create---------
  create_organizations: function(organization) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.post("/api/organizations", organization);
  },
  //---------Update---------
  update_organizations: function(organization, id) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.put(`/api/organizations/${id}`, organization);
  },
  //---------Delete---------
  delete_organizations: function(id) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.delete(`/api/organizations/${id}`);
  },

  //------------------------Sub-Network------------------------
  //---------Read---------
  get_applications: function(data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/applications?limit=${data.limit}`);
  },
  //---------Read ONE---------
  get_application_one: function(sub_network_id) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/applications/${sub_network_id}`);
  },
  //--------- Create---------
  create_applications: function(data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.post("/api/applications", data);
  },
  //---------Update---------
  update: function(data, id) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.put(`/api/applications/${id}`, data);
  },
  //---------Delete---------
  delete: function(id) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.delete(`/api/applications/${id}`);
  },

  //------------------------Devices------------------------
  //---------Read---------
  get_devices: function(data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/devices?limit=${data.limit}`);
  },
  //---------Read ONE---------
  get_device_one: function(device_eui) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/devices/${device_eui}`);
  },
  //--------- Create---------
  create_devices: function(data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.post("/api/devices", data);
  },
  //---------Update---------
  update_devices: function(data, device_eui) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.put(`/api/devices/${device_eui}`, data);
  },
  //---------Delete---------
  delete_devices: function(device_eui) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.delete(`/api/devices/${device_eui}`);
  },

  //------------------------Device Activation------------------------
  //---------Read---------
  get_devices_activation: function(device_eui) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/devices/${device_eui}/activation`);
  },

  //---------Create---------
  create_devices_activation: function(data, device_eui) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.post(`/api/devices/${device_eui}/activate`, data);
  },

  //---------Delete---------
  delete_devices_activation: function(device_eui) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.delete(`/api/devices/${device_eui}/activation`);
  },

  //------------------------Gateways------------------------
  //---------Read---------
  get_gateways: function(data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/gateways?limit=${data.limit}`);
  },
  //---------Read ONE---------
  get_gateway_one: function(gateway_id) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/gateways/${gateway_id}`);
  },
  //--------- Create---------
  create_gateways: function(data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.post("/api/gateways", data);
  },
  //---------Update---------
  update_gateways: function(data, gateway_id) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.put(`/api/gateways/${gateway_id}`, data);
  },
  //---------Delete---------
  delete_gateways: function(gateway_id) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.delete(`/api/gateways/${gateway_id}`);
  },

  //------------------------Service Profile------------------------
  //---------Read---------
  get_service_profiles: function(data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/service-profiles?limit=${data.limit}`);
  },
  //---------Read One---------
  get_service_profile_one: function(service_profile_id_lora) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/service-profiles/${service_profile_id_lora}`);
  },
  //--------- Create---------
  create_service_profiles: function(data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.post("/api/service-profiles", data);
  },
  //---------Update---------
  update_service_profiles: function(data, service_profile_id_lora) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.put(`/api/service-profiles/${service_profile_id_lora}`, data);
  },
  //---------Delete---------
  delete_service_profiles: function(service_profile_id_lora) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.delete(`/api/service-profiles/${service_profile_id_lora}`);
  },

  //------------------------Device Profile------------------------
  //---------Read---------
  get_device_profiles: function(data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/device-profiles?limit=${data.limit}`);
  },
  //---------Read One---------
   get_device_profile_one: function(device_profile_id_lora) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/device-profiles/${device_profile_id_lora}`);
  },
  //---------Read for a specified Sub-Network---------
  get_device_profiles_specified_sub_network: function(data, sub_network_id) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/device-profiles?limit=${data.limit}&applicationID=${sub_network_id}`);
  },
  //---------Create---------
  create_device_profiles: function(data) {
  instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
  return instance.post("/api/device-profiles", data);
  },
  //---------Update---------
  update_device_profiles: function(data, device_profile_id_lora) {
  instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
  return instance.put(`/api/device-profiles/${device_profile_id_lora}`, data);
  },
  //---------Delete---------
  delete_device_profiles: function(device_profile_id_lora) {
  instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
  return instance.delete(`/api/device-profiles/${device_profile_id_lora}`);
  },

  //------------------------Gateway Profiles------------------------
  //---------Read---------
  get_gateway_profiles: function(data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/gateway-profiles?limit=${data.limit}`);
  },
  //---------Read One---------
  get_gateway_profile_one: function(gateway_profile_id_lora) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/gateway-profiles/${gateway_profile_id_lora}`);
  },
  //---------Create---------
  create_gateway_profiles: function(data) {
  instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
  return instance.post("/api/gateway-profiles", data);
  },
  //---------Update---------
  update_gateway_profiles: function(data, gateway_profile_id_lora) {
  instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
  return instance.put(`/api/gateway-profiles/${gateway_profile_id_lora}`, data);
  },
  //---------Delete---------
  delete_gateway_profiles: function(gateway_profile_id_lora) {
  instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
  return instance.delete(`/api/gateway-profiles/${gateway_profile_id_lora}`);
  },

  //------------------------Network Servers------------------------
  //---------Read---------
  get_network_servers: function(data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/network-servers?limit=${data.limit}`);
  },
  //---------Read One---------
  get_network_server_one: function(network_server_id_lora) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/network-servers/${network_server_id_lora}`);
  },
  //---------Create---------
  create_network_servers: function(data) {
  instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
  return instance.post("/api/network-servers", data);
  },
  //---------Update---------
  update_network_servers: function(data, network_server_id_lora) {
  instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
  return instance.put(`/api/network-servers/${network_server_id_lora}`, data);
  },
  //---------Delete---------
  delete_network_servers: function(network_server_id_lora) {
  instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
  return instance.delete(`/api/network-servers/${network_server_id_lora}`);
  },
};  
