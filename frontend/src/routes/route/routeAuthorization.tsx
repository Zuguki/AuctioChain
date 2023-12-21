import React from 'react';
import { Route } from 'react-router-dom';
import FormAuthorization from '../../pages/authorization/FormAuthorization/FormAuthorization.tsx';
import FormRegistration from '../../pages/authorization/FormRegistration/FormRegistration.tsx';
import PathApp from '../pathApp/PathApp.ts';

const routeAuthorization = (
    <>
        <Route path={PathApp.authorization} element={<FormAuthorization />} />,
        <Route path={PathApp.registration} element={<FormRegistration />} />,
    </>
);

export default routeAuthorization;
