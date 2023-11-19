import { FC, KeyboardEvent} from 'react';
import IInput from "../../IInput.ts";
import styleFormInput from "./formInput.module.css";
import {blockInvalidChar} from "../../../../auxiliaryTools/bloclnvalidChar.ts";
import sizeStile from "../../../../auxiliaryTools/logicSize.ts";

const FormInput: FC<IInput> = ({changeValue, width= 'base', title, blockChars = [], error, ...props}) => {
    return (
        <div>
            <label className={styleFormInput.title}>{title}</label>
            <input
                  className={`${!error ? styleFormInput.input : styleFormInput.inputError} ${sizeStile(styleFormInput.small, styleFormInput.large)[width]}`}
                  {...props}
                  onChange={changeValue}
                  onKeyDown={(e: KeyboardEvent<HTMLElement>) => blockInvalidChar(e, blockChars)}
                  required
            />
        </div>
    );
};

export default FormInput;