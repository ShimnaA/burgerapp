import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerreactapp-9ca5d.firebaseio.com/'
});

export default instance;