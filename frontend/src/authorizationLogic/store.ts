import {IUser, PostLoginUser, PostRegistrationUser} from "./IUser.ts";
import {makeAutoObservable} from "mobx";
import AuthService from "./AuthService.ts";
import {AxiosError} from "axios";

interface IUserLogic {
    isAuth: boolean,
    user: IUser
}
export default class Store {


    isAuth = false;
    user = {} as IUser

    constructor() {
        makeAutoObservable(this);
    }

   /* getUserLogic(): IUserLogic {
        return this.userLogic;
    }
*/
    getAuth(): boolean {
        return this.isAuth;
    }
    getUser(): IUser {
        return this.user;
    }
    setAuth(status: boolean): void {
        this.isAuth = status;
    }

    setUser(user: IUser): void {
        this.user = user;
    }

    async login(loginData: PostLoginUser) {
        let err = null;
        try {
            const res = await AuthService.login(loginData);
            console.log(res.data)
            const {user, token} = res.data;
            this.setUser(user);
            this.setAuth(true);
            localStorage.setItem('token', token);
        } catch (error: AxiosError) {
            err = error;
        }
        return err;
    }

    async registration(registrationData: PostRegistrationUser) {
        let err = null;
        try {
            const res = await AuthService.registration(registrationData);
            const {user, token} = res.data;
            this.setUser(user);
            this.setAuth(true);
            localStorage.setItem('token', token);
        } catch (error: AxiosError) {
            err = error;
        }
        return err;
    }
}