import {FC} from 'react';
import sizeStile from "../../../auxiliaryTools/logicSize.ts";
import styleHr from './hr.module.css';

const Hr: FC<IHr> = ({width = 'base'}) => {
    return (
        <hr className={`${styleHr.hr} ${sizeStile(styleHr.hrSmall, styleHr.hrLarge)[width]}`}/>
    );
};

interface IHr {
    width?: 'small' | 'base' | 'large';
}

export default Hr;