import React, {
    ChangeEvent,
    FC,
    InputHTMLAttributes,
    memo,
    ReactElement,
} from 'react';
import styleSelect from './baseSelect.module.css';

const BaseSelect: FC<ISelect> = memo(
    ({ title, selectors, changeValue, ...props }) => {
        return (
            <div className={styleSelect.div}>
                <label className={styleSelect.title}>{title}</label>
                <select
                    className={styleSelect.select}
                    {...props}
                    onChange={changeValue}
                >
                    <option>—</option>
                    {selectors.map(
                        (element): ReactElement<HTMLOptionElement> => {
                            if (typeof element === 'string') {
                                return (
                                    <option key={element} value={element}>
                                        {element}
                                    </option>
                                );
                            }
                            return (
                                <option
                                    key={element.value}
                                    value={element.value}
                                >
                                    {element.element}
                                </option>
                            );
                        },
                    )}
                </select>
            </div>
        );
    },
);

interface ISelect extends InputHTMLAttributes<HTMLSelectElement> {
    title: string;
    name: string;
    selectors: string[] | { element: string; value: number }[];
    changeValue: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default BaseSelect;
