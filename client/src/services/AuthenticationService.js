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
    create_networks(data){
        data = JSON.stringify(data);
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.post('networks',{data});
    },
    update_networks(data, id){
        data = JSON.stringify(data);
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.put(`/networks/${id}`,{data});
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
    get_sub_networks_db_given_network(network) {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/sub_networks/database/${network}`);
    },
    create_sub_networks(data){
        data = JSON.stringify(data);
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.post('/sub_networks',{data});
    },
    update_sub_networks(data, sub_network_id){
        data = JSON.stringify(data);
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.put(`/sub_networks/${sub_network_id}`, { data });
    },
    delete_sub_networks(sub_network_id){
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.delete(`/sub_networks/${sub_network_id}`);
    },

    //Vessels
    get_vessels(sub_network_id) {//This returns vessels that are not deleted.... set seub_net_id to null to leave it open ended
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/vessels/${sub_network_id}`);
    },
    get_vessels_db_given_sub_networks(sub_network_id) {//This returns deleted and not deleted vessels in the database under the specified subnet
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/vessels/all/${sub_network_id}`);
    },
    create_vessels(data) {
        data = JSON.stringify(data);
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.post("/vessels", { data });
    },
    update_vessels(data, vessel_id) {
        data = JSON.stringify(data);
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.put(`/vessels/${vessel_id}`, { data });
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
        return Api.get(`/device/${device_eui}`);
    },
    get_devices_db_given_vessels(vessels) {//This returns ALL the devices associated with the selected vessels from the database
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/device/database/${vessels}`);
    },
    create_devices(data) {
        data = JSON.stringify(data);
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.post('/devices', { data });
    },
    update_devices(data, device_eui) {
        data = JSON.stringify(data);
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.put(`/devices/${device_eui}`, { data });
    },
    delete_devices(device_eui) {
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.delete(`/devices/${device_eui}`);
    },


    //Gateways
    get_gateways(){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get('/gateways');
    },
    get_gateway(gateway_id) {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/gateway/${gateway_id}`);
    },
    create_gateways(data){
        data = JSON.stringify(data);
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.post('/gateways', { data });
    }, 
    update_gateways(data, gateway_id) {
        data = JSON.stringify(data);
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.put(`/gateways/${gateway_id}`, { data });
    },
    delete_gateways(gateway_id) {
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.delete(`/gateways/${gateway_id}`);
    },

    //Service Profile
    get_service_profile(network_id){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/service_profiles/${network_id}`);
    },


    //Device Profile
    get_device_profiles(sub_network_id) {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/device_profiles/${sub_network_id}`);
    },

    //Network servers
    get_network_servers(){
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get('/network_servers');
    },

    //Gateway profiles
    get_gateway_profiles(network_server_id){
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get(`/gateway_profiles/${network_server_id}`);
    },

    //Device uplink data
    device_rx_filtered(parameters , columns){ 
        parameters = JSON.stringify(parameters); 
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get(`/devices/rx/${parameters}/${columns}`);
    },
    get_device_data_initial(){
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get(`/devices/uplink/initial`);
    },
    get_device_data(pagination){
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get(`/devices/uplink/${pagination.sortBy}/${pagination.descending}`);
    },
    get_device_data_specific_heading(pagination, headers) {
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get(`/devices/uplink/headers/${pagination.sortBy}/${pagination.descending}/${headers}`);
    },
    get_device_data_specific_heading_specified_date(pagination, headers, start_date, end_date) {
        Api.defaults.headers.common["Authorization"] = `bearer ${store.state.token}`;
        return Api.get(`/devices/uplink/headers/date/${pagination.sortBy}/${pagination.descending}/${headers}/${start_date}/${end_date}`);
    },
};  