import Api from './api';

export default {
    //A funtion that hits a post to localhost:3000/register. It passes the credentials to the server
    register(credentials){
        return Api().post('register', credentials); 
    },
    login(credentials){
        return Api().post('login', credentials); 
    },
    loginNewUser(credentials){
        console.log(credentials);
        return Api().post('login/newuser', credentials); 
    }
};