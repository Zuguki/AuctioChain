import React from 'react';
import { Route } from 'react-router-dom';
import PageAccount from '../../pages/account/PageAccount.tsx';
import PathApp from '../pathApp/PathApp.ts';

const routeAccount = [
    <Route path={`${PathApp.account}`} element={<PageAccount />} />,
];

export default routeAccount;
