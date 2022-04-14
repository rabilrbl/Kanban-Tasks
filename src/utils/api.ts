import axios from 'axios';

axios.defaults.withCredentials = true

const request = axios.create({
    baseURL: 'https://taskg.herokuapp.com/api',
    timeout: 9000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default request;
