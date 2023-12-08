import {
    createBrowserRouter,
    createRoutesFromElements,
    Link,
    Route,
} from 'react-router-dom';
import Layout from './Layout.tsx';
import routeAuthorization from './route/routeAuthorization.tsx';
import routeAuctions from './route/routeAuctions.tsx';
import routeAccount from './route/routeAccount.tsx';
import PageAuctions from '../pages/auctions/PageAuctions.tsx';
import PageError from '../pages/error/PageError.tsx';

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
                            <Link to="/auctions">
                                <button>auctions</button>
                            </Link>
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
