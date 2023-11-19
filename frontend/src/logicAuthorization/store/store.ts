import {makeAutoObservable} from "mobx";
import AuthService from "../service/AuthServise.ts";

export default class Store {
    user = {};
    isAuth: boolean = false;
    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    async login(userDataLogin: string, password: string) {
        try {
            const res = await AuthService.login(userDataLogin, password);
            console.log(res)
            localStorage.setItem('token', res.data.token)
            this.setAuth(true);
            this.setUser({log: 'yes'})
            console.log(this.user)
        } catch (e) {
            console.log("error", e)
        }
    }

    async registration(userDataLogin: string, password: string) {
        try {
            const res = await AuthService.registration(userDataLogin, password);
            console.log(res)
            localStorage.setItem('token', res.data.token)
            this.setAuth(true);
            this.setUser({log: 'yes'})
        } catch (e) {
            console.log("error", e)
        }
    }

    async logout() {
        try {
            localStorage.removeItem('token')
            this.setAuth(false);
            this.setUser({})
        } catch (e) {
            console.log("error", e)
        }
    }

    async checkAuth() {
        // /refresh

    }
}