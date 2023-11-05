import React from 'react';
import CardDiv from "../../../../components/UI/div/CardDiv/CardDiv.tsx";
import styleCard from './cardLot.module.css'

const CardLot = ({lot}) => {
    const {price} = lot;
    return (
        <CardDiv objCard={lot}>
            <p className={styleCard.price}>
                Цена: <span className={styleCard.priceNumber}>{price}₽</span>
            </p>
        </CardDiv>
    );
};

export default CardLot;