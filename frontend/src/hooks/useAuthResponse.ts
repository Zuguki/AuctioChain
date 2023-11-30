import { useContext, useEffect } from 'react';
import { ContextUser } from '../context/contextUser.ts';
import ILogicFormDivButton from '../components/UI/div/FormDiv/logicFormDivButton.ts';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import usePostAPI from '../API/hooks/usePostAPI.ts';
import { AxiosResponse } from 'axios';

const useAuthResponse = (
    postResponse: () => Promise<AxiosResponse>,
    textButton: string,
) => {
    const { userStore } = useContext(ContextUser);
    const nav: NavigateFunction = useNavigate();
    const location = useLocation();
    const { error, loading, blurError, postData } = usePostAPI();
    const fromPath = location?.state?.from?.pathname || '/auctions';

    const logicButton: ILogicFormDivButton = {
        textButton: textButton,
        logicClick: async (): Promise<void> => await postData(postResponse),
    };

    useEffect((): void => {
        if (userStore.getAuth()) {
            nav(fromPath);
        }
    }, [userStore.getAuth()]);

    return { error, logicButton, blurError, loading };
};

export default useAuthResponse;
