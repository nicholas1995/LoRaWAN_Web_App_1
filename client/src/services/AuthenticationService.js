import Api from './api';

export default {
    //A funtion that hits a post to localhost:3000/register. It passes the credentials to the server
    register(credentials){
        console.log(credentials);
        return Api().post('register', credentials); 
    }
};