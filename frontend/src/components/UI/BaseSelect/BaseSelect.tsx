import React, {
    ChangeEvent,
    FC,
    InputHTMLAttributes,
    memo,
    ReactElement,
} from "react";
import styleSelect from "./baseSelect.module.css";
import SelectsOption from "../../../hooks/useSelectAuctions/ISelectsOption.ts";

interface ISelect extends InputHTMLAttributes<HTMLSelectElement> {
    title: string;
    name: string;
    selectors: string[] | SelectsOption[];
    changeValue: (e: ChangeEvent<HTMLSelectElement>) => void;
}

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
                        (
                            element: string | SelectsOption,
                        ): ReactElement<HTMLOptionElement> => {
                            if (typeof element === "string") {
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

export default BaseSelect;
