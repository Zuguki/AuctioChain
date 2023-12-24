import React, { useContext } from 'react';
import { Context } from '../../context/context.ts';
import Hr from '../../components/UI/Hr/Hr.tsx';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import { observer } from 'mobx-react-lite';
import styleAccount from './pageAccount.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ListAuctionsProfile from './ListAuctionsProfile.tsx';
import ListWinLots from './ListWinLots.tsx';
import PathApp from '../../routes/pathApp/PathApp.ts';
import ListActiveLots from './ListActiveLots.tsx';
import useGetUserName from '../../hooks/API/useGetUserName.ts';

const PageAccount = observer(() => {
    const { userStore, stateApp } = useContext(Context);
    const userId = userStore.getUser().userId;
    const { id } = useParams();
    const nav = useNavigate();
    const isUser: boolean = id === userId;
    const { userName, loading, err } = useGetUserName(id);
    /*  const {
          data: { balance },
          loading: loadingBalance,
      } = useGetAPI(
          () => ProfileService.getBalanceUser(),
          {} as IResponseBalance,
      );*/
    const logout = (): void => {
        userStore.logout();
        nav(PathApp.auctions);
    };
    return (
        <>
            <div className={styleAccount.position}>
                <h1 className={styleAccount.title}>Аккаунт</h1>
                {!loading && (
                    <h3 className={styleAccount.userName}>@{userName}</h3>
                )}
                {isUser && (
                    <>
                        <h4 className={styleAccount.balance}>{0} Ac</h4>
                        <Link to={PathApp.bill}>
                            <BaseButton>Пополнить счёт</BaseButton>
                        </Link>
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
