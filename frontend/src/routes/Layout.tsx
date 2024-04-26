import { useContext } from "react";
import Header from "../components/Header/Header.tsx";
import { Link, Outlet } from "react-router-dom";
import InterfaceProfile from "../components/InterfaceProfile/InterfaceProfile.tsx";
import NotificationOperation from "../components/Notification/NotificationOperation.tsx";
import { EventClickInterfaceProfile } from "@/components/InterfaceProfile/EventClickInterfaceProfile.ts";
import { Context } from "@/context/context.ts";
import PathApp from "@/routes/pathApp/PathApp.ts";

const Layout = () => {
    const { stateApp } = useContext(Context);
    return (
        <div
            onClick={(e: EventClickInterfaceProfile<HTMLDivElement>) => {
                if (!e._isClickInterfaceProfile) {
                    stateApp.interfaceProfile = false;
                }
            }}
        >
            <Header />
            <main>
                <InterfaceProfile />
                <NotificationOperation />
                <Outlet />
                <Link to={PathApp.createAuction}>test</Link>
            </main>
        </div>
    );
};

export default Layout;
