import React, { FC } from 'react';
import CardDiv from '../../../../components/UI/div/CardDiv/CardDiv.tsx';
import styleCard from './cardLot.module.css';
import ILot from '../../../../API/interfaces/ILot.ts';
import { IBaseCard, IObjCard } from '../../../../interfaces/baseCard.tsx';

const CardLot: FC<{ lot: ILot }> = ({ lot }) => {
    const { currentMaxBet, id, name, description, image } = lot;
    const lotObjCard: IObjCard<IBaseCard> = {
        id,
        image,
        name,
        description,
    };

    return (
        <CardDiv objCard={lotObjCard}>
            <p className={styleCard.price}>
                Цена:{' '}
                <span className={styleCard.priceNumber}>{currentMaxBet}₽</span>
            </p>
        </CardDiv>
    );
};

export default CardLot;
