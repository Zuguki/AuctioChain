import { ChangeEvent, FC } from 'react';
import inputStyle from './imageInput.module.css';
import IInput from '../../IInput.ts';

// in development
const ImageInput: FC<Omit<IInput, 'width'>> = ({ changeValue, ...props }) => {
    return (
        <div>
            <input
                type="file"
                multiple
                {...props}
                onChange={changeValue}
                className={inputStyle.input}
                accept="image/jpeg,image/png"
            ></input>
        </div>
    );
};

export default ImageInput;
