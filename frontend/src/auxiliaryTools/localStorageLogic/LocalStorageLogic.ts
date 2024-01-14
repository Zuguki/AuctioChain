export default class LocalStorageLogic {
    public static readonly BILL: string = 'bill';
    public static readonly ADD_BALANCE: string = 'addBalance';
    public static readonly PREV_BALANCE: string = 'prevBalance';
    public static readonly PROCESS_ADD_MONEY: string = 'processAddMoney';

    public static setToStorage(
        nameElement: string,
        elementStorage: unknown,
    ): void {
        if (
            typeof elementStorage === 'number' ||
            typeof elementStorage === 'string' ||
            typeof elementStorage === 'boolean'
        ) {
            localStorage.setItem(
                nameElement,
                JSON.stringify(String(elementStorage)),
            );
        }
    }

    public static getToStorage(nameElement: string): string {
        const resultStorage: string | null = localStorage.getItem(nameElement);

        if (resultStorage !== null) {
            return JSON.parse(resultStorage);
        }
        return '';
    }

    public static removeAllPropsStorage(): void {
        localStorage.removeItem(LocalStorageLogic.BILL);
        localStorage.removeItem(LocalStorageLogic.PREV_BALANCE);
        localStorage.removeItem(LocalStorageLogic.ADD_BALANCE);
        localStorage.removeItem(LocalStorageLogic.PROCESS_ADD_MONEY);
    }
}
