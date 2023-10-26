import {FC} from 'react';
import inputStyle from './baseInput.module.css';
import {IInput, sizeStileInput} from "../logicInput.ts";

const BaseInput: FC<IInput> = ({changeValue, width = 'base', ...props}) => {
    return (
        <input
            className={`${inputStyle.input} ${sizeStileInput(inputStyle.small, inputStyle.large)[width]}`}
            {...props}
            onChange={changeValue}
        />
    );
};

export default BaseInput;