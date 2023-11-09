import React from 'react';
import CardDiv from "../../../../components/UI/div/CardDiv/CardDiv.tsx";
import styleCard from './cardLot.module.css'
import {ILot} from "../../../../interfaces/lotsTypes.ts";
import {IBaseCard, IObjCard} from "../../../../interfaces/baseCard.tsx";

const CardLot = ({lot}: {lot: ILot}) => {
    const { buyoutPrice, id, name, description } = lot;
    const lotObjCard: IObjCard<IBaseCard> = {
        id,
        image: lot.images[0],
        name,
        description
    };

    return (
        <CardDiv objCard={lotObjCard}>
            <p className={styleCard.price}>
                Цена: <span className={styleCard.priceNumber}>{buyoutPrice}₽</span>
            </p>
        </CardDiv>
    );
};

export default CardLot;