import {useCallback, useContext, useEffect, useState} from "react";
import {Context} from "../App.tsx";
import {AxiosError} from "axios";
import ILogicFormDivButton from "../components/UI/div/FormDiv/logicFormDivButton.ts";
import {useNavigate} from "react-router-dom";
import PostLoginUser from "../authorizationLogic/postAuth/PostLoginUser.ts";
import PostRegistrationUser, {isPostRegistrationUser} from "../authorizationLogic/postAuth/PostRegistrationUser.ts";

const useAuthResponse = (dataUser: PostLoginUser | PostRegistrationUser, textButton: string) => {
    const {store} = useContext(Context);
    const [err, setErr] = useState<string | null>(null);
    const nav = useNavigate();
    const load = store.getLoading();
    const postUser = (): Promise<AxiosError | null> => isPostRegistrationUser(dataUser)
        ? store.registration(dataUser)
        : store.login(dataUser);

    const logicButton: ILogicFormDivButton = {
        textButton: textButton,
        logicClick: (): void => {
            postUser()
                .then((err: (AxiosError | null)): void => {
                    const errName =  err?.message;
                    errName && setErr((): string | null => errName)
                   /* userAuth();*/
                });
        }
    };

    const blurErr = (): void => setErr((): null => null);

    /*const userAuth = (): void => {
        if (store.getAuth()) {
            nav('/auctions');
        }
    }*/

    return {err, logicButton, blurErr, load};
}

export default useAuthResponse;