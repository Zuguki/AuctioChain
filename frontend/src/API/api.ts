import axios, { AxiosError, AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import TokenLogic from '../auxiliaryTools/tokenLogic/tokenLogic.ts';

const BASE_URL: string = 'http://localhost:5121/';
const API_URL: string = 'api/v1/';

const $api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

$api.interceptors.request.use(config => {
    const token = Cookies.get(TokenLogic.TOKEN);
    if (typeof token === 'string') {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

$api.interceptors.response.use(
    config => {
        return config;
    },
    async (error: AxiosError) => {
        console.log(error.status);
        throw error;
    },
);
const urlApi = (url: string): string => `${API_URL}${url}`;
const paramsPagination = (page: number, itemsPerPage: number) => ({
    params: {
        Page: page,
        ItemsPerPage: itemsPerPage,
    },
});

export default $api;
export { paramsPagination, urlApi };
