import { useContext, useEffect, useMemo } from 'react';
import { Context } from '../../context/context.ts';
import ILogicFormDivButton from '../../components/UI/div/FormDiv/logicFormDivButton.ts';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import usePostAPI from './usePostAPI.ts';
import { AxiosResponse } from 'axios';
import PathApp from '../../routes/pathApp/PathApp.ts';

const useAuthResponse = (
    postResponse: () => Promise<AxiosResponse>,
    textButton: string,
) => {
    const { userStore } = useContext(Context);
    const nav: NavigateFunction = useNavigate();
    const location = useLocation();
    const { error, loading, blurError, postData } = usePostAPI();
    const fromPath: string = useMemo((): string => {
        const path: string | undefined = location?.state?.from?.pathname;
        if (path && path !== PathApp.auctions) {
            return path;
        }
        return PathApp.auctions;
    }, []);
    const logicButton: ILogicFormDivButton = {
        textButton: textButton,
        logicClick: async (): Promise<void> =>
            (await postData(postResponse)) as undefined,
    };

    useEffect((): void => {
        if (userStore.getAuth()) {
            nav(fromPath);
        }
    }, [userStore.getAuth()]);

    return { error, logicButton, blurError, loading };
};

export default useAuthResponse;
