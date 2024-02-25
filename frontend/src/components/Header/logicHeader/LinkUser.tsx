import React, { FC, memo, useContext } from "react";
import styleHeader from "../header.module.css";
import { Link, useLocation } from "react-router-dom";
import userAuth from "../../../design/icons/icon authorized.svg";
import userLog from "../../../design/icons/icon log in.svg";
import ILinkLogicUser from "./ILinkLogicUser.ts";
import { Context } from "@/context/context.ts";
import PathApp from "../../../routes/pathApp/PathApp.ts";

const LinkUser: FC<ILinkLogicUser> = memo(({ auth, user }) => {
    const location = useLocation();
    const { stateApp } = useContext(Context);
    if (auth) {
        return (
            <div className={styleHeader.positionUser}>
                <button
                    className={styleHeader.buttonAuth}
                    onClick={(e) => {
                        e.stopPropagation();
                        stateApp.setInterfaceProfile(
                            !stateApp.getInterfaceProfile(),
                        );
                    }}
                >
                    <img src={userAuth} alt="userAuth" />
                </button>
                <p className={styleHeader.userName}>@{user.name}</p>
            </div>
        );
    }
    return (
        <div className={styleHeader.positionUserNot}>
            <Link to={PathApp.authorization} state={{ from: location }}>
                <img src={userLog} alt="userLog" />
            </Link>
        </div>
    );
});

export default LinkUser;
