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
        return Api.post('register', credentials); 
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
    delete_user(credentials){
        Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
        return Api.post('/user/delete', credentials);
    }
};  