const axios =require('axios');
const instance = axios.create({    
    //this will need to change to whatever the base url for the lora app server is
    //i am just using it to send the route to this server  
    baseURL: 'http://localhost:8080', 
});
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJsb3JhLWFwcC1zZXJ2ZXIiLCJleHAiOjE1NDExMjg0NzMsImlzcyI6ImxvcmEtYXBwLXNlcnZlciIsIm5iZiI6MTU0MTA0MjA3Mywic3ViIjoidXNlciIsInVzZXJuYW1lIjoiYWRtaW4ifQ.ZW3UPYDCsUVGosathBo1j-gzj_j8XpHCTvx8OiIluMY";
module.exports = {
  //------------------------Organizations------------------------
  //---------Read---------
  get_organizations: function(data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] =  token ;
    return instance.get(`/api/organizations?limit=${data.limit}`);
  },
  //---------Create---------
  create_organizations: function (organization) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.post("/api/organizations", organization);
  },
  //---------Update---------
  update_organizations: function (organization,id) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.put(`/api/organizations/${id}`, organization);
  },
  //---------Delete---------
  delete_organizations: function(network) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.delete(`/api/organizations/${network}`);
  },

  //------------------------Applications------------------------
  //---------Read---------
  get_applications: function (data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/applications?limit=${data.limit}`);
  }, 
  //--------- Create---------
  create_applications: function(data) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.post("/api/applications", data);
  },
  //---------Update---------
  update: function(data, id){
      let apiUpdateApplicationRequest = JSON.stringify(data);
      return instance.put(`/api/applications/${id}`, {apiUpdateApplicationRequest})
  },
   //---------Delete---------
  delete: function(id){
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.delete(`/api/applications/${id}`);
  }, 


  //Service Profile 
  //Service Profile(Read)
  get_service_profiles: function (data, id) {
    instance.defaults.headers.common["Grpc-Metadata-Authorization"] = token;
    return instance.get(`/api/service-profiles?limit=${data.limit}&organizationID=${id}`);
  }
};  
