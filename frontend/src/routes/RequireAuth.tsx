import { FC, ReactElement, useContext } from "react";
import { Context } from "../context/context.ts";
import { Navigate, useLocation } from "react-router-dom";
import PathApp from "./pathApp/PathApp.ts";
import Cookies from "js-cookie";
import TokenLogic from "@/appLogic/tokenLogic/TokenLogic.ts";
import { observer } from "mobx-react-lite";

interface IRequireAuth {
    children: ReactElement;
}

const RequireAuth: FC<IRequireAuth> = observer(({ children }) => {
    const location = useLocation();

    const { userStore } = useContext(Context);

    Cookies.get(TokenLogic.TOKEN) &&
        !userStore.isAuth &&
        console.warn("Uncorrected MobX state isAuth", userStore.isAuth);

    if (!Cookies.get(TokenLogic.TOKEN)) {
        return (
            <Navigate to={PathApp.authorization} state={{ from: location }} />
        );
    }

    return children;
});

export default RequireAuth;
