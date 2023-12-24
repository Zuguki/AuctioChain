import React from 'react';
import { Route } from 'react-router-dom';
import PageAccount from '../../pages/account/PageAccount.tsx';
import PathApp from '../pathApp/PathApp.ts';
import RequireAuth from '../RequireAuth.tsx';
import PageCreateAuction from '../../pages/createAuction/PageCreateAuction.tsx';
import PageCreateLot from '../../pages/createLot/PageCreateLot.tsx';
import AddMoney from '../../pages/addMoney/AddMoney.tsx';

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
        <Route
            path={`${PathApp.createLot}/:id`}
            element={
                <RequireAuth>
                    <PageCreateLot />
                </RequireAuth>
            }
        />
        <Route
            path={PathApp.bill}
            element={
                <RequireAuth>
                    <AddMoney />
                </RequireAuth>
            }
        />
    </>
);

export default routeAccount;
