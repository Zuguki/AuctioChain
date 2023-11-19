import axios, {AxiosInstance} from "axios";

const $api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5121/accounts',
    withCredentials: true
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

export {$api};