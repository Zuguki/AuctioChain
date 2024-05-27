import { useContext } from "react";
import { Context } from "@/context/context.ts";
import Hr from "../../components/UI/Hr/Hr.tsx";
import BaseButton from "../../components/UI/BaseButton/BaseButton.tsx";
import { observer } from "mobx-react-lite";
import styleAccount from "./pageAccount.module.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ListAuctionsProfile from "./ListAuctionsProfile.tsx";
import ListWinLots from "./ListWinLots.tsx";
import PathApp from "../../routes/pathApp/PathApp.ts";
import ListActiveLots from "./ListActiveLots.tsx";
import useGetUserName from "../../hooks/API/useGetUserName.ts";
import BalanceService from "../../API/service/BalanceService.ts";
import useGetAPI from "../../hooks/API/useGetAPI.ts";
import { TIME_ZONE } from "@/auxiliaryTools/dateLogic/timeZone.ts";
import AuthService from "@/API/service/AuthService.ts";
import AdminService from "@/API/service/AdminService.ts";

const PageAccount = observer(() => {
    const { userStore } = useContext(Context);
    const { id } = useParams();
    const nav = useNavigate();

    if (id == null) {
        alert("Ошибка загрузки страницы!");
        return <Navigate to={PathApp.main} />;
    }

    const userId = userStore.user.userId;
    const isUser: boolean = id === userId;
    const { username, isLoading } = useGetUserName(id);
    const { data: roles, isLoading: loadingRoles } = useGetAPI(
        () => AuthService.roles(),
        ["roles", id],
    );
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
                <p className={styleAccount.timeZone}>
                    Часовая зона: {TIME_ZONE}
                </p>
                {!isLoading && (
                    <h3 className={styleAccount.userName}>@{username}</h3>
                )}
                {isUser && !loadingBalance && !loadingRoles && (
                    <>
                        <h4 className={styleAccount.balance}>{balance} Ac</h4>
                        <div className={styleAccount.buttons}>
                            <Link to={PathApp.bill}>
                                <BaseButton>Пополнить счёт</BaseButton>
                            </Link>
                            {AdminService.isModerator(roles) && (
                                <Link to={`${PathApp.moderation}/${id}`}>
                                    <BaseButton>Модераторство</BaseButton>
                                </Link>
                            )}
                        </div>
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
