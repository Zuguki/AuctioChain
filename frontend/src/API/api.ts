import axios, { AxiosError, AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import TokenLogic from '../auxiliaryTools/tokenLogic/tokenLogic.ts';
import AuthService from './service/AuthService.ts';
import { userStore } from '../context/contextUser.ts';

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
        const originalRequest = error.config;
        const refreshTokenStore: string | undefined = Cookies.get(
            TokenLogic.REFRESH_TOKEN,
        );
        if (
            error.response?.status === 401 &&
            refreshTokenStore &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            console.log('here');
            originalRequest._isRetry = true;
            const res = await AuthService.refresh(refreshTokenStore);
            const { token, refreshToken } = res.data;
            Cookies.set(TokenLogic.TOKEN, token);
            Cookies.set(TokenLogic.REFRESH_TOKEN, refreshToken);
            userStore.setAuthByToken(token);
            return $api.request(originalRequest);
        }

        if (error.response?.status === 401) {
            window.location.pathname = '/authorization';
        }
        throw error;
    },
);
const urlApi = (url: string): string => `${API_URL}${url}`;
const paramsPagination = (page: number, itemsPerPage: number) => ({
    Page: page,
    ItemsPerPage: itemsPerPage,
});

export default $api;
export { paramsPagination, urlApi };
