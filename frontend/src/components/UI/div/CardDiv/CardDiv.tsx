import React, { ReactElement } from 'react';
import styleCard from './cardDiv.module.css';
import ButtonCard from './ButtonCard/ButtonCard.tsx';
import { Link, useLocation } from 'react-router-dom';
import { IBaseCard, IPropsCardDiv } from '../../../../interfaces/baseCard.tsx';
import sliceText from '../../../../auxiliaryTools/sliceText.ts';
import PathApp from '../../../../routes/pathApp/PathApp.ts';

function CardDiv<T extends IBaseCard>({
    objCard,
    children,
}: IPropsCardDiv<T>): ReactElement {
    const { image, id } = objCard;
    let { description, name } = objCard;
    const { pathname } = useLocation();
    const path = pathname === PathApp.auctions ? PathApp.auction : PathApp.lot;
    name = sliceText(name, 3);
    description = sliceText(description, 6);
    return (
        <div className={styleCard.card}>
            <h5 className={styleCard.title}>{name}</h5>
            <img className={styleCard.img} src={image} alt={image} />
            {children}
            <p className={styleCard.description}>{description}</p>
            <Link to={`${path}/${id}`}>
                <ButtonCard>Открыть</ButtonCard>
            </Link>
        </div>
    );
}

export default CardDiv;
