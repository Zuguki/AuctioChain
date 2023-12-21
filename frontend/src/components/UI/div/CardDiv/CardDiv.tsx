import React, { ReactElement, useContext } from 'react';
import styleCard from './cardDiv.module.css';
import ButtonCard from './ButtonCard/ButtonCard.tsx';
import { Link } from 'react-router-dom';
import { IBaseCard, IPropsCardDiv } from '../../../../interfaces/baseCard.tsx';
import sliceText from '../../../../auxiliaryTools/sliceText.ts';
import PathApp from '../../../../routes/pathApp/PathApp.ts';
import { Context } from '../../../../context/context.ts';

function CardDiv<T extends IBaseCard>({
    objCard,
    children,
}: IPropsCardDiv<T>): ReactElement {
    const { stateApp } = useContext(Context);
    const { image, id, status } = objCard;
    let { description, name } = objCard;
    const path = status ? PathApp.auction : PathApp.lot;
    name = sliceText(name, 3);
    description = sliceText(description, 6);
    return (
        <div className={styleCard.card}>
            <h5 className={styleCard.title}>{name}</h5>
            <img className={styleCard.img} src={image} alt="image" />
            {children}
            <p className={styleCard.description}>{description}</p>
            <Link to={`${path}/${id}`}>
                <ButtonCard onClick={() => stateApp.setInterfaceProfile(false)}>
                    Открыть
                </ButtonCard>
            </Link>
        </div>
    );
}

export default CardDiv;
