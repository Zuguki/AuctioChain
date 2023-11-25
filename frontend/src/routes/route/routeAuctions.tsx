import React from 'react';
import { Route } from 'react-router-dom';
import PageAuctions from '../../pages/auctions/PageAuctions.tsx';
import PageOneAuction from '../../pages/auction/PageOneAuction.tsx';
import PageLot from '../../pages/lot/PageLot.tsx';
import RequireAuth from '../RequireAuth.tsx';

const routeAuctions = [
    <Route path="auctions" element={<PageAuctions />} />,
    <Route path="auction/:id" element={<PageOneAuction />} />,
    <Route
        path="lot/:id"
        element={
            <RequireAuth>
                <PageLot />
            </RequireAuth>
        }
    />,
];

export default routeAuctions;
