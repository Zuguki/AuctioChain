import {FC} from 'react';
import {IInput, sizeStileInput} from "../logicInput.ts";
import errorInputStyle from "./errorInput.module.css";

const ErrorInput: FC<IInput>= ({changeValue, width= 'base', ...props}) => {
    return (
        <input
            className={`${errorInputStyle.input} ${sizeStileInput(errorInputStyle.small, errorInputStyle.large)[width]}`}
            {...props}
            onChange={changeValue}
        />
    );
};

export default ErrorInput;