import INotification from '../notificationLogic/INotification.ts';
import { NotificationTransaction } from '../notificationLogic/VarietesNotifications.ts';

export default class LocalStorageLogic {
    public static readonly BILL: string = 'bill';
    public static readonly PREV_BALANCE: string = 'prevBalance';
    public static readonly PROCESS_ADD_MONEY: string = 'processAddMoney';
    public static readonly NOTIFICATION: string = 'notification';

    public static setToStorage<T>(
        nameElement: string,
        elementStorage: T,
    ): void {
        if (elementStorage === null || elementStorage === undefined) {
            localStorage.removeItem(nameElement);
            return;
        }
        localStorage.setItem(nameElement, JSON.stringify(elementStorage));
    }

    public static getToStorage<T>(nameElement: string): T | null {
        const resultStorage: string | null = localStorage.getItem(nameElement);

        if (resultStorage !== null) {
            return JSON.parse(resultStorage);
        }
        return null;
    }

    public static setProcessAddMoney(value: boolean): void {
        LocalStorageLogic.setToStorage<boolean>(
            LocalStorageLogic.PROCESS_ADD_MONEY,
            value,
        );
    }

    public static startLoadingTransaction(prevBalance: number): void {
        LocalStorageLogic.setToStorage<number>(
            LocalStorageLogic.PREV_BALANCE,
            prevBalance,
        );
        LocalStorageLogic.setToStorage<INotification | null>(
            LocalStorageLogic.NOTIFICATION,
            NotificationTransaction,
        );
    }

    public static endLoadingTransaction(): void {
        LocalStorageLogic.setProcessAddMoney(false);
        localStorage.removeItem(LocalStorageLogic.NOTIFICATION);
    }

    public static removeAllPropsStorage(): void {
        localStorage.removeItem(LocalStorageLogic.BILL);
        localStorage.removeItem(LocalStorageLogic.PREV_BALANCE);
        localStorage.removeItem(LocalStorageLogic.PROCESS_ADD_MONEY);
        localStorage.removeItem(LocalStorageLogic.NOTIFICATION);
    }
}
