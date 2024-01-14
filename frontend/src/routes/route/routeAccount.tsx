import { FC, lazy, LazyExoticComponent } from 'react';
import { Route } from 'react-router-dom';
import PathApp from '../pathApp/PathApp.ts';
import RequireAuth from '../RequireAuth.tsx';
import LazyDownload from '../LazyDownload.tsx';

const PageAccount: LazyExoticComponent<FC> = lazy(
    () => import('../../pages/account/PageAccount.tsx'),
);

const PageCreateAuction: LazyExoticComponent<FC> = lazy(
    () => import('../../pages/createAuction/PageCreateAuction.tsx'),
);

const PageCreateLot: LazyExoticComponent<FC> = lazy(
    () => import('../../pages/createLot/PageCreateLot.tsx'),
);

const AddMoney: LazyExoticComponent<FC> = lazy(
    () => import('../../pages/addMoney/AddMoney.tsx'),
);
const routeAccount = (
    <>
        <Route
            path={`${PathApp.account}/:id`}
            element={
                <LazyDownload>
                    <PageAccount />
                </LazyDownload>
            }
        />
        <Route
            path={PathApp.createAuction}
            element={
                <RequireAuth>
                    <LazyDownload>
                        <PageCreateAuction />
                    </LazyDownload>
                </RequireAuth>
            }
        />
        <Route
            path={`${PathApp.createLot}/:id`}
            element={
                <RequireAuth>
                    <LazyDownload>
                        <PageCreateLot />
                    </LazyDownload>
                </RequireAuth>
            }
        />
        <Route
            path={PathApp.bill}
            element={
                <RequireAuth>
                    <LazyDownload>
                        <AddMoney />
                    </LazyDownload>
                </RequireAuth>
            }
        />
    </>
);

export default routeAccount;
