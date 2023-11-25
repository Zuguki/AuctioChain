import React from 'react';
import { Route } from 'react-router-dom';
import FormAuthorization from '../../pages/authorization/FormAuthorization/FormAuthorization.tsx';
import FormRegistration from '../../pages/authorization/FormRegistration/FormRegistration.tsx';

const routeAuthorization = [
    <Route path="authorization" element={<FormAuthorization />} />,
    <Route path="registration" element={<FormRegistration />} />,
];

export default routeAuthorization;
