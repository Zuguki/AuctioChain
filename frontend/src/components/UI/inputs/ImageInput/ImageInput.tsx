import { FC } from 'react';
import inputStyle from './imageInput.module.css';
import IInput from '../IInput.ts';
// in development
const ImageInput: FC<Omit<IInput, 'width'>> = ({
    changeValue,
    title,
    error,
    errorBlur,
    ...props
}) => {
    return (
        <div>
            <label
                className={`${inputStyle.title} ${
                    error && inputStyle.titleErr
                }`}
            >
                {title}
            </label>
            <input
                type="file"
                onClick={errorBlur}
                {...props}
                onChange={changeValue}
                className={`${inputStyle.input} ${
                    error && inputStyle.inputErr
                }`}
                accept="image/jpeg,image/png"
            ></input>
        </div>
    );
};

export default ImageInput;
