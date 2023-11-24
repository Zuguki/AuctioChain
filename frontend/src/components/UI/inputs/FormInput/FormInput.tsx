import {ChangeEvent, FC, KeyboardEvent} from 'react';
import IInput from "../../IInput.ts";
import styleFormInput from "./formInput.module.css";
import {blockInvalidChar} from "../../../../auxiliaryTools/bloclnvalidChar.ts";
import sizeStile from "../../../../auxiliaryTools/logicSize.ts";

const FormInput: FC<IInput> = ({changeValue, width= 'base', title, blockChars = [], error, blurError, ...props}) => {
    return (
        <div>
            <label className={styleFormInput.title}>{title}</label>
            <input
                className={`${styleFormInput.input} ${error && styleFormInput.inputError} ${sizeStile(styleFormInput.small, styleFormInput.large)[width]}`}
                {...props}
                onFocus={blurError}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                    blurError()
                    changeValue(e)
                }}
                onKeyDown={(e: KeyboardEvent<HTMLElement>) => blockInvalidChar(e, blockChars)}
                required
            />
        </div>
    );
};

export default FormInput;