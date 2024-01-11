import { makeAutoObservable } from 'mobx';
import IParamsAuctions, {
    BaseParamsAuctions,
} from '../interfaces/IParamsAuctions.ts';

export default class StateApp {
    private search: boolean = false;
    private interfaceProfile: boolean = false;
    private notification: boolean = false;
    private paramsAuctions: IParamsAuctions = BaseParamsAuctions;

    constructor() {
        makeAutoObservable(this);
    }

    public getSearch(): boolean {
        return this.search;
    }

    public getParamsAuctions(): IParamsAuctions {
        return this.paramsAuctions;
    }

    public getNotification(): boolean {
        return this.notification;
    }

    public setNotification(notification: boolean): void {
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
