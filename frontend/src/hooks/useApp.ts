import { useContext, useEffect } from 'react';
import { Context } from '../context/context.ts';
import MetaMaskLogic from '../appLogic/metamask/MetaMaskLogic.ts';
import LocalStorageLogic from '../appLogic/localStorageLogic/LocalStorageLogic.ts';
import Cookies from 'js-cookie';
import TokenLogic from '../appLogic/tokenLogic/TokenLogic.ts';
import INotification from '../appLogic/notificationLogic/INotification.ts';
import { NotificationAddMoney } from '../appLogic/notificationLogic/VarietesNotifications.ts';

const useApp = (): void => {
    const { userStore, stateApp } = useContext(Context);
    useEffect((): void => {
        (async (): Promise<void> => {
            const process: boolean | null =
                LocalStorageLogic.getToStorage<boolean>(
                    LocalStorageLogic.PROCESS_ADD_MONEY,
                ) === true;
            const token: string | undefined = Cookies.get(TokenLogic.TOKEN);
            const bill: string | null = LocalStorageLogic.getToStorage<string>(
                LocalStorageLogic.BILL,
            );
            token && userStore.setAuthByToken(token);
            bill && userStore.setBill(bill);
            processAddBalance(process);
        })();
    }, []);
    const processAddBalance = async (process: boolean): Promise<void> => {
        if (process) {
            const notification: INotification | null =
                LocalStorageLogic.getToStorage<INotification | null>(
                    LocalStorageLogic.NOTIFICATION,
                );
            if (!notification) {
                LocalStorageLogic.setProcessAddMoney(false);
                return;
            }
            stateApp.setNotification(notification);
            const balance: number = await MetaMaskLogic.getUserMoney();
            LocalStorageLogic.endLoadingTransaction();
            stateApp.setNotification(NotificationAddMoney(balance));
        }
    };
};

export default useApp;
