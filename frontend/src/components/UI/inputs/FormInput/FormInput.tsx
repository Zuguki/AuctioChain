import { FC, KeyboardEvent} from 'react';
import {IInput, sizeStileInput} from "../../logicInput.ts";
import formInputStyle from "./formInput.module.css";
import {blockInvalidChar} from "../../../../auxiliaryTools/bloclnvalidChar.ts";

const FormInput: FC<IInput> = ({changeValue, width= 'base', title, blockChars = [], ...props}) => {
    return (
        <div>
            <label className={formInputStyle.title}>{title}</label>
            <input
                  className={`${formInputStyle.input} ${sizeStileInput(formInputStyle.small, formInputStyle.large)[width]}`}
                  {...props}
                  onChange={changeValue}
                  onKeyDown={(e: KeyboardEvent<HTMLElement>) => blockInvalidChar(e, blockChars)}
            />
        </div>
    );
};

export default FormInput;