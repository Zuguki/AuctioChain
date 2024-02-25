import React, { FC, ReactElement, useContext } from "react";
import { Context } from "../context/context.ts";
import { Navigate, useLocation } from "react-router-dom";
import PathApp from "./pathApp/PathApp.ts";

interface IRequireAuth {
    children: ReactElement;
}

const RequireAuth: FC<IRequireAuth> = ({ children }) => {
    const location = useLocation();
    const { userStore } = useContext(Context);

    if (!userStore.getAuth()) {
        return (
            <Navigate to={PathApp.authorization} state={{ from: location }} />
        );
    }

    return children;
};

export default RequireAuth;
