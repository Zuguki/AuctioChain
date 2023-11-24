import {ChangeEvent, FC, TextareaHTMLAttributes} from 'react';
import textAreaStyle from './formTextArea.module.css';
import styleFormInput from "../FormInput/formInput.module.css";
import {AxiosError} from "axios";
interface IFormTextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    title: string;
    error: AxiosError | null;
    blurError: () => void;
    changeValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormTextArea: FC<IFormTextArea> = ({ changeValue, title, error, blurError, ...props}) => {
    return (
        <div>
            <label className={textAreaStyle.title}>{title}</label>
            <textarea
                className={`${textAreaStyle.textArea} ${error && textAreaStyle.error}`}
                required
                onFocus={blurError}
                onChange={changeValue}
                {...props}>
        </textarea>
        </div>
    );
};

export default FormTextArea;