import {FC} from 'react';
import IInput from "../../IInput.ts";
import errorInputStyle from "./errorInput.module.css";
import sizeStile from "../../../../auxiliaryTools/logicSize.ts";

const ErrorInput: FC<IInput>= ({changeValue, width= 'base', ...props}) => {
    return (
        <input
            className={`${errorInputStyle.input} ${sizeStile(errorInputStyle.small, errorInputStyle.large)[width]}`}
            {...props}
            onChange={changeValue}
        />
    );
};

export default ErrorInput;