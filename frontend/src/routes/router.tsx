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
import PageCreateAuction from '../pages/createAuction/PageCreateAuction.tsx';
import RequireAuth from './RequireAuth.tsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path={PathApp.main} element={<Layout />}>
                <Route
                    index
                    element={
                        <>
                            <RequireAuth>
                                <PageCreateAuction />
                            </RequireAuth>
                        </>
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
