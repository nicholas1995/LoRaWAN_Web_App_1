const axios =require('axios');
const instance = axios.create({    
    //this will need to change to whatever the base url for the lora app server is
    //i am just using it to send the route to this server  
    baseURL: 'http://localhost:3000', 
});

module.exports =  {
    //Organizations (Read)
    get_organizations: function(){
        //Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`; //Fix to locate the token for the lora app server
        return instance.get('/api/organizations'); 
    },
    //Organizations (Create)
    create_organizations: function(apiCreateOrganizationRequest){
        //Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`; //Fix to locate the token for the lora app server
        return instance.post('/api/organizations', apiCreateOrganizationRequest); 
    },
    update_organizations: function(apiUpdateOrganizationRequest){
        //Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`; //Fix to locate the token for the lora app server
        return instance.put(`/api/organizations/${apiUpdateOrganizationRequest.id}`, apiUpdateOrganizationRequest); 
    },
    delete_organizations: function(network){
        //Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`; //Fix to locate the token for the lora app server
        return instance.delete(`/api/organizations/${network}`);
    }
};  
