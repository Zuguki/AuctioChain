import React, {FC} from 'react';
import imgLot from './test-lot.png';
import styleLot from './pageLot.module.css';
import BaseButton from "../../components/UI/BaseButton/BaseButton.tsx";
import {useParams} from "react-router-dom";
import useGetAPI from "../../hooks/API/useGetAPI.ts";
import {BaseLot, ILot} from "../../interfaces/lotsTypes.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import LogicDownload from "../../components/LogicDownload/LogicDownload.tsx";

interface IPathLotPage {
    lot: ILot;
}

const PageLot: FC = () => {
    const {id} = useParams();
    const {data: lot, isLoading, err} = useGetAPI<ILot>(`http://localhost:5121/api/v1/auction/lots/id?LotId=${id}`, BaseLot);
    return (
        <LogicDownload isLoading={isLoading}>
           <div>
               <LeftPathLotPage lot={lot} />
               <RightPathLotPage lot={lot} />
           </div>
        </LogicDownload>
    );
};

const LeftPathLotPage: FC<IPathLotPage> = ({ lot }) => {
    return (
        <div className={styleLot.left}>
            <img className={styleLot.img} src={imgLot} alt='img-lot'/>
            <p className={styleLot.auxiliaryText}>Владелец: <span className={styleLot.textUser}>----@user</span></p>
            <p className={styleLot.auxiliaryText}>Лот: {lot.name}</p>
            <p className={styleLot.protectedText}>Все права защищены.</p>
        </div>
    );
}

const RightPathLotPage: FC<IPathLotPage> = ({ lot }) => {
    return (
        <div className={styleLot.right}>
            <h1>{lot.name}</h1>
            <p>{lot.description}</p>
            <h2>Цена на данный момент:  {lot.buyoutPrice}₽</h2>
            <div className={styleLot.information}>
                <p>Начальная цена: -----100$</p>
                <p>Шаг: {lot.betStep}₽</p>
                <p>Количество участников: ----56</p>
            </div>
            <BaseButton>Поставить ставку</BaseButton>
        </div>
    );
}

export default PageLot;