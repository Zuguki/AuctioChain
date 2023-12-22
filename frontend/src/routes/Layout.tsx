import React, { useContext } from 'react';
import Header from '../components/Header/Header.tsx';
import { Outlet } from 'react-router-dom';
import InterfaceProfile from '../components/InterfaceProfile/InterfaceProfile.tsx';
import { Context } from '../context/context.ts';

const Layout = () => {
    const { stateApp } = useContext(Context);
    return (
        <div onClick={(): void => stateApp.setInterfaceProfile(false)}>
            <Header />
            <InterfaceProfile />
            <Outlet />
        </div>
    );
};

export default Layout;
