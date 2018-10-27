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
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.post('networks',data);
    },
    update_networks(payload){
        let data = { //to remove the id from the body so we do not need to change validate policy
            can_have_gateways: payload.can_have_gateways,
            name: payload.name,
            display_name: payload.display_name,
        }
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.put(`/networks/${payload.id}`,data);
    },
    delete_networks(network){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.delete(`/networks/${network.id}`);
    }
};  