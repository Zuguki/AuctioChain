import {FC} from 'react';
import inputStyle from './searchInput.module.css';
import IInput from "../../IInput.ts";
import sizeStile from "../../../../auxiliaryTools/logicSize.ts";

const SearchInput: FC<IInput> = ({changeValue, width = 'base', ...props}) => {
    return (
        <input
            className={`${inputStyle.input} ${sizeStile(inputStyle.small, inputStyle.large)[width]}`}
            placeholder='Поиск'
            {...props}
            onChange={changeValue}
        />
    );
};

export default SearchInput;