import { makeAutoObservable } from 'mobx';
import AuthService from '../API/service/AuthService.ts';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import IUser from '../API/interfaces/IUser.ts';
import IPostLoginUser from '../API/interfaces/IPostLoginUser.ts';
import IPostRegistrationUser from '../API/interfaces/IPostRegistrationUser.ts';
import CookiesLogic from '../auxiliaryTools/tokenLogic/cookiesLogic.ts';

export default class UserStore {
    private isAuth: boolean = false;
    private user: IUser = {} as IUser;
    private bill: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    public getBill(): string {
        return this.bill;
    }

    public setBill(bill: string): void {
        this.bill = bill;
    }

    public getAuth(): boolean {
        return this.isAuth;
    }

    public getUser(): IUser {
        return this.user;
    }

    public async login(loginData: IPostLoginUser): Promise<AxiosResponse> {
        const res = await AuthService.login(loginData);
        const { token, refreshToken } = res.data;
        this.setAuth(true);
        this.setUser(CookiesLogic.convertTokenToUser(token));
        Cookies.set(CookiesLogic.TOKEN, token);
        Cookies.set(CookiesLogic.REFRESH_TOKEN, refreshToken);
        return res;
    }

    public async registration(
        registrationData: IPostRegistrationUser,
    ): Promise<AxiosResponse> {
        const res: AxiosResponse =
            await AuthService.registration(registrationData);
        const loginData: IPostLoginUser = {
            login: registrationData.email,
            password: registrationData.password,
        };
        await this.login(loginData);
        return res;
    }

    public logout(): void {
        Cookies.remove(CookiesLogic.TOKEN);
        Cookies.remove(CookiesLogic.REFRESH_TOKEN);
        Cookies.remove(CookiesLogic.BILL);
        Cookies.remove(CookiesLogic.BALANCE);
        this.user = {} as IUser;
        this.setAuth(false);
    }

    public setAuthByToken(token: string): void {
        this.setUser(CookiesLogic.convertTokenToUser(token));
        this.setAuth(true);
    }

    private setAuth(status: boolean): void {
        this.isAuth = status;
    }

    private setUser(user: IUser): void {
        this.user = user;
    }
}
