import React, { useContext } from "react";
import { Context } from "@/context/context.ts";
import Hr from "../../components/UI/Hr/Hr.tsx";
import BaseButton from "../../components/UI/BaseButton/BaseButton.tsx";
import { observer } from "mobx-react-lite";
import styleAccount from "./pageAccount.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import ListAuctionsProfile from "./ListAuctionsProfile.tsx";
import ListWinLots from "./ListWinLots.tsx";
import PathApp from "../../routes/pathApp/PathApp.ts";
import ListActiveLots from "./ListActiveLots.tsx";
import useGetUserName from "../../hooks/API/useGetUserName.ts";
import BalanceService from "../../API/service/BalanceService.ts";
import useGetAPI from "../../hooks/API/useGetAPI.ts";

const PageAccount = observer(() => {
    const { userStore } = useContext(Context);
    const { id } = useParams();
    const nav = useNavigate();

    const userId = userStore.user.userId;
    const isUser: boolean = id === userId;
    const { username, isLoading } = useGetUserName(id);

    const {
        data: { balance },
        isLoading: loadingBalance,
    } = useGetAPI(() => BalanceService.getBalanceUser(), ["balance"]);

    const logout = (): void => {
        userStore.logout();
        nav(PathApp.auctions);
    };

    return (
        <div>
            <div className={styleAccount.position}>
                <h1 className={styleAccount.title}>Аккаунт</h1>
                {!isLoading && (
                    <h3 className={styleAccount.userName}>@{username}</h3>
                )}
                {isUser && !loadingBalance && (
                    <>
                        <h4 className={styleAccount.balance}>{balance} Ac</h4>
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
        </div>
    );
});

export default PageAccount;
