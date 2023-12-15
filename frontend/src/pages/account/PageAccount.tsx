import React, { useContext } from 'react';
import { Context } from '../../context/context.ts';
import Hr from '../../components/UI/Hr/Hr.tsx';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import { observer } from 'mobx-react-lite';
import styleAccount from './pageAccount.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import ListAuctionsProfile from './ListAuctionsProfile.tsx';
import ListWinLots from './ListWinLots.tsx';
import useGetAPI from '../../hooks/API/useGetAPI.ts';
import ProfileService from '../../API/service/ProfileService.ts';
import IUserName from '../../API/interfaces/IUserName.ts';
import PathApp from '../../routes/pathApp/PathApp.ts';
import ListActiveLots from './ListActiveLots.tsx';

const PageAccount = observer(() => {
    const { userStore, stateApp } = useContext(Context);
    const userId = userStore.getUser().userId;
    const { id } = useParams();
    const nav = useNavigate();
    const isUser: boolean = id === userId;
    const {
        data: { userName },
        loading,
    } = useGetAPI(() => ProfileService.getUserName(id), {} as IUserName, id);
    const logout = (): void => {
        userStore.logout();
        stateApp.setInterfaceProfile(false);
        nav(PathApp.auctions);
    };
    return (
        <>
            <div className={styleAccount.position}>
                <h1 className={styleAccount.title}>Аккаунт</h1>
                {!loading && (
                    <h3 className={styleAccount.userName}>@{userName}</h3>
                )}
                {id === userId && (
                    <>
                        <h3 className={styleAccount.balance}>123 Ac</h3>
                        <BaseButton>Пополнить счёт</BaseButton>
                    </>
                )}
                <Hr />
            </div>
            <ListAuctionsProfile id={id} isUser={isUser} />
            <ListActiveLots id={id} isUser={isUser} />
            <ListWinLots id={id} isUser={isUser} />
            {isUser && (
                <div className={styleAccount.logout}>
                    <BaseButton red onClick={logout}>
                        Выйти из аккаунта
                    </BaseButton>
                </div>
            )}
        </>
    );
});

export default PageAccount;
