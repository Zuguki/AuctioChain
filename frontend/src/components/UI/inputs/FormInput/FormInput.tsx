import { FC, KeyboardEvent} from 'react';
import IInput from "../../IInput.ts";
import formInputStyle from "./formInput.module.css";
import {blockInvalidChar} from "../../../../auxiliaryTools/bloclnvalidChar.ts";
import sizeStile from "../../../../auxiliaryTools/logicSize.ts";

const FormInput: FC<IInput> = ({changeValue, width= 'base', title, blockChars = [], ...props}) => {
    return (
        <div>
            <label className={formInputStyle.title}>{title}</label>
            <input
                  className={`${formInputStyle.input} ${sizeStile(formInputStyle.small, formInputStyle.large)[width]}`}
                  {...props}
                  onChange={changeValue}
                  onKeyDown={(e: KeyboardEvent<HTMLElement>) => blockInvalidChar(e, blockChars)}
            />
        </div>
    );
};

export default FormInput;