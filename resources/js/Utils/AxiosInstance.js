import axios from 'axios';

export const axiosInstance = axios.create({
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    responseType: 'json'
});

export default axiosInstance;
