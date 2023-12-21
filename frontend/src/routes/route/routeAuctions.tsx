import React from 'react';
import { Route } from 'react-router-dom';
import PageAuctions from '../../pages/auctions/PageAuctions.tsx';
import PageOneAuction from '../../pages/auction/PageOneAuction.tsx';
import PageLot from '../../pages/lot/PageLot.tsx';
import PathApp from '../pathApp/PathApp.ts';

const routeAuctions = (
    <>
        <Route path={PathApp.auctions} element={<PageAuctions />} />,
        <Route path={`${PathApp.auction}/:id`} element={<PageOneAuction />} />,
        <Route path={`${PathApp.lot}/:id`} element={<PageLot />} />,
    </>
);

export default routeAuctions;
