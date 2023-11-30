import { makeAutoObservable } from 'mobx';
import AuthService from '../API/service/AuthService.ts';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import IUser from '../API/interfaces/IUser.ts';
import PostLoginUser from '../API/interfaces/PostLoginUser.ts';
import PostRegistrationUser from '../API/interfaces/PostRegistrationUser.ts';
import TokenLogic from '../auxiliaryTools/tokenLogic/tokenLogic.ts';

export default class UserStore {
    private isAuth: boolean = false;
    private user: IUser = {} as IUser;

    constructor() {
        makeAutoObservable(this);
    }

    public getAuth(): boolean {
        return this.isAuth;
    }

    public getUser(): IUser {
        return this.user;
    }

    private setAuth(status: boolean): void {
        this.isAuth = status;
    }

    private setUser(user: IUser): void {
        this.user = user;
    }

    public async login(loginData: PostLoginUser): Promise<AxiosResponse> {
        const res = await AuthService.login(loginData);
        const { token, refreshToken } = res.data;
        this.setAuth(true);
        this.setUser(TokenLogic.convertTokenToUser(token));
        Cookies.set(TokenLogic.TOKEN, token);
        Cookies.set(TokenLogic.REFRESH_TOKEN, refreshToken);
        console.log(this.user.userId);
        return res;
    }

    public async registration(
        registrationData: PostRegistrationUser,
    ): Promise<AxiosResponse> {
        const res: AxiosResponse =
            await AuthService.registration(registrationData);
        const loginData: PostLoginUser = {
            login: registrationData.email,
            password: registrationData.password,
        };
        await this.login(loginData);
        return res;
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
