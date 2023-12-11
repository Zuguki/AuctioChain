import React, { FC } from 'react';
import styleLot from '../pageLot.module.css';
import IPathLotPage from '../../../interfaces/IPathLotPage.ts';

const LeftPathLotPage: FC<IPathLotPage> = ({ lot }) => {
    return (
        <div className={styleLot.left}>
            <img className={styleLot.img} src={lot.image} alt="lot" />
            <p className={styleLot.auxiliaryText}>
                Владелец: <span className={styleLot.textUser}>----@user</span>
            </p>
            <p className={styleLot.auxiliaryText}>
                Лот: &quot;{lot.name}&quot;
            </p>
            <p className={styleLot.protectedText}>Все права защищены.</p>
        </div>
    );
};

export default LeftPathLotPage;
