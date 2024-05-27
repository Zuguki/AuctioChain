import { FC, ReactNode, useContext } from "react";
import { Context } from "@/context/context.ts";
import { Link } from "react-router-dom";
import styleInterface from "./interfaceProfile.module.css";
import { EventClickInterfaceProfile } from "@/components/InterfaceProfile/EventClickInterfaceProfile.ts";

const LinkInterfaceProfile: FC<{ path: string; children: ReactNode }> = ({
    children,
    path,
}) => {
    const { stateApp } = useContext(Context);
    return (
        <Link
            className={styleInterface.link}
            to={path}
            onClick={(e: EventClickInterfaceProfile<HTMLAnchorElement>) => {
                e._isClickInterfaceProfile = false;
                stateApp.interfaceProfile = false;
            }}
        >
            {children}
        </Link>
    );
};

export default LinkInterfaceProfile;
