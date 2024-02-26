import { makeAutoObservable } from "mobx";
import AuthService from "../API/service/AuthService.ts";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import IUser from "../API/interfaces/IUser.ts";
import IPostLoginUser from "../API/interfaces/request/IPostLoginUser.ts";
import IPostRegistrationUser from "../API/interfaces/request/IPostRegistrationUser.ts";
import TokenLogic from "../appLogic/tokenLogic/TokenLogic.ts";
import LocalStorageLogic from "../appLogic/localStorageLogic/LocalStorageLogic.ts";
import { stateApp } from "./context.ts";

export default class UserStore {
    private isAuth: boolean = false;
    private user: IUser = {} as IUser;
    private bill: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    public getBill(): string {
        return this.bill;
    }

    public setBill(bill: string): void {
        this.bill = bill;
        LocalStorageLogic.setToStorage<string>(LocalStorageLogic.BILL, bill);
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
        this.setUser(TokenLogic.convertTokenToUser(token));
        Cookies.set(TokenLogic.TOKEN, token);
        Cookies.set(TokenLogic.REFRESH_TOKEN, refreshToken);
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
        Cookies.remove(TokenLogic.TOKEN);
        Cookies.remove(TokenLogic.REFRESH_TOKEN);
        LocalStorageLogic.removeAllPropsStorage();
        this.deleteAllPropsUser();
        stateApp.logoutUser();
    }

    public setAuthByToken(token: string): void {
        this.setUser(TokenLogic.convertTokenToUser(token));
        this.setAuth(true);
    }

    private setAuth(status: boolean): void {
        this.isAuth = status;
    }

    private setUser(user: IUser): void {
        this.user = user;
    }

    private deleteAllPropsUser(): void {
        this.setBill("");
        this.user = {} as IUser;
        this.setAuth(false);
    }
}
