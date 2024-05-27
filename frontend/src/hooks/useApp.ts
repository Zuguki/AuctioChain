import { useContext, useEffect } from "react";
import { Context } from "@/context/context.ts";
import LocalStorageLogic from "@/appLogic/localStorageLogic/LocalStorageLogic.ts";
import Cookies from "js-cookie";
import TokenLogic from "@/appLogic/tokenLogic/TokenLogic.ts";
import INotification from "@/appLogic/notificationLogic/INotification.ts";
import MetaMaskLogic from "@/appLogic/metamask/MetaMaskLogic.ts";
import { NotificationAddMoney } from "@/appLogic/notificationLogic/VarietesNotifications.ts";
import AOS from "aos";

export const useApp = () => {
    const { userStore, stateApp } = useContext(Context);
    useEffect((): void => {
        AOS.init({
            duration: 1000,
        });
        AOS.refresh();
        (async (): Promise<void> => {
            const process: boolean | null =
                LocalStorageLogic.getToStorage<boolean>(
                    LocalStorageLogic.PROCESS_ADD_MONEY,
                ) === true;
            const token: string | undefined = Cookies.get(TokenLogic.TOKEN);
            const bill: string | null = LocalStorageLogic.getToStorage<string>(
                LocalStorageLogic.BILL,
            );

            if (token != null) {
                userStore.setAuthByToken(token);
            }

            if (bill) {
                userStore.bill = bill;
            }

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
            stateApp.notification = notification;
            const balance: number = await MetaMaskLogic.getUserMoney();
            LocalStorageLogic.endLoadingTransaction();
            stateApp.notification = NotificationAddMoney(balance);
        }
    };
};
