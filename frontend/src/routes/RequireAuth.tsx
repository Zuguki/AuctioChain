import React, { useContext } from 'react';
import { Context } from '../context/context.ts';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const { userStore } = useContext(Context);

    if (!userStore.getAuth()) {
        return <Navigate to="/authorization" state={{ from: location }} />;
    }

    return children;
};

export default RequireAuth;
