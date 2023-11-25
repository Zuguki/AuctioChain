import { useCallback, useContext, useEffect, useState } from 'react';
import { Context } from '../context/contextApp.ts';
import { AxiosError } from 'axios';
import ILogicFormDivButton from '../components/UI/div/FormDiv/logicFormDivButton.ts';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import PostLoginUser from '../authorizationLogic/postAuth/PostLoginUser.ts';
import PostRegistrationUser, {
    isPostRegistrationUser,
} from '../authorizationLogic/postAuth/PostRegistrationUser.ts';

const useAuthResponse = (
    dataUser: PostLoginUser | PostRegistrationUser,
    textButton: string,
) => {
    const { userStore } = useContext(Context);
    const [err, setErr] = useState<AxiosError | null>(null);
    const nav: NavigateFunction = useNavigate();
    const load: boolean = userStore.getLoading();
    const location = useLocation();

    const fromPath = location?.state?.from?.pathname || '/auctions';
    console.log(location, fromPath);
    const postUser = (): Promise<AxiosError | null> =>
        isPostRegistrationUser(dataUser)
            ? userStore.registration(dataUser)
            : userStore.login(dataUser);

    const logicButton: ILogicFormDivButton = {
        textButton: textButton,
        logicClick: (): void => {
            setErr((): null => null);
            postUser().then((err: AxiosError | null): void => {
                setErr((): AxiosError | null => err);
            });
        },
    };

    const blurErr = (): void => setErr((): null => null);

    const userAuth = (): void => {
        if (userStore.getAuth()) {
            nav(fromPath);
        }
    };

    return { err, logicButton, blurErr, load, userAuth };
};

export default useAuthResponse;
