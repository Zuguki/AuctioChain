import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import Layout from './Layout.tsx';
import routeAuthorization from './route/routeAuthorization.tsx';
import routeAuctions from './route/routeAuctions.tsx';
import routeAccount from './route/routeAccount.tsx';
import PageError from '../pages/error/PageError.tsx';
import PathApp from './pathApp/PathApp.ts';
import MainPage from '../pages/main/MainPage.tsx';
import { FC, lazy, LazyExoticComponent } from 'react';
import LazyDownload from './LazyDownload.tsx';

const CurrencyRate: LazyExoticComponent<FC> = lazy(
    () => import('../pages/currencyRate/CurrencyRate.tsx'),
);
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path={PathApp.main} element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route
                    path={PathApp.currency}
                    element={
                        <LazyDownload>
                            <CurrencyRate />
                        </LazyDownload>
                    }
                />
                {routeAuthorization}
                {routeAuctions}
                {routeAccount}
                <Route path="*" element={<PageError />} />
            </Route>
        </>,
    ),
);

export default router;
