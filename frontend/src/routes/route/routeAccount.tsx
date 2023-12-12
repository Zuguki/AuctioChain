import React from 'react';
import { Route } from 'react-router-dom';
import PageAccount from '../../pages/account/PageAccount.tsx';
import PathApp from '../pathApp/PathApp.ts';
import RequireAuth from '../RequireAuth.tsx';
import PageCreateAuction from '../../pages/createAuction/PageCreateAuction.tsx';

const routeAccount = (
    <>
        <Route path={`${PathApp.account}/:id`} element={<PageAccount />} />
        <Route
            path={PathApp.createAuction}
            element={
                <RequireAuth>
                    <PageCreateAuction />
                </RequireAuth>
            }
        />
    </>
);

export default routeAccount;
