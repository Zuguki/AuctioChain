import React, { FC, memo, useContext } from "react";
import styleLot from "../pageLot.module.css";
import IPathLotPage from "../../../interfaces/IPathLotPage.ts";
import useGetAPI from "../../../hooks/API/useGetAPI.ts";
import IAuction from "../../../API/interfaces/IAuction.ts";
import AuctionService from "../../../API/service/AuctionService.ts";
import { Link, useNavigate } from "react-router-dom";
import PathApp from "../../../routes/pathApp/PathApp.ts";
import useGetUserName from "../../../hooks/API/useGetUserName.ts";
import AuctionLogic from "../../../appLogic/logicAuction/AuctionLogic.ts";
import BaseButton from "../../../components/UI/BaseButton/BaseButton.tsx";
import LotService from "../../../API/service/LotService.ts";
import { Context } from "@/context/context.ts";

const { isCreation, isWaitBidding } = AuctionLogic;

const LeftPathLotPage: FC<IPathLotPage> = memo(({ lot }) => {
    const { image, auctionId, name, id } = lot;
    const { userStore } = useContext(Context);
    const nav = useNavigate();

    const { data: auction } = useGetAPI<IAuction>(
        () => AuctionService.getAuctionByID(auctionId),
        ["auction", auctionId],
    );

    const { userId } = auction;
    const { username } = useGetUserName(userId);
    const canEdit: boolean =
        userId === userStore.user.userId &&
        (isCreation(auction) || isWaitBidding(auction));

    const deleteLot = async (): Promise<void> => {
        try {
            await LotService.deleteLotById(id);
            nav(`${PathApp.auction}/${auctionId}`);
        } catch (err) {
            alert(`Ошибка удаления лота!`);
        }
    };
    return (
        <div className={styleLot.left}>
            <img className={styleLot.img} src={image} alt="lot" />
            {username && auctionId && (
                <>
                    <p className={styleLot.auxiliaryText}>
                        Владелец:&nbsp;
                        <Link
                            to={`${PathApp.account}/${userId}`}
                            className={styleLot.linkLot}
                        >
                            @{username}
                        </Link>
                    </p>
                    <p className={styleLot.auxiliaryText}>
                        Аукцион:&nbsp;
                        <Link
                            className={styleLot.linkLot}
                            to={`${PathApp.auction}/${auctionId}`}
                        >
                            {name}
                        </Link>
                    </p>
                </>
            )}
            {canEdit && (
                <>
                    <div className={styleLot.positionButton}>
                        <BaseButton
                            onClick={() => nav(`${PathApp.editLot}/${id}`)}
                        >
                            Редактировать лот
                        </BaseButton>
                        <BaseButton
                            red
                            onClick={deleteLot}
                            style={{ marginLeft: 5 }}
                        >
                            Удалить лот
                        </BaseButton>
                    </div>
                    <p className={styleLot.protectedText}>
                        Удаление и редактирование лотов доступно только в
                        статусе создания аукциона и ожидания торгов!
                    </p>
                </>
            )}
            <p className={styleLot.protectedText}>Все права защищены.</p>
        </div>
    );
});

export default LeftPathLotPage;
