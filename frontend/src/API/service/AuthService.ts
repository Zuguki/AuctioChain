import $api from "../api.ts";
import { AxiosResponse } from "axios";
import IPostLoginUser from "../interfaces/request/IPostLoginUser.ts";
import IPostRegistrationUser from "../interfaces/request/IPostRegistrationUser.ts";
import IResponseRoles from "@/API/interfaces/response/IResponseRoles.ts";

interface AuthResponse {
    token: string;
    refreshToken: string;
}

class AuthService {
    private readonly pathAccount: string = "/accounts";

    public async login(
        dataLogin: IPostLoginUser,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`${this.pathAccount}/login`, dataLogin);
    }

    public async registration(
        dataLogin: IPostRegistrationUser,
    ): Promise<AxiosResponse> {
        return $api.post<AxiosResponse>(
            `${this.pathAccount}/register`,
            dataLogin,
        );
    }

    public async refresh(
        refreshToken: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`${this.pathAccount}/refresh`, {
            refreshToken: refreshToken,
        });
    }

    public async roles(): Promise<AxiosResponse<IResponseRoles>> {
        return $api.get(`${this.pathAccount}/roles`);
    }
}

export default new AuthService();
