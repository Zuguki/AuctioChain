import {FC} from 'react';
import dataStyle from './dataInput.module.css'
import IInput from "../../IInput.ts";

const DataInput: FC<Omit<IInput, 'width'>> = ({changeValue,...props}) => {
    return (
        <input
            type="date"
            {...props}
            className={dataStyle.input}
            onChange={changeValue}
        />
    );
};

export default DataInput;