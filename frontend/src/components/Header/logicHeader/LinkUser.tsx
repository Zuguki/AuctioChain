import React, { FC, useContext } from "react";
import styleHeader from "../header.module.css";
import { Link, useLocation } from "react-router-dom";
import userAuth from "../../../design/icons/icon authorized.svg";
import userLog from "../../../design/icons/icon log in.svg";
import { Context } from "@/context/context.ts";
import PathApp from "../../../routes/pathApp/PathApp.ts";
import { EventClickInterfaceProfile } from "@/components/InterfaceProfile/EventClickInterfaceProfile.ts";
import IUser from "@/API/interfaces/IUser.ts";
import { observer } from "mobx-react-lite";
import Cookies from "js-cookie";
import TokenLogic from "@/appLogic/tokenLogic/TokenLogic.ts";

const LinkUser: FC = observer(() => {
    const location = useLocation();
    const { stateApp, userStore } = useContext(Context);
    const token = Cookies.get(TokenLogic.TOKEN);
    /*if (token != null) {
                userStore.setAuthByToken(token);
            }*/
    const auth: boolean = userStore.getAuth();
    const user: IUser = userStore.getUser();
    console.log(auth, user);
    if (!auth) {
        return (
            <div className={styleHeader.positionUserNot}>
                <Link to={PathApp.authorization} state={{ from: location }}>
                    <img src={userLog} alt="userLog" />
                </Link>
            </div>
        );
    }

    const clickProfile = (e: EventClickInterfaceProfile<HTMLButtonElement>) => {
        if (!e._isClickInterfaceProfile) {
            e._isClickInterfaceProfile = true;
            stateApp.setInterfaceProfile(!stateApp.getInterfaceProfile());
        }
    };

    return (
        <div className={styleHeader.positionUser}>
            <button className={styleHeader.buttonAuth} onClick={clickProfile}>
                <img src={userAuth} alt="userAuth" />
            </button>
            <p className={styleHeader.userName}>@{user.name}</p>
        </div>
    );
});

export default LinkUser;
