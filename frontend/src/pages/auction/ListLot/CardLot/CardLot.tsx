import React from 'react';
import CardDiv from "../../../../components/UI/div/CardDiv/CardDiv.tsx";
import styleCard from "../../../auctions/ListAuctions/CardAuction/cardAuction.module.css";

const CardLot = ({lot}) => {
    const {price} = lot;
    return (
        <CardDiv objCard={lot}>
            <p>
                Цена: {price}
            </p>
        </CardDiv>
    );
};

export default CardLot;