import React, { FC, ReactNode, useContext } from 'react';
import styleInterface from './interfaceProfile.module.css';
import { Link, useNavigate } from 'react-router-dom';
import PathApp from '../../routes/pathApp/PathApp.ts';
import Hr from '../UI/Hr/Hr.tsx';
import BaseButton from '../UI/BaseButton/BaseButton.tsx';
import { Context } from '../../context/context.ts';
import { observer } from 'mobx-react-lite';

const InterfaceProfile = observer(() => {
    const { userStore, stateApp } = useContext(Context);
    const nav = useNavigate();
    if (!userStore.getAuth() || !stateApp.getInterfaceProfile()) {
        return null;
    }
    const { userId, name } = userStore.getUser();
    const logout = (): void => {
        userStore.logout();
        stateApp.setInterfaceProfile(false);
        nav(PathApp.auctions);
    };
    return (
        <div className={styleInterface.modal}>
            <div className={styleInterface.position}>
                <LinkInterfaceProfile path={`${PathApp.account}/${userId}`}>
                    Аккаунт
                </LinkInterfaceProfile>
                <LinkInterfaceProfile path={`${PathApp.createAuction}`}>
                    Создать аукцион
                </LinkInterfaceProfile>
                <LinkInterfaceProfile path={PathApp.auctions}>
                    Аукционы
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

export default InterfaceProfile;
