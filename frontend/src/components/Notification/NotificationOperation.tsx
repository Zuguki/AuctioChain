import { FC, memo, ReactNode, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import INotification from "../../appLogic/notificationLogic/INotification.ts";
import ComponentNotification from "./ComponentNotification.tsx";
import { Context } from "@/context/context.ts";

const NotificationOperation: FC = memo(
    observer(() => {
        const [notificationWindow, setNotificationWindow] =
            useState<ReactNode>(null);
        const { stateApp } = useContext(Context);
        const notification: INotification | null = stateApp.getNotification();
        const removeNotification = (): void => {
            setNotificationWindow((): null => null);
            stateApp.setNotification(null);
        };

        useEffect(() => {
            if (notification === null) {
                setNotificationWindow((): null => null);
                return;
            }
            const { title, text, timeLife, loading } = notification;
            let timer: NodeJS.Timeout;
            ((): void => {
                setNotificationWindow(() => (
                    <ComponentNotification
                        title={title}
                        text={text}
                        loading={loading}
                    />
                ));
                timer = setTimeout(removeNotification, timeLife);
            })();
            return () => clearTimeout(timer);
        }, [notification]);
        return <>{notificationWindow}</>;
    }),
);

export default NotificationOperation;
