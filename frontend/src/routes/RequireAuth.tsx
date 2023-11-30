import React, { useContext } from 'react';
import { ContextUser } from '../context/contextUser.ts';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const { userStore } = useContext(ContextUser);

    if (!userStore.getAuth()) {
        return <Navigate to="/authorization" state={{ from: location }} />;
    }

    return children;
};

export default RequireAuth;
