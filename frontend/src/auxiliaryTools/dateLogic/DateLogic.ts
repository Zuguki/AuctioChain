import IObjDate from './IObjDate.tsx';
import MonthEnum from './MonthEnum.ts';

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

    public static getObjDateTOStringISO(date: string): IObjDate {
        const dateOdj = new Date(date);
        return {
            hours: dateOdj.getHours(),
            minutes: dateOdj.getMinutes(),
            seconds: dateOdj.getSeconds(),
            day: dateOdj.getDay(),
            month: dateOdj.getMonth(),
            year: dateOdj.getFullYear(),
        };
    }

    public static getBaseFormatDateTOStringISO(
        date: string,
        shortMonth: boolean = false,
    ): string {
        const newDate = this.getObjDateTOStringISO(date);
        Object.entries(newDate).forEach(([key, value]): void => {
            newDate[key] = value.toString();
            if (
                newDate[key].length !== 2 &&
                key !== 'year' &&
                key !== 'month'
            ) {
                newDate[key] = '0' + value;
            }
        });
        const month: string = shortMonth
            ? MonthEnum[newDate.month].substring(0, 3)
            : MonthEnum[newDate.month];
        return `${newDate.day} ${month} ${newDate.year}, ${newDate.hours}:${newDate.hours}:${newDate.minutes}`;
    }
}
