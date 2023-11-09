import React, {FC, ReactElement, ReactNode} from 'react';
import styleCard from "./cardDiv.module.css";
import logo from "../../../../pages/auctions/ListAuctions/CardAuction/testPhoto.png";
import ButtonCard from "./ButtonCard/ButtonCard.tsx";
import {Link} from "react-router-dom";

interface IBaseCard {
    name: string;
    image: string;
    description: string;
    id: string;
}

type IPropsCardDiv<T extends IBaseCard> = { objCard: Pick<T, 'name'| 'image'| 'description'| 'id'>, children: ReactNode};

function CardDiv<T extends IBaseCard>({objCard, children} : IPropsCardDiv<T>): ReactElement {
    const {name, image, description, id} = objCard;
    return (
        <div className={styleCard.card}>
            <h5 className={styleCard.title}>
                {name}
            </h5>
            <img className={styleCard.img}
                 src={logo}
                 alt={image}
            />
            {children}
            <p className={styleCard.description}>
                {description}
            </p>
            <Link to={`/auction/${id}`}>
                <ButtonCard>
                    Открыть
                </ButtonCard>
            </Link>
        </div>
    );
}

export default CardDiv;