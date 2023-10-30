import { FC} from 'react';
import {IInput} from "../../logicInput.ts";
import inputStyle from './imageInput.module.css'

// in development
const ImageInput: FC<Omit<IInput, 'width'>> = ({changeValue, ...props}) => {
    return (
        <input
            type="file"
            {...props}
            onChange={changeValue}
            className={inputStyle.input}
            accept="image/jpeg,image/png">
        </input>
    );
};

export default ImageInput;