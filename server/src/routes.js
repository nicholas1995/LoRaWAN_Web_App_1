const user = require('./controllers/user');
const authenticate = require('./policies/isAuthenticated');
const grant_access = require('./services/Access Control/grant_access');
const grant_view_access = require("./services/Access Control/grant_view_access");
const networks = require('./controllers/networks');
const sub_networks = require('./controllers/sub_networks');
const vessels = require("./controllers/vessels");
const devices = require("./controllers/devices");
const gateways = require("./controllers/gateways");
const gateway_statistics = require("./controllers/gateway_statistics")
const service_profiles = require('./controllers/service_profiles');
const device_profiles = require("./controllers/device_profiles");
const network_servers = require("./controllers/network_servers");
const gateway_profiles = require("./controllers/gateway_profiles");
const device_data = require("./controllers/device_data");
const error_logs = require("./controllers/error_logs");
const analyst_filter_records = require("./controllers/analyst_filter_record");

const user_policy = require('./policies/user_policy')
const Network_Policy = require('./policies/network_policy');
const sub_network_policy = require('./policies/sub_network_policy');
const vessel_policy = require("./policies/vessel_policy");
const device_policy = require("./policies/device_policy");
const gateway_policy = require("./policies/gateway_policy");
const device_profile_policy = require("./policies/device_profile_policy");
const service_profile_policy = require("./policies/service_profile_policy");
const gateway_profile_policy = require("./policies/gateway_profile_policy");
const network_server_policy = require("./policies/network_server_policy");
const password_policy = require("./policies/UpdatePasswordPolicy")




