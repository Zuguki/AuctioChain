interface INotification {
    readonly title: string;
    readonly text: string;
    readonly timeLife: number;
    readonly loading: boolean;
}

export default INotification;
