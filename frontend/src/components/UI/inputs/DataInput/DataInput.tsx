import {FC} from 'react';
import dataStyle from './dataInput.module.css'
import IInput from "../../IInput.ts";

const DataInput: FC<Omit<IInput, 'width'>> = ({changeValue,...props}) => {
    /*const time = new Date()
        const t = time.toLocaleDateString() + 'T' + time.toLocaleTimeString('en-US', { hour12: false,
        hour: "numeric",
        minute: "numeric"});*/
    return (
        <input
            type="datetime-local"
            {...props}
            className={dataStyle.input}
            onChange={changeValue}
        />
    );
};

export default DataInput;