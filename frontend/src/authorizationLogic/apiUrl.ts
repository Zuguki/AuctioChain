import axios, {AxiosInstance} from "axios";
import Cookies from "js-cookie";
import TokenLogic from "../tokenLogic/tokenLogic.ts";

const BASE_URL: string = 'http://localhost:5121/';

const $api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${Cookies.get(TokenLogic.TOKEN)}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, error => {
    throw error;
});

export default $api;