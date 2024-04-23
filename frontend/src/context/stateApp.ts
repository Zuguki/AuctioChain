import { makeAutoObservable } from "mobx";
import IParamsAuctions, {
    baseParamsAuctions,
} from "../interfaces/IParamsAuctions.ts";
import INotification from "../appLogic/notificationLogic/INotification.ts";

export default class StateApp {
    private search: boolean = false;
    private interfaceProfile: boolean = false;
    private notification: INotification | null = null;
    private paramsAuctions: IParamsAuctions = baseParamsAuctions;

    constructor() {
        makeAutoObservable(this);
    }

    public logoutUser(): void {
        this.setInterfaceProfile(false);
        this.setNotification(null);
    }

    public getSearch(): boolean {
        return this.search;
    }

    public getParamsAuctions(): IParamsAuctions {
        return this.paramsAuctions;
    }

    public getNotification(): INotification | null {
        return this.notification;
    }

    public setNotification(notification: INotification | null): void {
        this.notification = notification;
    }

    public setParamsAuctions(params: IParamsAuctions): void {
        this.paramsAuctions = params;
    }

    public getInterfaceProfile(): boolean {
        return this.interfaceProfile;
    }

    public setSearch(stateSearch: boolean): void {
        this.search = stateSearch;
    }

    public setInterfaceProfile(stateInterface: boolean): void {
        this.interfaceProfile = stateInterface;
    }
}
