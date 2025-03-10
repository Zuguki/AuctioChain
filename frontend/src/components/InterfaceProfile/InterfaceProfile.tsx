import { useContext } from "react";
import styleInterface from "./interfaceProfile.module.css";
import { useNavigate } from "react-router-dom";
import PathApp from "../../routes/pathApp/PathApp.ts";
import Hr from "../UI/Hr/Hr.tsx";
import BaseButton from "../UI/BaseButton/BaseButton.tsx";
import { Context } from "@/context/context.ts";
import { observer } from "mobx-react-lite";
import LinkInterfaceProfile from "./LinkInterfaceProfile.tsx";
import { EventClickInterfaceProfile } from "@/components/InterfaceProfile/EventClickInterfaceProfile.ts";

const InterfaceProfile = observer(() => {
    const { userStore, stateApp } = useContext(Context);
    const nav = useNavigate();

    if (!userStore.isAuth || !stateApp.interfaceProfile) {
        return null;
    }

    const { userId, name } = userStore.user;
    const logout = (): void => {
        userStore.logout();
        nav(PathApp.auctions);
    };

    const clickWindow = (e: EventClickInterfaceProfile<HTMLDivElement>) => {
        if (e._isClickInterfaceProfile !== false) {
            e._isClickInterfaceProfile = true;
            stateApp.interfaceProfile = true;
        }
    };

    return (
        <div className={styleInterface.modal} onClick={clickWindow}>
            <div className={styleInterface.position}>
                <LinkInterfaceProfile path={`${PathApp.account}/${userId}`}>
                    Аккаунт
                </LinkInterfaceProfile>
                <LinkInterfaceProfile path={`${PathApp.createAuction}`}>
                    Создать аукцион
                </LinkInterfaceProfile>
                <LinkInterfaceProfile path={PathApp.bill}>
                    Пополнить счёт
                </LinkInterfaceProfile>
                <Hr extraSmall />
                <p className={styleInterface.userName}>@{name}</p>
                <BaseButton red small onClick={logout}>
                    Выход
                </BaseButton>
            </div>
        </div>
    );
});

export default InterfaceProfile;
