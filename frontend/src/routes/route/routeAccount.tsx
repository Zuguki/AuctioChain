import React from 'react';
import { Route } from 'react-router-dom';
import PageAccount from '../../pages/account/PageAccount.tsx';
import PathApp from '../pathApp/PathApp.ts';
import RequireAuth from '../RequireAuth.tsx';

const routeAccount = (
    <>
        <Route
            path={PathApp.account}
            element={
                <RequireAuth>
                    <PageAccount />
                </RequireAuth>
            }
        />
    </>
);

export default routeAccount;
