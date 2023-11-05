import React from 'react';
import styleCard from "./cardDiv.module.css";
import logo from "../../../../pages/auctions/ListAuctions/CardAuction/testPhoto.png";
import ButtonCard from "./ButtonCard/ButtonCard.tsx";

const CardDiv = ({objCard, children}) => {
    const {name, img, description} = objCard;
    return (
        <div className={styleCard.card}>
            <h5 className={styleCard.title}>
                {name}
            </h5>
            <img className={styleCard.img}
                 src={logo}
                 alt={img}
            />
            {children}
            <p className={styleCard.description}>
                {description}
            </p>
            <ButtonCard>
                Открыть
            </ButtonCard>
        </div>
    );
};

export default CardDiv;