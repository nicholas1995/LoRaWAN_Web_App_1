// This will be used for setting up a connector which will be used to communicate with the back end

import axios from 'axios';

const instance = axios.create({
    baseURL: `http://localhost:3000/`
});
export default instance;