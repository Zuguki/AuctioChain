import { TIME_ZONE as timeZone } from "@/auxiliaryTools/dateLogic/timeZone.ts";

export default class DateLogic {
    public static getDateNow(): string {
        return this.getDateNowISO().substring(0, 16);
    }

    public static getDatetimeLocal(date: string): string {
        return date.substring(0, 16);
    }

    public static getDateNowISO(): string {
        return new Date().toISOString();
    }

    public static getDateByStringISO(date: string): string {
        return new Date(date).toISOString();
    }

    public static getBaseFormatDateToStringISO(
        date: string,
        shortMonth: boolean = false,
    ): string {
        return new Intl.DateTimeFormat("ru", {
            year: "numeric",
            month: shortMonth ? "short" : "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZone,
        }).format(new Date(date));
    }
}
