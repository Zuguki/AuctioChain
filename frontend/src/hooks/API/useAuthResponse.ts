import { useContext, useEffect, useMemo } from "react";
import { Context } from "@/context/context.ts";
import ILogicFormDivButton from "../../components/UI/div/FormDiv/logicFormDivButton.ts";
import { NavigateFunction, useNavigate } from "react-router-dom";
import usePostAPI from "./usePostAPI.ts";
import { AxiosResponse } from "axios";
import PathApp from "../../routes/pathApp/PathApp.ts";
import INotification from "../../appLogic/notificationLogic/INotification.ts";
import usePathLocation from "../usePathLocation.ts";

const useAuthResponse = <T>(
    postResponse: (responseData: T) => Promise<AxiosResponse>,
    textButton: string,
    isAuth: boolean,
    dataUser: T,
    notification: INotification | null = null,
) => {
    const { userStore, stateApp } = useContext(Context);
    const nav: NavigateFunction = useNavigate();
    const { error, isPending, blurError, postData } = usePostAPI<T>(
        (responseData: T) => postResponse(responseData),
    );

    const authUser: boolean = userStore.getAuth();
    const { fromPath } = usePathLocation(PathApp.auctions);
    const startAuth: boolean = useMemo(() => isAuth, []);

    const logicButton: ILogicFormDivButton = useMemo(
        (): ILogicFormDivButton => ({
            textButton: textButton,
            logicClick: (): Promise<AxiosResponse> => postData(dataUser),
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
    }, [authUser]);

    return { error, logicButton, blurError, loading: isPending };
};

export default useAuthResponse;
