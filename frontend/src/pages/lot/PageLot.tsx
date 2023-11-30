import React, { FC, useContext, useState } from 'react';
import imgLot from './test-lot.png';
import styleLot from './pageLot.module.css';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ILot } from '../../interfaces/lotsTypes.ts';
import LogicDownload from '../../components/LogicDownload/LogicDownload.tsx';
import CloseButton from '../../components/UI/CloseButton/CloseButton.tsx';
import useGetAPI from '../../API/hooks/useGetAPI.ts';
import LotService from '../../API/service/LotService.ts';
import PageBet from '../bet/PageBet.tsx';
import { ContextUser } from '../../context/contextUser.ts';

interface IPathLotPage {
    lot: ILot;
    openBet?: () => void;
}

const PageLot: FC = () => {
    const { id } = useParams();
    const { userStore } = useContext(ContextUser);
    const nav = useNavigate();
    const location = useLocation();
    const { data: lot, loading } = useGetAPI<ILot>(
        () => LotService.getLotByID(id),
        {} as ILot,
    );
    const [showBet, setShowBet] = useState<boolean>(false);
    const closeBet = () => setShowBet((): boolean => false);
    const openBet = (): void => {
        if (userStore.getAuth()) {
            setShowBet((): boolean => true);
            return;
        }
        nav('/authorization', { state: { from: location } });
    };

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
    return (
        <div className={styleLot.right}>
            <h1>{lot.name}</h1>
            <p>{lot.description}</p>
            <h2>Цена на данный момент: {lot.buyoutPrice}₽</h2>
            <div className={styleLot.information}>
                <p>Начальная цена: -----100$</p>
                <p>Шаг: {lot.betStep}₽</p>
                <p>Количество участников: ----56</p>
            </div>
            <BaseButton onClick={openBet}>Поставить ставку</BaseButton>
        </div>
    );
};

export default PageLot;
