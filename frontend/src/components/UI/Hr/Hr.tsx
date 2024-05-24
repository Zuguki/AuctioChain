import { FC } from "react";
import sizeStyle from "../../../auxiliaryTools/logicSize.ts";
import styleHr from "./hr.module.css";
import { CSSModulesOptions } from "vite";

const Hr: FC<IHr> = ({ width = "base", extraSmall = false }) => {
    return (
        <hr
            className={`${styleHr.hr} ${
                sizeStyle(
                    styleHr.hrSmall as CSSModulesOptions,
                    styleHr.hrLarge as CSSModulesOptions,
                )[width]
            } ${extraSmall && styleHr.hrExtraSmall}`}
        />
    );
};

interface IHr {
    width?: "small" | "base" | "large";
    extraSmall?: boolean;
}

export default Hr;
