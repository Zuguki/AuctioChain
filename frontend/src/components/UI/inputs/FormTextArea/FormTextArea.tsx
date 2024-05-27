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
            const textAreaChangeValue: (
                e: ChangeEvent<HTMLTextAreaElement>,
            ) => void = changeValue as unknown as (
                e: ChangeEvent<HTMLTextAreaElement>,
            ) => void;
            return (
                <div>
                    <label className={textAreaStyle.title}>{title}</label>
                    <textarea
                        className={`${textAreaStyle.textArea} ${
                            error && textAreaStyle.error
                        }`}
                        required
                        onFocus={errorBlur}
                        onChange={textAreaChangeValue}
                        ref={ref}
                        {...props}
                    ></textarea>
                </div>
            );
        },
    ),
);

export default FormTextArea;
