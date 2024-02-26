import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import TokenLogic from "../appLogic/tokenLogic/TokenLogic.ts";
import AuthService from "./service/AuthService.ts";
import { userStore } from "../context/context.ts";
import PathApp from "../routes/pathApp/PathApp.ts";

const BASE_URL: string =
    import.meta.env.API_URL ?? "http://localhost:5121/api/v1/";

type ErrorConfig =
    | (InternalAxiosRequestConfig & { _isRetry?: boolean })
    | undefined;

const $api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

$api.interceptors.request.use((config) => {
    const token = Cookies.get(TokenLogic.TOKEN);
    if (typeof token === "string") {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

$api.interceptors.response.use(
    (config: AxiosResponse) => {
        return config;
    },
    async (error: AxiosError) => {
        const originalRequest: ErrorConfig = error.config;
        const refreshTokenStore: string | undefined = Cookies.get(
            TokenLogic.REFRESH_TOKEN,
        );
        if (
            error.response?.status === 401 &&
            refreshTokenStore &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest._isRetry = true;
            const res = await AuthService.refresh(refreshTokenStore);
            const { token, refreshToken } = res.data;

            Cookies.set(TokenLogic.TOKEN, token);
            Cookies.set(TokenLogic.REFRESH_TOKEN, refreshToken);

            userStore.setAuthByToken(token);
            return $api.request(originalRequest);
        }

        if (error.response?.status === 401) {
            window.location.pathname = PathApp.authorization;
        }

        throw error;
    },
);

const paramsPagination = (
    page: number,
    itemsPerPage: number,
): Record<PropertyKey, unknown> => ({
    Page: page,
    ItemsPerPage: itemsPerPage,
});

export default $api;
export { paramsPagination };
