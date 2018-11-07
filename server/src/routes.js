const CreateUserPolicy = require('./policies/CreateUserPolicy');
const user = require('./controllers/user');
const authenticate = require('./policies/isAuthenticated');
const grant_access = require('./services/Access Control/grant_access');
const networks = require('./controllers/networks');
const sub_networks = require('./controllers/sub_networks');
const devices = require("./controllers/devices");
const gateways = require("./controllers/gateways");
const service_profiles = require('./controllers/service_profiles');
const device_profiles = require("./controllers/device_profiles");
const network_servers = require("./controllers/network_servers");
const gateway_profiles = require("./controllers/gateway_profiles");
const simulation = require('./simulation_lora'); //This is used to simulate the lora app server
const Network_Policy = require('./policies/network_policy');
const sub_network_policy = require('./policies/sub_network_policy');
const device_policy = require("./policies/device_policy");
const gateway_policy = require("./policies/gateway_policy");





module.exports = ((app) => {
    //User Login
    app.post("/login", user.login);

    //Users (Create)
    app.post("/users", authenticate, grant_access, CreateUserPolicy.register, user.add_user);

    //Users (Read)
    app.get("/users", authenticate, grant_access, user.get_users);

    //Users (Delete)
    app.delete("/users", authenticate, grant_access, user.delete_user); //should change to a delete method instead of putting delete in the path

    //Users (Update)
    app.put("/users", authenticate, grant_access, CreateUserPolicy.update_user, user.update_user);

    //Get Profile Information
    app.get("/profile", authenticate, user.profile);

    //---------------------Networks---------------------
    //Networks (Read)
    app.get("/networks", authenticate, grant_access, networks.get_networks);

    //Networks (Create)
    app.post("/networks", authenticate, grant_access, Network_Policy.create, networks.create_networks);

    //Networks (Update)
    app.put("/networks/:network_id", authenticate, grant_access, Network_Policy.create, networks.update_networks);

    //Networks (Delete)
    app.delete("/networks/:network_id", authenticate, grant_access, networks.delete_networks);

    //----------------------Sub Networks-----------------
    //Sub_Networks (Read)
    app.get("/sub_networks", authenticate, grant_access, sub_networks.get);

    //Sub_Networks (Create)
    app.post("/sub_networks", authenticate, grant_access, sub_network_policy.create, sub_networks.create);

    //Sub_Networks (Update)
    app.put("/sub_networks/:sub_network_id", authenticate, grant_access, sub_network_policy.update, sub_networks.update);

    //Sub_Networks (Delete)
    app.delete("/sub_networks/:sub_network_id", authenticate, grant_access, sub_networks.delete);

    //----------------------Devices-----------------
    //Devices (Read)
    app.get("/devices", authenticate, grant_access, devices.get);

    //Devices (Create)
    app.post("/devices", authenticate, grant_access, device_policy.create, devices.create); //need to add in device validation

    //Devices (Update)
    app.put("/devices/:device_eui", authenticate, grant_access, device_policy.update, devices.update); //need to add in device validation

    //Devices (Delete)
    app.delete("/devices/:device_eui", authenticate, grant_access, devices.delete);

    //----------------------Gateways-----------------
    //Gateways (Read)
    app.get("/gateways", authenticate, grant_access, gateways.get);

    //Gateway (Read one)
    app.get("/gateway/:gateway_id", authenticate, grant_access, gateways.get_one);

    //Gateways (Create)
    app.post("/gateways", authenticate, grant_access, gateway_policy.create, gateways.create);

    //Gateways (Update)
    app.put("/gateways/:gateway_id", authenticate, grant_access, gateway_policy.create, gateways.update);

    //Gateways (Delete)
    app.delete("/gateways/:gateway_id", authenticate, grant_access, gateways.delete);

    //----------------------Service Profile----------------------
    app.get("/service_profiles/:network_id", authenticate, grant_access, service_profiles.get);

    //----------------------Device Profile----------------------
    app.get("/device_profiles/:sub_network_id", authenticate, grant_access, device_profiles.get);

    //----------------------Network servers----------------------
    app.get("/network_servers", authenticate, grant_access, network_servers.get);

    //----------------------Gateway Profiles----------------------
    app.get("/gateway_profiles/:network_server_id", authenticate, grant_access, gateway_profiles.get);

    //----------------------Simulate Lora API-----------------
    //simulation routes for the lora
    app.get("/api/organizations", simulation.read_networks);

    //simulation routes for the lora
    app.post("/api/organizations", simulation.create_networks);

    //simulation routes for the lora
    app.put("/api/organizations/:id", simulation.update_networks);

    //simulation routes for the lora
    app.delete("/api/organizations/:id", simulation.delete_networks);

    //simulation routes for the lora
    app.get("/api/applications", simulation.get_applications);

    app.post("/api/applications", simulation.create_applications);

    app.put("/api/applications/:id", simulation.update_applications);

    app.delete("/api/applications/:id", simulation.delete_applications);

    app.get("/api/service-profiles", simulation.get_service_profiles);
});     