import {FC} from 'react';
import {IInput, sizeStileInput} from "../../logicInput.ts";
import formInputStyle from "./formInput.module.css";

const FormInput: FC<IInput> = ({changeValue, width= 'base', title, ...props}) => {
    return (
        <div>
            <p className={formInputStyle.title}>{title}</p>
            <input
                  className={`${formInputStyle.input} ${sizeStileInput(formInputStyle.small, formInputStyle.large)[width]}`}
                  {...props}
                  onChange={changeValue}
            />
        </div>
    );
};

export default FormInput;