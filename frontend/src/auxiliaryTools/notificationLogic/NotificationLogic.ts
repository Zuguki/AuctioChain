import INotification from './INotification.ts';

export default class NotificationLogic implements INotification {
    readonly title: string;
    readonly text: string;
    readonly timeLife: number;
    readonly loading: boolean;

    constructor(
        title: string,
        text: string,
        timeLife: number = 5_000,
        loading: boolean = false,
    ) {
        this.title = title;
        this.text = text;
        this.timeLife = timeLife;
        this.loading = loading;
    }
}
