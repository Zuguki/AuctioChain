import { useContext, useEffect, useMemo } from 'react';
import { Context } from '../../context/context.ts';
import ILogicFormDivButton from '../../components/UI/div/FormDiv/logicFormDivButton.ts';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import usePostAPI from './usePostAPI.ts';
import { AxiosResponse } from 'axios';
import PathApp from '../../routes/pathApp/PathApp.ts';
import INotification from '../../auxiliaryTools/notificationLogic/INotification.ts';

const useAuthResponse = (
    postResponse: () => Promise<AxiosResponse>,
    textButton: string,
    isAuth: boolean,
    notification: INotification | null = null,
) => {
    const { userStore, stateApp } = useContext(Context);
    const nav: NavigateFunction = useNavigate();
    const location = useLocation();
    const { error, loading, blurError, postData } = usePostAPI();
    const authUser: boolean = userStore.getAuth();
    const fromPath: string = useMemo((): string => {
        const path: string | undefined = location?.state?.from?.pathname;
        if (path && path !== PathApp.auctions) {
            return path;
        }
        return PathApp.auctions;
    }, []);
    const startAuth: boolean = useMemo(() => isAuth, []);
    const logicButton: ILogicFormDivButton = useMemo(
        (): ILogicFormDivButton => ({
            textButton: textButton,
            logicClick: async (): Promise<void> =>
                (await postData(postResponse)) as undefined,
        }),
        [textButton, postResponse],
    );

    useEffect((): void => {
        if (!authUser) {
            return;
        }
        nav(fromPath);
        if (!startAuth) {
            stateApp.setNotification(notification);
        }
    }, [userStore.getAuth()]);

    return { error, logicButton, blurError, loading };
};

export default useAuthResponse;
