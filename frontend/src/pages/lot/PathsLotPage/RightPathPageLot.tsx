import React, { FC } from 'react';
import useGetAPI from '../../../hooks/API/useGetAPI.ts';
import { ResponseObjBets } from '../../../API/interfaces/IBet.ts';
import LotService from '../../../API/service/LotService.ts';
import styleLot from '../pageLot.module.css';
import BaseButton from '../../../components/UI/BaseButton/BaseButton.tsx';
import IPathLotPage from '../../../interfaces/IPathLotPage.ts';
import AuctionService from '../../../API/service/AuctionService.ts';
import IAuction from '../../../API/interfaces/IAuction.ts';
import AuctionLogic from '../../../logicAuction/AuctionLogic.ts';

const RightPathLotPage: FC<IPathLotPage> = ({ lot, openBet }) => {
    if (!lot.id) {
        return null;
    }
    const {
        data: { bets },
        loading,
        err,
    } = useGetAPI<ResponseObjBets>(() => LotService.getBetsByLotID(lot.id), {
        bets: [],
    });
    const {
        name,
        currentMaxBet,
        description,
        initialPrice,
        betStep,
        auctionId,
    } = lot;
    const { data: auction, loading: loadingAuction } = useGetAPI<IAuction>(
        () => AuctionService.getAuctionByID(auctionId),
        {} as IAuction,
    );

    return (
        <div className={styleLot.right}>
            <h1>{name}</h1>
            <p className={styleLot.description}>{description}</p>
            <h2>
                Цена на данный момент:&nbsp;
                {currentMaxBet}
                &nbsp;Ac
            </h2>
            <div className={styleLot.information}>
                <p>Начальная цена: {initialPrice} Ac</p>
                <p>Шаг: {betStep} Ac</p>
                {!loading && !err && <p>Количество ставок: {bets.length}</p>}
            </div>
            {loadingAuction ? (
                <></>
            ) : AuctionLogic.isBidding(auction) ? (
                <BaseButton onClick={openBet}>Поставить ставку</BaseButton>
            ) : (
                <p className={styleLot.notBet}>Ставки не принимаются!</p>
            )}
        </div>
    );
};

export default RightPathLotPage;
