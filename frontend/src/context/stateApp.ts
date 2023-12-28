import { makeAutoObservable } from 'mobx';

export default class StateApp {
    private search: boolean = false;
    private interfaceProfile: boolean = false;
    private notification: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    public getSearch(): boolean {
        return this.search;
    }

    public getNotification(): boolean {
        return this.notification;
    }

    public setNotification(notification: boolean): void {
        this.notification = notification;
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
