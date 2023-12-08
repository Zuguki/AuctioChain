import $api from '../api.ts';
import { AxiosResponse } from 'axios';
import PostLoginUser from '../interfaces/PostLoginUser.ts';
import PostRegistrationUser from '../interfaces/PostRegistrationUser.ts';

interface AuthResponse {
    token: string;
    refreshToken: string;
}

export default class AuthService {
    private static readonly pathAccount: string = '/accounts';

    static async login(
        dataLogin: PostLoginUser,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`${this.pathAccount}/login`, dataLogin);
    }

    static async registration(
        dataLogin: PostRegistrationUser,
    ): Promise<AxiosResponse> {
        return $api.post<AxiosResponse>(
            `${this.pathAccount}/register`,
            dataLogin,
        );
    }

    static async refresh(
        refreshToken: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`${this.pathAccount}/refresh`, {
            refreshToken: refreshToken,
        });
    }
}
