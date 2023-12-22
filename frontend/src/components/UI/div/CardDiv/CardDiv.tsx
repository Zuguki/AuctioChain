import React, { ReactElement } from 'react';
import styleCard from './cardDiv.module.css';
import ButtonCard from './ButtonCard/ButtonCard.tsx';
import { Link } from 'react-router-dom';
import { IBaseCard, IPropsCardDiv } from '../../../../interfaces/BaseCard.ts';
import PathApp from '../../../../routes/pathApp/PathApp.ts';
import sliceText from '../../../../auxiliaryTools/sliceText.ts';

function CardDiv<T extends IBaseCard>({
    objCard,
    children,
}: IPropsCardDiv<T>): ReactElement {
    const { image, id, status, name } = objCard;
    let { description } = objCard;
    const path: string = status ? PathApp.auction : PathApp.lot;
    description = sliceText(description, 60);
    return (
        <div className={styleCard.card}>
            <h5 className={styleCard.title}>{name}</h5>
            <img className={styleCard.img} src={image} alt="image" />
            {children}
            <p className={styleCard.description}>{description}</p>
            <Link to={`${path}/${id}`}>
                <ButtonCard>Открыть</ButtonCard>
            </Link>
        </div>
    );
}

export default CardDiv;
