import { makeAutoObservable } from 'mobx';

export default class StateApp {
    private search: boolean = false;
    private interfaceProfile: boolean = false;
    private processAddMoney: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    public getProcessAddMoney(): boolean {
        return this.processAddMoney;
    }

    public setProcessAddMoney(processAddMoney: boolean): void {
        this.processAddMoney = processAddMoney;
    }

    public getSearch(): boolean {
        return this.search;
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
