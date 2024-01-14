import { FC, lazy, LazyExoticComponent } from 'react';
import { Route } from 'react-router-dom';
import PathApp from '../pathApp/PathApp.ts';
import LazyDownload from '../LazyDownload.tsx';

const PageAuctions: LazyExoticComponent<FC> = lazy(
    () => import('../../pages/auctions/PageAuctions.tsx'),
);

const PageOneAuction: LazyExoticComponent<FC> = lazy(
    () => import('../../pages/auction/PageOneAuction.tsx'),
);

const PageLot: LazyExoticComponent<FC> = lazy(
    () => import('../../pages/lot/PageLot.tsx'),
);
const routeAuctions = (
    <>
        <Route
            path={PathApp.auctions}
            element={
                <LazyDownload>
                    <PageAuctions />
                </LazyDownload>
            }
        />
        <Route
            path={`${PathApp.auction}${PathApp.id}`}
            element={
                <LazyDownload>
                    <PageOneAuction />
                </LazyDownload>
            }
        />
        <Route
            path={`${PathApp.lot}${PathApp.id}`}
            element={
                <LazyDownload>
                    <PageLot />
                </LazyDownload>
            }
        />
    </>
);

export default routeAuctions;
