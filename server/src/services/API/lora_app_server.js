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
  get_service_profiles: function(data, id) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(
      `/api/service-profiles?limit=${data.limit}&organizationID=${id}`
    );
  },

  //------------------------Device Profile------------------------
  //---------Read---------
  get_device_profiles: function(data, id) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(
      `/api/device-profiles?limit=${data.limit}&applicationID=${id}`
    );
  },

  //------------------------Network Servers------------------------
  get_network_servers: function(data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/network-servers?limit=${data.limit}`);
  },

  //------------------------Gateway Profiles------------------------
  get_gateway_profiles: function(data, network_server_id) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(
      `/api/gateway-profiles?limit=${
        data.limit
      }&networkServerID=${network_server_id}`
    );
  }
};  
