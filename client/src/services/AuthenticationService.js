import axios from 'axios';
import store from '../store/store';
import Api from './api';

var instance = axios.create({
    baseURL: 'http://localhost:3000/'
  }); 



export default {
    //A funtion that hits a post to localhost:3000/register. It passes the credentials to the server
    register(credentials){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.post('users', credentials); 
    },
    delete_user(credentials){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.delete('users', {data: credentials});
    },
    update_user(credentials){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.put('users', credentials);
    },
    login(credentials){
        return Api.post('login', credentials); 
    },
    loginNewUser(credentials){
        return Api.post('login/newuser', credentials); 
    },
    get_users(){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get('users');
    },
    get_profile_information(){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get('profile', );
    },

    //Networks
    get_networks(){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get('networks');
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

    //Devices
    get_devices() {
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get('/devices');
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
    }
};  