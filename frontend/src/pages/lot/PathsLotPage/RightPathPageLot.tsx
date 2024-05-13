import React, { FC, useState } from "react";
import useGetAPI from "../../../hooks/API/useGetAPI.ts";
import { ResponseObjBets } from "@/API/interfaces/IBet.ts";
import LotService from "../../../API/service/LotService.ts";
import styleLot from "../pageLot.module.css";
import BaseButton from "../../../components/UI/BaseButton/BaseButton.tsx";
import IPathLotPage from "../../../interfaces/IPathLotPage.ts";
import AuctionService from "../../../API/service/AuctionService.ts";
import IAuction from "../../../API/interfaces/IAuction.ts";
import AuctionLogic from "../../../appLogic/logicAuction/AuctionLogic.ts";
import up from "../../../design/icons/collapse.svg";
import down from "../../../design/icons/collapse close.svg";
import ListBetsLot from "@/pages/lot/ListBetsLot.tsx";
import LogicDownload from "@/components/LogicDownload/LogicDownload.tsx";

const RightPathLotPage: FC<IPathLotPage> = ({ lot, openBet }) => {
    const {
        data: { bets },
        isLoading,
    } = useGetAPI<ResponseObjBets>(
        () => LotService.getBetsByLotID(lot.id),
        ["bets", lot.id],
        {
            bets: [],
        },
    );
    const {
        name,
        currentMaxBet,
        description,
        initialPrice,
        betStep,
        auctionId,
    } = lot;

    const {
        data: auction,
        isLoading: loadingAuction,
        error,
    } = useGetAPI<IAuction>(
        () => AuctionService.getAuctionByID(auctionId),
        ["auction", auctionId],
    );
    const [showBets, setShowBets] = useState<boolean>(false);
    const isAddBet = !loadingAuction && AuctionLogic.isBidding(auction);
    return (
        <div className={styleLot.right}>
            <div className={styleLot.backgroundInformation}>
                <h1>{name}</h1>
                <p>{description}</p>
            </div>

            <div className={styleLot.backgroundInformation}>
                <h3 className={styleLot.price}>
                    Цена на рынке:&nbsp;
                    {currentMaxBet ? currentMaxBet : initialPrice}
                    &nbsp;Ac
                </h3>
                <div className={styleLot.information}>
                    <p>Начальная цена: {initialPrice} Ac</p>
                    <p>Шаг: {betStep} Ac</p>
                    <LogicDownload isLoading={isLoading}>
                        <>
                            {!isLoading && !error && (
                                <div>
                                    <p>Количество ставок: {bets.length}</p>
                                    {bets.length !== 0 && (
                                        <div>
                                            <p className={styleLot.textBets}>
                                                Показать ставки
                                            </p>
                                            <div
                                                className={
                                                    styleLot.positionShowBet
                                                }
                                            >
                                                <button
                                                    className={
                                                        styleLot.btnArrow
                                                    }
                                                    onClick={() =>
                                                        setShowBets(
                                                            (
                                                                prevState: boolean,
                                                            ) => !prevState,
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src={
                                                            showBets ? down : up
                                                        }
                                                        alt="arrow"
                                                    />
                                                </button>
                                            </div>
                                            <ListBetsLot
                                                style={{
                                                    display: showBets
                                                        ? "block"
                                                        : "none",
                                                }}
                                                betsLot={bets}
                                            />
                                        </div>
                                    )}
                                    {isAddBet && (
                                        <BaseButton onClick={openBet}>
                                            Поставить ставку
                                        </BaseButton>
                                    )}
                                </div>
                            )}
                        </>
                    </LogicDownload>
                </div>
            </div>

            {!isAddBet && (
                <div className={styleLot.cannotAddBet}>
                    <p className={styleLot.textCannotAddBet}>
                        Невозможно поставить ставку!
                    </p>
                </div>
            )}
        </div>
    );
};

export default RightPathLotPage;
