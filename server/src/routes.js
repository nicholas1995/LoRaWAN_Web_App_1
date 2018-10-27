const CreateUserPolicy = require('./policies/CreateUserPolicy');
const user = require('./controllers/user');
const authenticate = require('./policies/isAuthenticated');
const grant_access = require('./services/Access Control/grant_access');
const networks = require('./controllers/networks');
const simulation = require('./simulation_lora'); //This is used to simulate the lora app server
const Network_Policy = require('./policies/NetworkPolicies');


module.exports = ((app) => {

    //User Login
    app.post('/login', user.login);

    //Users (Create)
    app.post('/users',authenticate,grant_access, CreateUserPolicy.register, user.add_user);

    //Users (Read)
    app.get('/users',authenticate, grant_access, user.get_users);

    //Users (Delete)
    app.delete('/users',authenticate,grant_access, user.delete_user); //should change to a delete method instead of putting delete in the path 

    //Users (Update)
    app.put('/users',authenticate, grant_access, CreateUserPolicy.update_user, user.update_user);

    //Get Profile Information
    app.get('/profile',authenticate, user.profile);

    //---------------------Networks---------------------
    
    //Networks (Read)
    app.get('/networks',authenticate,grant_access,networks.get_networks);

    //Networks (Create)
    app.post('/networks',authenticate,grant_access,Network_Policy.create,networks.create_networks);

    //Networks (Update)
    app.put('/networks/:id',authenticate,grant_access,Network_Policy.create,networks.update_networks);

    //Networks (Delete)
    app.delete('/networks/:id',authenticate,grant_access,networks.delete_networks)





    //simulation routes for the lora 
    app.get('/api/organizations', simulation.read_networks);

    //simulation routes for the lora 
    app.post('/api/organizations', simulation.create_networks);

    //simulation routes for the lora 
    app.put('/api/organizations/:id', simulation.update_networks);

    //simulation routes for the lora 
    app.delete('/api/organizations/:id', simulation.delete_networks);

});     