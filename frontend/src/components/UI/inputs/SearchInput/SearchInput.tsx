import { FC, ForwardedRef, forwardRef, memo } from "react";
import inputStyle from "./searchInput.module.css";
import IInput from "../IInput.ts";
import sizeStyle from "../../../../auxiliaryTools/logicSize.ts";
import { CSSModulesOptions } from "vite";

interface ISearchInput extends Omit<IInput, "title"> {
    isWrite: boolean;
}

const SearchInput: FC<ISearchInput> = memo(
    forwardRef(
        (
            { changeValue, width = "base", isWrite, ...props },
            ref: ForwardedRef<HTMLInputElement>,
        ) => {
            return (
                <>
                    <input
                        style={{ display: "inline-block" }}
                        className={`${inputStyle.input} ${
                            sizeStyle(
                                inputStyle.small as CSSModulesOptions,
                                inputStyle.large as CSSModulesOptions,
                            )[width]
                        }`}
                        placeholder="Поиск"
                        ref={ref}
                        {...props}
                        onChange={changeValue}
                    />
                    {isWrite && (
                        <div className={inputStyle.positionWrite}>
                            <div
                                className="spinner-grow text-secondary"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    )}
                </>
            );
        },
    ),
);

export default SearchInput;
