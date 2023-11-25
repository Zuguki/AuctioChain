import {
    createBrowserRouter,
    createRoutesFromElements,
    Link,
    Route,
} from 'react-router-dom';
import Layout from './Layout.tsx';
import PageCreateAuction from '../pages/createAuction/PageCreateAuction.tsx';
import routeAuthorization from './route/routeAuthorization.tsx';
import routeAuctions from './route/routeAuctions.tsx';
import routeAccount from './route/routeAccount.tsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route
                index
                element={
                    <>
                        <PageCreateAuction />
                        <Link to="/authorization">
                            <button>click</button>
                        </Link>
                    </>
                }
            />
            {routeAuthorization}
            {routeAuctions}
            {routeAccount}
        </Route>,
    ),
);

export default router;
