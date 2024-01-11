import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Context } from '../../context/context.ts';
import { observer } from 'mobx-react-lite';
import LocalStorageLogic from '../../auxiliaryTools/localStorageLogic/LocalStorageLogic.ts';
import LogicCurrency from '../../metamask/LogicCurrency.ts';
import ComponentNotification from './ComponentNotification.tsx';

const NotificationOperation = observer(() => {
    const { stateApp } = useContext(Context);
    const [notificationWindow, setNotificationWindow] =
        useState<ReactNode>(null);
    const getNotification = stateApp.getNotification();
    const removeNotification = (): void => {
        localStorage.removeItem(LocalStorageLogic.PREV_BALANCE);
        localStorage.removeItem(LocalStorageLogic.PROCESS_ADD_MONEY);
        localStorage.removeItem(LocalStorageLogic.ADD_BALANCE);
        setNotificationWindow((): null => null);
    };
    useEffect(() => {
        if (getNotification) {
            setNotificationWindow(() => (
                <ComponentNotification
                    title="Транзакция обрабатывается!"
                    text="Дождитесь окончания операции."
                />
            ));
        }
        const balance: string = LocalStorageLogic.getToStorage(
            LocalStorageLogic.ADD_BALANCE,
        );
        let timer: NodeJS.Timeout;
        if (balance && notificationWindow !== null) {
            setNotificationWindow(() => (
                <ComponentNotification
                    title="Успешно!"
                    text={`Будет начислено: ${balance} ${LogicCurrency.Ac}`}
                    isEnd
                />
            ));
            timer = setTimeout(removeNotification, 5_000);
        }
        return () => clearTimeout(timer);
    }, [getNotification]);
    return <>{notificationWindow}</>;
});

export default NotificationOperation;
