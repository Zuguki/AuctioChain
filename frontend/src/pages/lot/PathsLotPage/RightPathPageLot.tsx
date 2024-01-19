import React, { FC, useState } from 'react';
import useGetAPI from '../../../hooks/API/useGetAPI.ts';
import { ResponseObjBets } from '../../../API/interfaces/IBet.ts';
import LotService from '../../../API/service/LotService.ts';
import styleLot from '../pageLot.module.css';
import BaseButton from '../../../components/UI/BaseButton/BaseButton.tsx';
import IPathLotPage from '../../../interfaces/IPathLotPage.ts';
import AuctionService from '../../../API/service/AuctionService.ts';
import IAuction from '../../../API/interfaces/IAuction.ts';
import AuctionLogic from '../../../appLogic/logicAuction/AuctionLogic.ts';
import ListBetsLot from '../ListBetsLot.tsx';
import up from '../../../design/icons/collapse.svg';
import down from '../../../design/icons/collapse close.svg';

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
    const [showBets, setShowBets] = useState<boolean>(false);

    return (
        <div className={styleLot.right}>
            <h1>{name}</h1>
            <p>{description}</p>
            <h3 className={styleLot.price}>
                Цена на данный момент:&nbsp;
                {currentMaxBet ? currentMaxBet : initialPrice}
                &nbsp;Ac
            </h3>
            <div className={styleLot.information}>
                <p>Начальная цена: {initialPrice} Ac</p>
                <p>Шаг: {betStep} Ac</p>
                {!loading && !err && (
                    <div>
                        <p>Количество ставок: {bets.length}</p>
                        <div>
                            <p className={styleLot.textBets}>Показать ставки</p>
                            <div className={styleLot.positionShowBet}>
                                <img
                                    src={showBets ? down : up}
                                    onClick={() =>
                                        setShowBets(
                                            (prevState: boolean) => !prevState,
                                        )
                                    }
                                />
                            </div>
                            <ListBetsLot
                                style={{ display: showBets ? 'block' : 'none' }}
                                betsLot={bets}
                            />
                        </div>
                    </div>
                )}
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
