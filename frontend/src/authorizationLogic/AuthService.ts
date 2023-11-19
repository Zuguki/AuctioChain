import {IUser, PostLoginUser, PostRegistrationUser} from "./IUser.ts";
import {$api} from "../logicAuthorization/http";
import {AxiosResponse} from "axios";

interface AuthResponse {
    token: string,
    refreshToken: string;
    user: IUser
}

export default class AuthService {
    static async login(dataLogin: PostLoginUser): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', dataLogin);
    }

    static async registration(dataLogin: PostRegistrationUser): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/register', dataLogin);
    }
}