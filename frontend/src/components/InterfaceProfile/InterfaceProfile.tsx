import React, { useContext } from 'react';
import styleInterface from './interfaceProfile.module.css';
import { useNavigate } from 'react-router-dom';
import PathApp from '../../routes/pathApp/PathApp.ts';
import Hr from '../UI/Hr/Hr.tsx';
import BaseButton from '../UI/BaseButton/BaseButton.tsx';
import { Context } from '../../context/context.ts';
import { observer } from 'mobx-react-lite';
import LinkInterfaceProfile from './LinkInterfaceProfile.tsx';

const InterfaceProfile = observer(() => {
    const { userStore, stateApp } = useContext(Context);
    const nav = useNavigate();
    if (!userStore.getAuth() || !stateApp.getInterfaceProfile()) {
        return null;
    }
    const { userId, name } = userStore.getUser();
    const logout = (): void => {
        userStore.logout();
        nav(PathApp.auctions);
    };
    return (
        <div
            className={styleInterface.modal}
            onClick={e => e.stopPropagation()}
        >
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

export default InterfaceProfile;
