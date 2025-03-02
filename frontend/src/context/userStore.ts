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
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true, deep: true });
    }

    private _isAuth: boolean = false;

    public get isAuth(): boolean {
        return this._isAuth;
    }

    private set isAuth(state: boolean) {
        this._isAuth = state;
    }

    private _user: IUser = {} as IUser;

    public get user(): IUser {
        return this._user;
    }

    private set user(user: IUser) {
        this._user = user;
    }

    private _bill: string = "";

    public get bill(): string {
        return this._bill;
    }

    public set bill(bill: string) {
        this._bill = bill;
        LocalStorageLogic.setToStorage<string>(LocalStorageLogic.BILL, bill);
    }

    public async login(loginData: IPostLoginUser): Promise<AxiosResponse> {
        const res = await AuthService.login(loginData);
        const { token, refreshToken } = res.data;

        this.isAuth = true;
        this.user = TokenLogic.convertTokenToUser(token);

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
        this.user = TokenLogic.convertTokenToUser(token);
        this.isAuth = true;
    }

    private deleteAllPropsUser(): void {
        this.bill = "";
        this._user = {} as IUser;
        this.isAuth = false;
    }
}
