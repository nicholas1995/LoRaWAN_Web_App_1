const axios =require('axios');
const instance = axios.create({    
    //this will need to change to whatever the base url for the lora app server is
    //i am just using it to send the route to this server  
    baseURL: 'http://localhost:8080', 
});
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJleHAiOjE1NDE0NDQ4NDgsImlzcyI6ImxvcmEtYXBwLXNlcnZlciIsIm5iZiI6MTU0MTM1ODQ0OCwic3ViIjoidXNlciIsInVzZXJuYW1lIjoiYWRtaW4ifQ.TbwmIHzZNr6WaDYxvqcxKYKf2XEunXOYFGYc1A32VQk";
module.exports = {
  //------------------------Organizations------------------------
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

  //------------------------Applications------------------------
  //---------Read---------
  get_applications: function(data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/applications?limit=${data.limit}`);
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
  //--------- Create---------
  create_devices: function(data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.post("/api/devices", data);
  },
  //---------Update---------
  update_devices: function (data, device_eui) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.put(`/api/devices/${device_eui}`, data);
  },
  //---------Delete---------
  delete_devices: function (device_eui) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.delete(`/api/devices/${device_eui}`);
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
  }
};  
