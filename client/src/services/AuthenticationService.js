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
    delete_networks(network){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.delete(`/networks/${network.id}`);
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

    //Service Profile
    get_service_profile(network_id){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.get(`/service_profiles/${network_id}`);
    }

};  