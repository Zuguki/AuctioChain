import {FC} from 'react';
import dataStyle from './dataInput.module.css'
import {IInput} from "../../logicInput.ts";

const DataInput: FC<IInput> = ({changeValue,...props}) => {
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