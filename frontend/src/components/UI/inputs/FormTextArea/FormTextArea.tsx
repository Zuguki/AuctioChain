import {ChangeEvent, FC, TextareaHTMLAttributes} from 'react';
import textAreaStyle from './formTextArea.module.css';
interface IFormTextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    changeValue: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormTextArea: FC<IFormTextArea> = ({ changeValue, ...props}) => {
    return (
        <textarea
            className={textAreaStyle.textArea}
            onChange={changeValue}
            {...props}>
        </textarea>
    );
};

export default FormTextArea;