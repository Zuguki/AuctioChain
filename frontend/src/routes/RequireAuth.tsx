import { FC, ReactElement, useContext } from "react";
import { Context } from "../context/context.ts";
import { Navigate, useLocation } from "react-router-dom";
import PathApp from "./pathApp/PathApp.ts";
import { observer } from "mobx-react-lite";
import Cookies from "js-cookie";
import TokenLogic from "@/appLogic/tokenLogic/TokenLogic.ts";

interface IRequireAuth {
    children: ReactElement;
}

const RequireAuth: FC<IRequireAuth> = observer(({ children }) => {
    const location = useLocation();
    const { userStore } = useContext(Context);

    console.log("authAAAA", userStore.isAuth, userStore.user.userId);

    if (!Cookies.get(TokenLogic.TOKEN)) {
        return (
            <Navigate to={PathApp.authorization} state={{ from: location }} />
        );
    }

    return children;
});

export default RequireAuth;
