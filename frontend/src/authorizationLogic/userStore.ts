import {makeAutoObservable} from "mobx";
import AuthService from "./AuthService.ts";
import {AxiosError} from "axios";
import Cookies from 'js-cookie';
import IUser from "./IUser.ts";
import PostLoginUser from "./postAuth/PostLoginUser.ts";
import convertTokenToUser from "../tokenLogic/convertTokenToUser.ts";
import PostRegistrationUser from "./postAuth/PostRegistrationUser.ts";
import TokenLogic from "../tokenLogic/tokenLogic.ts";

export default class UserStore {
    private isAuth: boolean = false;
    private user: IUser = {} as IUser;
    private isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    public getAuth(): boolean {
        return this.isAuth;
    }

    public getUser(): IUser {
        return this.user;
    }

    public getLoading(): boolean {
        return this.isLoading;
    }

    private setAuth(status: boolean): void {
        this.isAuth = status;
    }

    private setLoading(status: boolean): void {
        this.isLoading = status;
    }

    private setUser(user: IUser): void {
        this.user = user;
    }

    public async login(loginData: PostLoginUser): Promise<AxiosError | null> {
        let errorLogin = null;
        this.setLoading(true);
        try {
            const res = await AuthService.login(loginData);
            const {token, refreshToken} = res.data;
            this.setAuth(true);
            this.setUser(TokenLogic.convertTokenToUser(token));
            Cookies.set(TokenLogic.TOKEN, token);
            Cookies.set(TokenLogic.REFRESH_TOKEN, refreshToken);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                errorLogin = error;
            }
        } finally {
            this.setLoading(false);
        }
        return errorLogin;
    }

    public async registration(registrationData: PostRegistrationUser): Promise<AxiosError | null> {
        let errorRegistration = null;
        this.setLoading(true);
        try {
            await AuthService.registration(registrationData);
            const loginData: PostLoginUser = {
                login: registrationData.email,
                password: registrationData.password
            };
            await this.login(loginData);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                errorRegistration = error;
            }
        } finally {
            this.setLoading(false);
        }
        return errorRegistration;
    }

    public logout(): void {
        Cookies.remove(TokenLogic.TOKEN);
        Cookies.remove(TokenLogic.REFRESH_TOKEN);
        this.user = {} as IUser;
        this.setAuth(false);
    }

    public setAuthByToken(token: string): void {
        this.setUser(TokenLogic.convertTokenToUser(token));
        this.setAuth(true);
    }
}