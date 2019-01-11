import axios from 'axios';
import store from '../store/store';
import Api from './api';

var instance = axios.create({
  baseURL: "http://64638a61.ngrok.io"
}); 



export default {

    check_permissions(route, permission){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`check_permission/${route}/${permission}`); 
    },

    //A funtion that hits a post to localhost:3000/register. It passes the credentials to the server

    login(credentials){
        let data = JSON.stringify(credentials);
        return Api.post('login', {data}); 
    },
    login_new_user(credentials){
        let data = JSON.stringify(credentials);
        return Api.post("login/new_user", {data}); 
    },
    //Users
    get_users(){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get('users');
    },
    create_users(data) {
        data = JSON.stringify(data);
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.post('users',{data});
    },
    update_users(data) {
        data = JSON.stringify(data);
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.put('users', {data});
    },
    delete_users(id) {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.delete(`/users/${id}`);
    },

    //Profile
    get_profile(){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get('profile');
    },
    update_profile(data) {
        data = JSON.stringify(data);
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.put('profile', {data});
    },
    update_password(data) {
        data = JSON.stringify(data);
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.put("update_password", { data });
    },

    get_user_vessels(user_id) {//we pick the uri this way because its a software admin ability 
        //and since in the acl they can view all users we will put users first 
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get(`/users/vessels/${user_id}`);
    },

    //Networks 
    get_networks(){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get('networks');
    },
    get_networks_database() {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get('networks/database');
    },
    create_networks(network){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.post('networks', {network});
    },
    update_networks(network, id){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.put(`/networks/${id}`, {network});
    },
    delete_networks(id){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.delete(`/networks/${id}`);
    },

    //Sub Networks
    get_sub_networks(){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get('/sub_networks');
    },
    get_sub_network_one(sub_network_id){
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get(`/sub_networks/one/${sub_network_id}`);
    },
    get_sub_networks_db_given_network(network) {
        if(network){
            Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
            return Api.get(`/sub_networks/database/network/${network}`);
        }else{
            Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
            return Api.get(`/sub_networks/database/`);
        }
    },
    create_sub_networks(sub_network){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.post('/sub_networks', {sub_network});
    },
    update_sub_networks(sub_network, sub_network_id){
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.put(`/sub_networks/${sub_network_id}`, {sub_network});
    },
    delete_sub_networks(sub_network_id){
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.delete(`/sub_networks/${sub_network_id}`);
    },

    //Vessels
    get_vessels(sub_network_id, deleted) {//This returns vessels. set sub_net to null to leave open ended.. deleted to null for both.... deleted to 0 for not deleted.. deleted to 1 for deleted
        if(sub_network_id){
            if(deleted){
                Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
                return Api.get(`/vessels/sub_network/${sub_network_id}/deleted/${deleted}`);
            }else{
                Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
                return Api.get(`/vessels/sub_network/${sub_network_id}`);
            }
        }else if(deleted || deleted == 0){ //if 0 not specify they treat it as a null value
            Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
            return Api.get(`/vessels/deleted/${deleted}`);
        }else{
            Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
            return Api.get(`/vessels`);
        }

    },
    get_vessels_db_given_sub_networks(sub_network_id) {//This returns deleted and not deleted vessels in the database under the specified subnet
        //NEED TO REMOVE
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/vessels/all/${sub_network_id}`);
    },
    create_vessels(vessel) {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.post("/vessels", { vessel });
    },
    update_vessels(vessel, vessel_id) {
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.put(`/vessels/${vessel_id}`, { vessel });
    },
    delete_vessels(vessel_id) {
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.delete(`/vessels/${vessel_id}`);
    },

    //Devices
    get_devices() {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get('/devices');
    }, 
    get_device(device_eui) {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/devices/${device_eui}`);
    },
    get_devices_self(vessel_info) { //THis is used for the fishers or for self data to ensure that only ur devices assigned to the vessel over the period that you are assigned to it show up in the drop down menu
        vessel_info = JSON.stringify(vessel_info);
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/devices/self/${vessel_info}`);
    },
    get_devices_db_given_vessels(vessels) {//This returns ALL the devices associated with the selected vessels from the database
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/devices/database/${vessels}`);
    },
    create_devices(device) {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.post('/devices', { device });
    },
    update_devices(device, device_eui) {
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.put(`/devices/${device_eui}`, { device });
    },
    delete_devices(device_eui) {
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.delete(`/devices/${device_eui}`);
    },
    //Device Activation
    get_devices_activation(device_eui) {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/devices/activation/${device_eui}`);
    }, 
    create_devices_activation(device_activation, device_eui) {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.post(`/devices/activation/${device_eui}`, { device_activation });
    }, 
    delete_devices_activation() {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.delete(`/devices/activation/${device_eui}`);
    }, 

    //Gateways
    get_gateways(){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get('/gateways');
    },
    get_gateway(gateway_id) {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/gateways/${gateway_id}`);
    },
    get_gateways_database() {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/gateways/database`);
    },
    get_gateways_map(){
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get(`/gateways/map`);
    },
    create_gateways(gateway){
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.post("/gateways", { gateway });
    }, 
    update_gateways(gateway, gateway_id) {
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.put(`/gateways/${gateway_id}`, { gateway });
    },
    delete_gateways(gateway_id) {
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.delete(`/gateways/${gateway_id}`);
    },
    //Gateway Staisatics
    get_gateway_statistics_initial() { //returns all the gateway stats
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get(`/gateway_statistics/initial`);
    },

    gateway_statistics_filtered(parameters, columns){
        console.log(parameters)
        console.log(columns)
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get(`/gateway_statistics/parameters/${parameters}/columns/${columns}`);
    },

    //Service Profile
    get_service_profiles(){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/service_profiles`);
    },
    get_service_profile(service_profile_id_lora) {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/service_profiles/${service_profile_id_lora}`);
    },
    create_service_profiles(service_profile) {
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.post("/service_profiles", { service_profile });
    }, 
    update_service_profiles(service_profile, service_profile_id_lora) {
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.put(`/service_profiles/${service_profile_id_lora}`, { service_profile });
    },
    delete_service_profiles(service_profile_id_lora) {
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.delete(`/service_profiles/${service_profile_id_lora}`);
    },


    //Device Profile
    get_device_profiles_specified_sub_network(sub_network_id) {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/device_profiles/${sub_network_id}`);
    },

    get_device_profiles() {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/device_profiles`);
    },

    //Network servers
    get_network_servers(){
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get('/network_servers');
    },

    //Gateway profiles
    get_gateway_profiles(){
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get(`/gateway_profiles`);
    },

    //Device uplink data
    get_device_uplink_specified_id(device_uplink_id){
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get(`devices/uplink/specific_id/${device_uplink_id}`);
    },
    device_rx_filtered(parameters , columns){ 
        //the reason we do no stringify the columns is becasue when it arrives at the server
        //it is already converted to commar seperated format
        parameters = JSON.stringify(parameters); 
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get(`/devices/uplink/parameters/${parameters}/columns/${columns}`);
    },
    get_device_data_initial(){
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get(`/devices/uplink/initial`);
    },
    get_device_data_initial_self() {
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get(`/devices/uplink/initial/self`);
    }, 

    //Error Logs
    get_error_logs(){
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get(`/error_logs`);
    }
};  