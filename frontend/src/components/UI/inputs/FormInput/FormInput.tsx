import {FC} from 'react';
import {IInput, sizeStileInput} from "../../logicInput.ts";
import formInputStyle from "./formInput.module.css";

const FormInput: FC<IInput> = ({changeValue, width= 'base', ...props}) => {
    return (
        <input
              className={`${formInputStyle.input} ${sizeStileInput(formInputStyle.small, formInputStyle.large)[width]}`}
              {...props}
              onChange={changeValue}
        />
    );
};

export default FormInput;