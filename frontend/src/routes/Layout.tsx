import React from 'react';
import Header from '../components/Header/Header.tsx';
import { Outlet } from 'react-router-dom';
import InterfaceProfile from '../components/InterfaceProfile/InterfaceProfile.tsx';

const Layout = () => {
    return (
        <>
            <Header />
            <InterfaceProfile />
            <Outlet />
        </>
    );
};

export default Layout;
