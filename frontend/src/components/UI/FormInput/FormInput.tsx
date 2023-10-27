import {FC} from 'react';
import {IInput, sizeStileInput} from "../logicInput.ts";
import formInputStyle from "./formInput.module.css";

interface IFormInput extends IInput {
    long?: boolean
}

const FormInput: FC<IFormInput> = ({changeValue, width= 'base', long = false, ...props}) => {
    return (
        <input
            className={`${formInputStyle.input} ${sizeStileInput(formInputStyle.small, formInputStyle.large)[width]} ${long && formInputStyle.long}`}
            {...props}
            onChange={changeValue}
        />
    );
};

export default FormInput;