import {
    ChangeEvent,
    FC,
    ForwardedRef,
    forwardRef,
    memo,
    TextareaHTMLAttributes,
} from "react";
import textAreaStyle from "./formTextArea.module.css";
import { AxiosError } from "axios";

interface IFormTextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    title: string;
    error: AxiosError | null;
    errorBlur: () => void;
    changeValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormTextArea: FC<IFormTextArea> = memo(
    forwardRef(
        (
            { changeValue, title, error, errorBlur, ...props },
            ref: ForwardedRef<HTMLTextAreaElement>,
        ) => {
            return (
                <div>
                    <label className={textAreaStyle.title}>{title}</label>
                    <textarea
                        className={`${textAreaStyle.textArea} ${
                            error && textAreaStyle.error
                        }`}
                        required
                        onFocus={errorBlur}
                        onChange={changeValue}
                        ref={ref}
                        {...props}
                    ></textarea>
                </div>
            );
        },
    ),
);

export default FormTextArea;
