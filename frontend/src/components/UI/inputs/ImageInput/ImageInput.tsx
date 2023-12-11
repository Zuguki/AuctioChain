import { FC } from 'react';
import inputStyle from './imageInput.module.css';
import IInput from '../../IInput.ts';
// in development
const ImageInput: FC<Omit<IInput, 'width'>> = ({
    changeValue,
    title,
    error,
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
                {...props}
                onChange={changeValue}
                className={inputStyle.input}
                accept="image/jpeg,image/png"
            ></input>
        </div>
    );
};

export default ImageInput;
