import { useContext, useEffect } from 'react';
import { Context } from '../context/context.ts';
import MetaMaskLogic from '../metamask/MetaMaskLogic.ts';
import LocalStorageLogic from '../auxiliaryTools/localStorageLogic/LocalStorageLogic.ts';
import Cookies from 'js-cookie';
import TokenLogic from '../auxiliaryTools/tokenLogic/TokenLogic.ts';

const useApp = (): void => {
    const { userStore, stateApp } = useContext(Context);
    useEffect((): void => {
        (async (): Promise<void> => {
            const process: boolean =
                LocalStorageLogic.getToStorage(
                    LocalStorageLogic.PROCESS_ADD_MONEY,
                ).toLowerCase() === 'true';
            const token: string | undefined = Cookies.get(TokenLogic.TOKEN);
            const bill: string = LocalStorageLogic.getToStorage(
                LocalStorageLogic.BILL,
            );
            token && userStore.setAuthByToken(token);
            bill && userStore.setBill(bill);
            processAddBalance(process);
        })();
    }, []);
    const processAddBalance = async (process: boolean): Promise<void> => {
        if (process) {
            stateApp.setNotification(true);
            const balance = await MetaMaskLogic.getUserMoney();
            LocalStorageLogic.setToStorage(
                LocalStorageLogic.PROCESS_ADD_MONEY,
                false,
            );
            stateApp.setNotification(false);
            if (balance) {
                LocalStorageLogic.setToStorage(
                    LocalStorageLogic.ADD_BALANCE,
                    balance,
                );
            }
        }
    };
};

export default useApp;
