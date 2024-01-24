import { FC, ForwardedRef, forwardRef, memo } from 'react';
import dataStyle from './dataInput.module.css';
import IInput from '../IInput.ts';
import styleFormInput from '../FormInput/formInput.module.css';

const DateInput: FC<Omit<IInput, 'width'>> = memo(
    forwardRef(
        (
            { changeValue, title, error, errorBlur, ...props },
            ref: ForwardedRef<HTMLInputElement>,
        ) => {
            return (
                <div>
                    <label className={styleFormInput.title}>{title}</label>
                    <input
                        type="datetime-local"
                        required
                        ref={ref}
                        {...props}
                        onFocus={errorBlur}
                        className={`${dataStyle.input} ${
                            error && dataStyle.error
                        }`}
                        onChange={changeValue}
                    />
                </div>
            );
        },
    ),
);

export default DateInput;
