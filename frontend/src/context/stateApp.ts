import { makeAutoObservable } from 'mobx';

export default class StateApp {
    private search: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
    public getSearch(): boolean {
        return this.search;
    }

    public setSearch(stateSearch: boolean): void {
        this.search = stateSearch;
    }
}
