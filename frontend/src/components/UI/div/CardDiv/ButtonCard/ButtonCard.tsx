import React, { ButtonHTMLAttributes, FC } from "react";
import styleBtn from "./buttonCard.module.css";

const ButtonCard: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,
    ...props
}) => {
    return (
        <button className={styleBtn.btn} {...props}>
            {children}
        </button>
    );
};

export default ButtonCard;
