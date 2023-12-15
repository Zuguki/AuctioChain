import React, { FC } from 'react';
import useGetAPI from '../../../hooks/API/useGetAPI.ts';
import { ResponseObjBets } from '../../../API/interfaces/IBet.ts';
import LotService from '../../../API/service/LotService.ts';
import styleLot from '../pageLot.module.css';
import BaseButton from '../../../components/UI/BaseButton/BaseButton.tsx';
import IPathLotPage from '../../../interfaces/IPathLotPage.ts';

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
    const { name, currentMaxBet, description, initialPrice, betStep } = lot;

    return (
        <div className={styleLot.right}>
            <h1>{name}</h1>
            <p>{description}</p>
            <h2>
                Цена на данный момент:&nbsp;
                {err?.response?.status === 400 ? initialPrice : currentMaxBet}
                &nbsp;Ac
            </h2>
            <div className={styleLot.information}>
                <p>Начальная цена: {initialPrice} Ac</p>
                <p>Шаг: {betStep} Ac</p>
                {!loading && !err && <p>Количество ставок: {bets.length}</p>}
            </div>
            <BaseButton onClick={openBet}>Поставить ставку</BaseButton>
        </div>
    );
};

export default RightPathLotPage;
