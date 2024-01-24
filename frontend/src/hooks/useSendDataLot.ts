import { stateApp } from '../context/context.ts';
import { useNavigate } from 'react-router-dom';
import INotification from '../appLogic/notificationLogic/INotification.ts';
import { AxiosResponse } from 'axios';

const useSendDataLot = () => {
    const nav = useNavigate();
    const sendData = async (
        request: () => Promise<AxiosResponse | undefined>,
        notification: INotification,
        pathNav: string,
    ) => {
        const res = await request();
        if (res) {
            stateApp.setNotification(notification);
            nav(pathNav);
        }
    };

    return { sendData };
};

export default useSendDataLot;
