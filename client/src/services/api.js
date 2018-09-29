// This will be used for setting up a connector which will be used to communicate with the back end

import axios from 'axios';

export default (()=> {
    return axios.create({
        baseURL: `http://localhost:3000`
    });
});