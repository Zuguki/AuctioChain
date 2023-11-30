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
import PageAuctions from '../pages/auctions/PageAuctions.tsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={
                        <>
                            <Link to="/authorization">
                                <button>click</button>
                            </Link>
                            <PageCreateAuction />
                        </>
                    }
                />
                {routeAuthorization}
                {routeAuctions}
                {routeAccount}
            </Route>
            <Route path="*" element={<PageAuctions />} />,
        </>,
    ),
);

export default router;
