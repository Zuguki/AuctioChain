import React, { FC, useContext, useState } from 'react';
import imgLot from './test-lot.png';
import styleLot from './pageLot.module.css';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ILot from '../../API/interfaces/ILot.ts';
import LogicDownload from '../../components/LogicDownload/LogicDownload.tsx';
import CloseButton from '../../components/UI/CloseButton/CloseButton.tsx';
import useGetAPI from '../../hooks/API/useGetAPI.ts';
import LotService from '../../API/service/LotService.ts';
import PageBet from '../bet/PageBet.tsx';
import { Context } from '../../context/context.ts';
import { ResponseObjBets } from '../../API/interfaces/IBet.ts';
import ErrorLogic from '../../components/ErrorLogic/ErrorLogic.tsx';

interface IPathLotPage {
    lot: ILot;
    openBet?: () => void;
}

const PageLot: FC = () => {
    const { id } = useParams();
    const { userStore } = useContext(Context);
    const nav = useNavigate();
    const location = useLocation();
    const {
        data: lot,
        loading,
        err,
    } = useGetAPI<ILot>(() => LotService.getLotByID(id), {} as ILot);
    const [showBet, setShowBet] = useState<boolean>(false);
    const closeBet = () => setShowBet((): boolean => false);
    const openBet = (): void => {
        if (userStore.getAuth()) {
            setShowBet((): boolean => true);
            return;
        }
        nav('/authorization', { state: { from: location } });
    };
    if (err) {
        return <ErrorLogic err={err} />;
    }

    return (
        <LogicDownload isLoading={loading}>
            <div>
                <CloseButton />
                <div className={styleLot.position}>
                    <LeftPathLotPage lot={lot} />
                    <RightPathLotPage lot={lot} openBet={openBet} />
                </div>
                {showBet && <PageBet lotId={id} close={closeBet} />}
            </div>
        </LogicDownload>
    );
};

const LeftPathLotPage: FC<IPathLotPage> = ({ lot }) => {
    return (
        <div className={styleLot.left}>
            <img className={styleLot.img} src={imgLot} alt="img-lot" />
            <p className={styleLot.auxiliaryText}>
                Владелец: <span className={styleLot.textUser}>----@user</span>
            </p>
            <p className={styleLot.auxiliaryText}>Лот: {lot.name}</p>
            <p className={styleLot.protectedText}>Все права защищены.</p>
        </div>
    );
};

const RightPathLotPage: FC<IPathLotPage> = ({ lot, openBet }) => {
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
            <h2>Цена на данный момент: {currentMaxBet} Ac</h2>
            <div className={styleLot.information}>
                <p>Начальная цена: {initialPrice} Ac</p>
                <p>Шаг: {betStep} Ac</p>
                {!loading && !err && <p>Количество ставок: {bets.length}</p>}
            </div>
            <BaseButton onClick={openBet}>Поставить ставку</BaseButton>
        </div>
    );
};

export default PageLot;
