import React, { FC, ReactElement, useContext } from 'react';
import { Context } from '../context/context.ts';
import { Navigate, useLocation } from 'react-router-dom';

interface IRequireAuth {
    children: ReactElement;
}

const RequireAuth: FC<IRequireAuth> = ({ children }) => {
    const location = useLocation();
    const { userStore } = useContext(Context);

    if (!userStore.getAuth()) {
        return <Navigate to="/authorization" state={{ from: location }} />;
    }

    return children;
};

export default RequireAuth;
