import React, { FC, ReactNode, useContext } from "react";
import { Context } from "@/context/context.ts";
import { Link } from "react-router-dom";
import styleInterface from "./interfaceProfile.module.css";

const LinkInterfaceProfile: FC<{ path: string; children: ReactNode }> = ({
    children,
    path,
}) => {
    const { stateApp } = useContext(Context);
    return (
        <Link
            className={styleInterface.link}
            to={path}
            onClick={() => stateApp.setInterfaceProfile(false)}
        >
            {children}
        </Link>
    );
};

export default LinkInterfaceProfile;
