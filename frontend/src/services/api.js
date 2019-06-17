import axios from 'axios';

const api = axios.create({
	baseURL: 'http://10.80.18.17:3333'
});

export default api;
