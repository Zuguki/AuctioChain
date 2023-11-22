import {makeAutoObservable} from "mobx";
import AuthService from "./AuthService.ts";
import {AxiosError} from "axios";
import Cookies from 'js-cookie';
import IUser from "./IUser.ts";
import PostLoginUser from "./postAuth/PostLoginUser.ts";
import convertTokenToUser from "../tokenLogic/convertTokenToUser.ts";
import PostRegistrationUser from "./postAuth/PostRegistrationUser.ts";

export default class Store {
    private isAuth: boolean = false;
    private user: IUser = {} as IUser;
    private isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    getAuth(): boolean {
        return this.isAuth;
    }

    getUser(): IUser {
        return this.user;
    }

    getLoading(): boolean {
        return this.isLoading;
    }

    setAuth(status: boolean): void {
        this.isAuth = status;
    }

    setLoading(status: boolean): void {
        this.isLoading = status;
    }

    setUser(user: IUser): void {
        this.user = user;
    }

    async login(loginData: PostLoginUser): Promise<AxiosError | null> {
        let errorLogin = null;
        this.setLoading(true);
        try {
            const res = await AuthService.login(loginData);
            const {token, refreshToken} = res.data;
            this.setAuth(true);
            this.setUser(convertTokenToUser(token));
            Cookies.set('token', token);
            Cookies.set('refresh', refreshToken);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                errorLogin = error;
            }
        } finally {
            this.setLoading(false);
        }
        return errorLogin;
    }

    async registration(registrationData: PostRegistrationUser): Promise<AxiosError | null> {
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

    logout(): void {
        Cookies.remove('token');
        Cookies.remove('refresh');
        this.user = {} as IUser;
        this.setAuth(false);
    }

    setAuthByToken(token: string): void {
        this.setUser(convertTokenToUser(token));
        this.setAuth(true);
    }
}