export default class LocalStorageLogic {
    public static readonly BILL: string = 'bill';
    public static readonly BALANCE: string = 'balance';
    public static readonly ADD_BALANCE: string = 'addBalance';
    public static readonly PROCESS_ADD_MONEY: string = 'processAddMoney';

    public static setToStorage = (
        nameElement: string,
        elementStorage: unknown,
    ): void => {
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
    };

    public static getToStorage = (nameElement: string): string => {
        const resultStorage: string | null = localStorage.getItem(nameElement);

        if (resultStorage !== null) {
            return JSON.parse(resultStorage);
        }
        return '';
    };
}
