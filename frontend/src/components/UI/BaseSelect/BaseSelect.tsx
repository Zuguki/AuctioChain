import React, {
    ChangeEvent,
    FC,
    InputHTMLAttributes,
    ReactElement,
} from 'react';
import styleSelect from './baseSelect.module.css';

const BaseSelect: FC<ISelect> = ({
    title,
    selectors,
    changeValue,
    ...props
}) => {
    return (
        <div className={styleSelect.div}>
            <label className={styleSelect.title}>{title}</label>
            <select
                className={styleSelect.select}
                {...props}
                onChange={changeValue}
            >
                {selectors.map(
                    (element: string): ReactElement<HTMLOptionElement> => (
                        <option key={element} value={element}>
                            {element}
                        </option>
                    ),
                )}
            </select>
        </div>
    );
};

interface ISelect extends InputHTMLAttributes<HTMLSelectElement> {
    title: string;
    name: string;
    selectors: string[];
    changeValue: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default BaseSelect;
