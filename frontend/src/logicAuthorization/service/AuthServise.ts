import {$api} from "../http";
import {AxiosResponse} from "axios";

interface AuthResponse {
    token: string,
    refreshToken: string;

}
export default class AuthService {
    static async login(userDataLogin: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', {login: userDataLogin, password})
    }

    static async registration(userDataLogin: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', {userDataLogin, password})
    }
}

