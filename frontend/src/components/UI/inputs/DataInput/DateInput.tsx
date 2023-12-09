import { FC } from 'react';
import dataStyle from './dataInput.module.css';
import IInput from '../../IInput.ts';
import styleFormInput from '../FormInput/formInput.module.css';

const DateInput: FC<Omit<IInput, 'width'>> = ({
    changeValue,
    title,
    error,
    errorBlur,
    ...props
}) => {
    /*const time = new Date()
        const t = time.toLocaleDateString() + 'T' + time.toLocaleTimeString('en-US', { hour12: false,
        hour: "numeric",
        minute: "numeric"});*/
    return (
        <div>
            <label className={styleFormInput.title}>{title}</label>
            <input
                type="datetime-local"
                required
                {...props}
                onFocus={errorBlur}
                className={`${dataStyle.input} ${error && dataStyle.error}`}
                onChange={changeValue}
            />
        </div>
    );
};

export default DateInput;
