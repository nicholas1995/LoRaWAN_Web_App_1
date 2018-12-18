const CreateUserPolicy = require('./policies/CreateUserPolicy');
const user = require('./controllers/user');
const authenticate = require('./policies/isAuthenticated');
const grant_access = require('./services/Access Control/grant_access');
const grant_view_access = require("./services/Access Control/grant_view_access");
const networks = require('./controllers/networks');
const sub_networks = require('./controllers/sub_networks');
const vessels = require("./controllers/vessels");
const devices = require("./controllers/devices");
const gateways = require("./controllers/gateways");
const service_profiles = require('./controllers/service_profiles');
const device_profiles = require("./controllers/device_profiles");
const network_servers = require("./controllers/network_servers");
const gateway_profiles = require("./controllers/gateway_profiles");
const device_data = require("./controllers/device_data");

const Network_Policy = require('./policies/network_policy');
const sub_network_policy = require('./policies/sub_network_policy');
const vessel_policy = require("./policies/vessel_policy");
const device_policy = require("./policies/device_policy");
const gateway_policy = require("./policies/gateway_policy");
const password_policy = require("./policies/UpdatePasswordPolicy")





module.exports = ((app) => { 

    //Check permission on page render
    app.get("/check_permission/:route/:method", authenticate, grant_view_access);

    //User Login
    app.post("/login", user.login_new);

    //New User Login
    app.post("/login/new_user", user.login_new_user);


    //---------------------Users---------------------
    //Users (Read) 
    app.get("/users", authenticate, grant_access, user.get);

    //Users (Create)
    app.post("/users", authenticate, grant_access,  user.create);

    //Users (Update)
    app.put("/users", authenticate, grant_access, user.update); 

    //Users (Delete)
    app.delete("/users/:id", authenticate, grant_access, user.delete);

    //---------------------Profile---------------------
    //Profile (Read)
    app.get("/profile", authenticate, user.profile_get);

    //Profile (Update)
    app.put("/profile", authenticate, user.profile_update);

    //Profile (Change Password)
    app.put("/update_password", authenticate, password_policy.password_policy, user.profile_update_password);

    //Users (Get vessels for an individual user)
    app.get("/users/vessels/:user_id", authenticate, grant_access, user.get_user_vessels);


    //---------------------Networks---------------------
    //Networks (Read)
    app.get("/networks", authenticate, grant_access, networks.get_networks);

    //Networks (Read networks from the database)
    app.get("/networks/database", authenticate, grant_access, networks.get_networks_database);

    //Networks (Create)
    app.post("/networks", authenticate, grant_access, Network_Policy.create, networks.create_networks);

    //Networks (Update)
    app.put("/networks/:network_id", authenticate, grant_access, Network_Policy.create, networks.update_networks);

    //Networks (Delete)
    app.delete("/networks/:network_id", authenticate, grant_access, networks.delete_networks);

    //----------------------Sub Networks-----------------
    //Sub_Networks (Read)
    app.get("/sub_networks", authenticate, grant_access, sub_networks.get);

    //Sub_Networks (Read one)
    app.get("/sub_networks/one/:sub_network_id", authenticate, grant_access, sub_networks.get_one);

    //Sub_Networks (Read subnetworks from database under specified network)
    app.get("/sub_networks/database/:networks", authenticate, grant_access, sub_networks.get_sub_subnetworks_database_specified_networks);

    //Sub_Networks (Create)
    app.post("/sub_networks", authenticate, grant_access, sub_network_policy.create, sub_networks.create);

    //Sub_Networks (Update)
    app.put("/sub_networks/:sub_network_id", authenticate, grant_access, sub_network_policy.update, sub_networks.update);
 
    //Sub_Networks (Delete)
    app.delete("/sub_networks/:sub_network_id", authenticate, grant_access, sub_networks.delete);

    //----------------------Vessels-----------------
    //Vessels (Read)
    app.get("/vessels/:sub_network_id/:deleted", authenticate, grant_access, vessels.get);

    //Vessels (Read vessels from the database under specified sub_network. This returns deleted and not deleted vessels)
    app.get("/vessels/all/:sub_networks", authenticate, grant_access, vessels.get_all);

    //Vessels (Create)
    app.post("/vessels", authenticate, grant_access, vessel_policy.create, vessels.create);

    //Vessels (Update)
    app.put("/vessels/:vessel_id", authenticate, grant_access, vessel_policy.update, vessels.update);

    //Vessels (Delete)
    app.delete("/vessels/:vessel_id", authenticate, grant_access, vessels.delete);

    //----------------------Devices-----------------
    //Devices (Read)
    app.get("/devices", authenticate, grant_access, devices.get);

    //Device (Read one)
    app.get("/device/:device_eui", authenticate, grant_access, devices.get_one);

    //Device (Read all under specified vessel from db)
    app.get("/devices/self/:user_vessel_info", authenticate, grant_access, devices.get_self);

    //Device (Read all under specified vessel from db)
    app.get("/devices/database/:vessels", authenticate, grant_access, devices.get_database);

    //Devices (Create)
    app.post("/devices", authenticate, grant_access, device_policy.create, devices.create); //need to add in device validation

    //Devices (Update)
    app.put("/devices/:device_eui", authenticate, grant_access, device_policy.update, devices.update); //need to add in device validation

    //Devices (Delete)
    app.delete("/devices/:device_eui", authenticate, grant_access, devices.delete);

    //----------------------Device Activation-----------------
    //Device Activation (Read)
    app.get("/devices/activation/:device_eui", authenticate, grant_access, devices.get_devices_activation);

    //Device Activation (Create)
    app.post("/devices/activation/:device_eui", authenticate, grant_access, devices.create_devices_activation);

    //Device Activation (Delete)
    app.delete("/devices/activation/:device_eui", authenticate, grant_access, devices.delete_devices_activation);

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
    app.get("/service_profiles", authenticate, grant_access, service_profiles.get);

    //----------------------Device Profile----------------------
    app.get("/device_profiles/:sub_network_id", authenticate, grant_access, device_profiles.get);

    //----------------------Network servers----------------------
    app.get("/network_servers", authenticate, grant_access, network_servers.get);

    //----------------------Gateway Profiles----------------------
    app.get("/gateway_profiles", authenticate, grant_access, gateway_profiles.get);

    //----------------------Device Uplink Data-----------------
    //Device (Initial fetch)
    app.get("/devices/uplink/initial", authenticate, grant_access, device_data.get);

    //Device (Initial fetch self)
    app.get("/devices/uplink/initial/self", authenticate, grant_access, device_data.get_self);

    //Device (Filtered) 
    app.get("/devices/rx/:parameters/:columns", authenticate, grant_access, device_data.get_filtered);

    //Device (Specified pagination)
    app.get("/devices/uplink/:sort_by/:descending", authenticate, grant_access, device_data.get);

    //Device (Specified Headings)
    app.get("/devices/uplink/headers/:sort_by/:descending/:headers", authenticate, grant_access, device_data.get_specified_headings);

    //Device (Specified Date)
    app.get("/devices/uplink/headers/date/:sort_by/:descending/:headers/:start_date/:end_date", authenticate, grant_access, device_data.get_specified_headings_date);


});     