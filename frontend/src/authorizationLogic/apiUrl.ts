import axios, {AxiosInstance} from "axios";

const $apiAuth: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5121/accounts/',
    withCredentials: true
});

$apiAuth.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})