module.exports = ((app) => { 

    //Check permission on page render
    app.get("/check_permission/:route/:method", authenticate.authenticate, grant_view_access);

    //User Login
    app.post("/login", user.login_new);

    //New User Login
    app.post("/login/new_user", user.login_new_user);


    //---------------------Users---------------------
    //Users (Read One) 
    app.get("/users/:user_id", authenticate.authenticate, grant_access, user.get_one);

    //Users (Read) 
    app.get("/users", authenticate.authenticate, grant_access, user.get);

    //Users (Create)
    app.post("/users", authenticate.authenticate, grant_access, user_policy.create, user.create);

    //Users (Update)
    app.put("/users/:user_id", authenticate.authenticate, grant_access, user_policy.update, user.update); 

    //Users (Delete)
    app.delete("/users/:id", authenticate.authenticate, grant_access, user.delete);  

    //---------------------Profile---------------------
    //Profile (Read)
    app.get("/profile", authenticate.authenticate, user.profile_get);

    //Profile (Update)
    app.put("/profile", authenticate.authenticate, user.profile_update);

    //Profile (Change Password)
    app.put("/update_password", authenticate.authenticate, password_policy.password_policy, user.profile_update_password);

    //Profile (Reset Password) (Used to reset and when user forgets password)
    app.post("/reset_password_request", user.reset_password_request);

    //This checks to ensure that the reset password link token is valid
    app.get("/check_reset_password_token", authenticate.authenticate_reset_password_token)

    //This resets the user password
    app.put("/reset_password",authenticate.authenticate_reset_password_token, user.reset_password)

    //Users (Get vessels for an individual user)
    app.get("/users/vessels/:user_id", authenticate.authenticate, grant_access, user.get_user_vessels);


    //---------------------Networks---------------------
    //Networks (Read)
    app.get("/networks", authenticate.authenticate, grant_access, networks.get_networks);

    //Networks (Read networks from the database)
    app.get("/networks/database", authenticate.authenticate, grant_access, networks.get_networks_database);

    //Networks (Create)
    app.post("/networks", authenticate.authenticate, grant_access, Network_Policy.create, networks.create_networks);

    //Networks (Update)
    app.put("/networks/:network_id", authenticate.authenticate, grant_access, Network_Policy.create, networks.update_networks);

    //Networks (Delete)
    app.delete("/networks/:network_id", authenticate.authenticate, grant_access, networks.delete_networks);

    //----------------------Sub Networks-----------------
    //Sub_Networks (Read)
    app.get("/sub_networks", authenticate.authenticate, grant_access, sub_networks.get);

    //Sub_Networks (Read one)
    app.get("/sub_networks/one/:sub_network_id", authenticate.authenticate, grant_access, sub_networks.get_one);

    //Sub_Networks (Read subnetworks from database under specified network)
    app.get("/sub_networks/database/network/:networks", authenticate.authenticate, grant_access, sub_networks.get_sub_subnetworks_database);

    //Sub_Networks (Read subnetworks from database)
    app.get("/sub_networks/database", authenticate.authenticate, grant_access, sub_networks.get_sub_subnetworks_database);

    //Sub_Networks (Create)
    app.post("/sub_networks", authenticate.authenticate, grant_access, sub_network_policy.create, sub_networks.create);

    //Sub_Networks (Update)
    app.put("/sub_networks/:sub_network_id", authenticate.authenticate, grant_access, sub_network_policy.update, sub_networks.update);
 
    //Sub_Networks (Delete)
    app.delete("/sub_networks/:sub_network_id", authenticate.authenticate, grant_access, sub_networks.delete);

    //----------------------Vessels-----------------
    //Vessels (Read)
    app.get("/vessels/sub_network/:sub_network_id/deleted/:deleted", authenticate.authenticate, grant_access, vessels.get);

    //Vessels (Read)
    app.get("/vessels/sub_network/:sub_network_id", authenticate.authenticate, grant_access, vessels.get);

    //Vessels (Read)
    app.get("/vessels/deleted/:deleted", authenticate.authenticate, grant_access, vessels.get);

    //Vessels (Read)
    app.get("/vessels", authenticate.authenticate, grant_access, vessels.get);

    //Vessels (Read vessels from the database under specified sub_network. This returns deleted and not deleted vessels)
    app.get("/vessels/all/:sub_networks", authenticate.authenticate, grant_access, vessels.get_all);

    //Vessels (Create)
    app.post("/vessels", authenticate.authenticate, grant_access, vessel_policy.create, vessels.create);

    //Vessels (Update)
    app.put("/vessels/:vessel_id", authenticate.authenticate, grant_access, vessel_policy.update, vessels.update);

    //Vessels (Delete)
    app.delete("/vessels/:vessel_id", authenticate.authenticate, grant_access, vessels.delete);

    //----------------------Devices-----------------
    //Device (Read one)
    app.get("/devices/:device_eui", authenticate.authenticate, grant_access, devices.get_one);

    //Devices (Read)
    app.get("/devices", authenticate.authenticate, grant_access, devices.get);

    //Device (Read all under specified vessel from db)
    app.get("/devices/self/:user_vessel_info", authenticate.authenticate, grant_access, devices.get_self);

    //Device (Read all under specified vessel from db)
    app.get("/devices/database/:vessels", authenticate.authenticate, grant_access, devices.get_database);

    //Device (Read the initial device data for the map)
    app.get("/devices/map/initial", authenticate.authenticate, grant_access, devices.get_map_initial);

    //Device (Read the refresh device data for the map)
    app.get("/devices/map/refresh/:device_id", authenticate.authenticate, grant_access, devices.get_map_refresh);

    //Devices (Create)
    app.post("/devices", authenticate.authenticate, grant_access, device_policy.create, devices.create); //need to add in device validation

    //Devices (Update)
    app.put("/devices/:device_eui", authenticate.authenticate, grant_access, device_policy.update, devices.update); //need to add in device validation

    //Devices (Delete)
    app.delete("/devices/:device_eui", authenticate.authenticate, grant_access, devices.delete);

    //----------------------Device Activation-----------------
    //Device Activation (Read)
    app.get("/devices/activation/:device_eui", authenticate.authenticate, grant_access, devices.get_devices_activation);

    //Device Activation (Create)
    app.post("/devices/activation/:device_eui", authenticate.authenticate, grant_access, devices.create_devices_activation);

    //Device Activation (Delete)
    app.delete("/devices/activation/:device_eui", authenticate.authenticate, grant_access, devices.delete_devices_activation);

    //----------------------Gateways-----------------
    //Gateway (Read for Map)
    app.get("/gateways/map", authenticate.authenticate, grant_access, gateways.get_map); 

    //Gateway (Read for refresh device data for the map)
    app.get("/gateways/map/refresh/:gateway_id/:gateway_id_lora", authenticate.authenticate, grant_access, gateways.get_map_refresh);

    //Gateway (Read from database)
    app.get("/gateways/database", authenticate.authenticate, grant_access, gateways.get_gateways_database);
    
    //Gateway (Read one)
    app.get("/gateways/:gateway_id", authenticate.authenticate, grant_access, gateways.get_one);

    //Gateways (Read)
    app.get("/gateways", authenticate.authenticate, grant_access, gateways.get);

    //Gateways (Create)
    app.post("/gateways", authenticate.authenticate, grant_access, gateway_policy.create, gateways.create);

    //Gateways (Update)
    app.put("/gateways/:gateway_id", authenticate.authenticate, grant_access, gateway_policy.update, gateways.update);

    //Gateways (Delete)
    app.delete("/gateways/:gateway_id_lora", authenticate.authenticate, grant_access, gateways.delete);

    //----------------------Gateway Statistics----------------------
    //Gateway Statistics (Get Initial)
    app.get("/gateway_statistics/initial", authenticate.authenticate, grant_access, gateway_statistics.get_gateway_statistics_initial);

    //Gateway Statistics (Filtered)
    app.get("/gateway_statistics/parameters/:parameters/columns/:columns", authenticate.authenticate, grant_access, gateway_statistics.get_gateway_statistics_filtered);

    //Gateway Statistics (Export via email)
    app.post("/email/gateway_statistics/export_email", authenticate.authenticate, grant_access, gateway_statistics.gateway_statistics_export_via_email);

    //----------------------Service Profile----------------------
    //Service Profile (Read One)
    app.get("/service_profiles/:service_profile_id_lora", authenticate.authenticate, grant_access, service_profiles.get_one_service_profile);

    //Service Profile (Read)
    app.get("/service_profiles", authenticate.authenticate, grant_access, service_profiles.get);

    //Service Profile (Create)
    app.post("/service_profiles", authenticate.authenticate, grant_access, service_profile_policy.create, service_profiles.create_service_profile);

    //Service Profile (Update)
    app.put("/service_profiles/:service_profile_id_lora", authenticate.authenticate, grant_access, service_profile_policy.update, service_profiles.update_service_profile);

    //Service Profile (Delete)
    app.delete("/service_profiles/:service_profile_id_lora", authenticate.authenticate, grant_access, service_profiles.delete_service_profile);

    //----------------------Device Profile----------------------
    //Device Profile (Read Specific Sub-Network)
    app.get("/device_profiles/sub_network/:sub_network_id", authenticate.authenticate, grant_access, device_profiles.get_specified_sub_network);

    //Device Profile (Read One)
    app.get("/device_profiles/:device_profile_id_lora", authenticate.authenticate, grant_access, device_profiles.get_one);

    //Device Profile (Read)
    app.get("/device_profiles", authenticate.authenticate, grant_access, device_profiles.get);

    //Device Profile (Create)
    app.post("/device_profiles", authenticate.authenticate, grant_access, device_profile_policy.create, device_profiles.create_device_profile);

    //Device Profile (Update)
    app.put("/device_profiles/:device_profile_id_lora", authenticate.authenticate, grant_access, device_profile_policy.update, device_profiles.update_device_profile);

    //Device Profile (Delete)
    app.delete("/device_profiles/:device_profile_id_lora", authenticate.authenticate, grant_access, device_profiles.delete_device_profile);

    //----------------------Gateway Profiles----------------------
    //Gateway Profile (Read One)
    app.get("/gateway_profiles/:gateway_profile_id_lora", authenticate.authenticate, grant_access, gateway_profiles.get_one_gateway_profile);

    //Gateway Profile (Read)
    app.get("/gateway_profiles", authenticate.authenticate, grant_access, gateway_profiles.get);

    //Gateway Profile (Create)
    app.post("/gateway_profiles", authenticate.authenticate, grant_access, gateway_profile_policy.create, gateway_profiles.create_gateway_profile);

    //Gateway Profile (Update)
    app.put("/gateway_profiles/:gateway_profile_id_lora", authenticate.authenticate, grant_access, gateway_profile_policy.update, gateway_profiles.update_gateway_profile);

    //Gateway Profile (Delete)
    app.delete("/gateway_profiles/:gateway_profile_id_lora", authenticate.authenticate, grant_access, gateway_profiles.delete_gateway_profile);

    //----------------------Network servers----------------------
    
    //Network servers (Read One)network_server
    app.get("/network_servers/:network_server_id_lora", authenticate.authenticate, grant_access, network_servers.get_one_network_server);

    //Network servers (Read)
    app.get("/network_servers", authenticate.authenticate, grant_access, network_servers.get);

    //Network servers (Create)
    app.post("/network_servers", authenticate.authenticate, grant_access, network_server_policy.create, network_servers.create_network_server);

    //Network servers (Update)
    app.put("/network_servers/:network_server_id_lora", authenticate.authenticate, grant_access, network_server_policy.update, network_servers.update_network_server);

    //Network servers (Delete)
    app.delete("/network_servers/:network_server_id_lora", authenticate.authenticate, grant_access, network_servers.delete_network_server);


    //----------------------Device Uplink Data-----------------
    //Device (Initial fetch) 
    app.get("/devices/uplink/initial", authenticate.authenticate, grant_access, device_data.get);

    //Device (Initial fetch self) 
    app.get("/devices/uplink/initial/self", authenticate.authenticate, grant_access, device_data.get_self);

    //Device (Filtered) 
    app.get("/devices/uplink/parameters/:parameters/columns/:columns", authenticate.authenticate, grant_access, device_data.get_filtered);

    //Device (Filtered using Analyst Filter Record) 
    app.get("/devices/uplink/filter_record/columns/:columns", authenticate.authenticate, grant_access, device_data.get_filter_analyst_filter_record);

    //Device (Historical Data) 
    app.get("/devices/uplink/historical/parameters/:parameters", authenticate.authenticate, grant_access, device_data.get_historical);

    //Device (Export via email)
    app.post("/email/devices/uplink/export_email", authenticate.authenticate, grant_access, device_data.export_via_email);

    //----------------------Error Logs-----------------
    //Error Logs (Get)
    app.get(`/error_logs`, authenticate.authenticate, grant_access, error_logs.get);

    //----------------------Home Page Map-----------------
    //Uplink Data (Get Coordinates) 
    app.get('/device_coordinates', device_data.get_gps_coordinates)

    //Uplink Data (Get sesor data) 
    app.get('/sensor_data/coordinate/:coordinate', device_data.get_device_sensor_data_based_on_coordinates)

    //----------------------Analyst Filter Record-----------------
    //Analyst Filter Record (Get) 
    app.get('/analyst_filter_records', authenticate.authenticate, grant_access, analyst_filter_records.get_analyst_filter_records)

    //Analyst Filter Record (Create) 
    app.post('/analyst_filter_records', authenticate.authenticate, grant_access, analyst_filter_records.create_analyst_filter_records)


    
});      