import React from 'react';
import imgLot from './test-lot.png';
import styleLot from './pageLot.module.css';
import BaseButton from "../../components/UI/BaseButton/BaseButton.tsx";
import {useParams} from "react-router-dom";
import useGetAPI from "../../hooks/API/useGetAPI.ts";
import {BaseLot, ILot} from "../../interfaces/lotsTypes.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const PageLot = () => {
    const {id} = useParams();
    const {data: lot, isLoading, err} = useGetAPI<ILot>(`http://localhost:5121/api/v1/auction/lots/id?LotId=${id}`, BaseLot);
    return (
        <>
            { isLoading ? (
                <Spinner />
            ) : (
                <div>
                    <div className={styleLot.left}>
                        <img className={styleLot.img} src={imgLot} alt='img-lot'/>
                        <p className={styleLot.auxiliaryText}>Владелец: <span className={styleLot.textUser}>----@user</span></p>
                        <p className={styleLot.auxiliaryText}>Лот: {lot.name}</p>
                        <p className={styleLot.protectedText}>Все права защищены.</p>
                    </div>
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
                </div>
            )}
        </>
    );
};

export default PageLot;