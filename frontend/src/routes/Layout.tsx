import React, { useContext } from "react";
import Header from "../components/Header/Header.tsx";
import { Outlet } from "react-router-dom";
import InterfaceProfile from "../components/InterfaceProfile/InterfaceProfile.tsx";
import { Context } from "../context/context.ts";
import NotificationOperation from "../components/Notification/NotificationOperation.tsx";

const Layout = () => {
    const { stateApp } = useContext(Context);
    return (
        <div>
            <Header />
            <main>
                <InterfaceProfile />
                <NotificationOperation />
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
