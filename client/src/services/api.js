// This will be used for setting up a connector which will be used to communicate with the back end

import axios from 'axios';
//the problem was that if i inserted the add header line inside of here, it would never update because this is a const. In order to 
//dynamically set the header we would need to implement Api.defaults.headers.common['Authorization'] = `bearer ${store.state.token}`;
//where ever we want to put the header 
const instance = axios.create({
  baseURL: `https://nicholas-mitchell-app-1000.herokuapp.com/`,
});
export default instance;  