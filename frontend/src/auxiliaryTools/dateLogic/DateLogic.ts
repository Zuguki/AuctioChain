export default class DateLogic {
    public static getDateNowISO(): string {
        return new Date(
            new Date().toString().split('GMT')[0] + ' UTC',
        ).toISOString();
    }

    public static getDateByStringISO(date: string): string {
        return new Date(
            new Date(date).toString().split('GMT')[0] + ' UTC',
        ).toISOString();
    }
}
