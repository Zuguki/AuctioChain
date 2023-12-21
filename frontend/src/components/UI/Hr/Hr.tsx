import { FC } from 'react';
import sizeStyle from '../../../auxiliaryTools/logicSize.ts';
import styleHr from './hr.module.css';

const Hr: FC<IHr> = ({ width = 'base', extraSmall = false }) => {
    return (
        <hr
            className={`${styleHr.hr} ${
                sizeStyle(styleHr.hrSmall, styleHr.hrLarge)[width]
            } ${extraSmall && styleHr.hrExtraSmall}`}
        />
    );
};

interface IHr {
    width?: 'small' | 'base' | 'large';
    extraSmall?: boolean;
}

export default Hr;
