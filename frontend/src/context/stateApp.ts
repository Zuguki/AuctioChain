import { makeAutoObservable } from "mobx";
import IParamsAuctions, {
    baseParamsAuctions,
} from "../interfaces/IParamsAuctions.ts";
import INotification from "../appLogic/notificationLogic/INotification.ts";

export default class StateApp {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true, deep: true });
    }

    private _search: boolean = false;

    public get search(): boolean {
        return this._search;
    }

    public set search(stateSearch: boolean) {
        this._search = stateSearch;
    }

    private _interfaceProfile: boolean = false;

    public get interfaceProfile(): boolean {
        return this._interfaceProfile;
    }

    public set interfaceProfile(stateInterface: boolean) {
        this._interfaceProfile = stateInterface;
    }

    private _notification: INotification | null = null;

    public get notification(): INotification | null {
        return this._notification;
    }

    public set notification(notification: INotification | null) {
        this._notification = notification;
    }

    private _paramsAuctions: IParamsAuctions = baseParamsAuctions;

    public get paramsAuctions(): IParamsAuctions {
        return this._paramsAuctions;
    }

    public set paramsAuctions(params: IParamsAuctions) {
        this._paramsAuctions = params;
    }

    public logoutUser(): void {
        this.interfaceProfile = false;
        this.notification = null;
    }
}
