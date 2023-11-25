import React, { FC, ReactElement, ReactNode } from 'react';
import styleCard from './cardDiv.module.css';
import logo from '../../../../pages/auctions/ListAuctions/CardAuction/testPhoto.png';
import ButtonCard from './ButtonCard/ButtonCard.tsx';
import { Link, useLocation } from 'react-router-dom';
import { IBaseCard, IPropsCardDiv } from '../../../../interfaces/baseCard.tsx';

function CardDiv<T extends IBaseCard>({
    objCard,
    children,
}: IPropsCardDiv<T>): ReactElement {
    const { name, image, description, id } = objCard;
    const { pathname } = useLocation();
    const path = pathname === '/auctions' ? '/auction' : '/lot';

    return (
        <div className={styleCard.card}>
            <h5 className={styleCard.title}>{name}</h5>
            <img className={styleCard.img} src={logo} alt={image} />
            {children}
            <p className={styleCard.description}>{description}</p>
            <Link to={`${path}/${id}`}>
                <ButtonCard>Открыть</ButtonCard>
            </Link>
        </div>
    );
}

export default CardDiv;
