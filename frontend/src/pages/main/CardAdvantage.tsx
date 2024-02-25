import React, { FC, HTMLAttributes } from "react";
import styleMain from "./mainPage.module.css";

interface ICardAdvantage extends HTMLAttributes<HTMLDivElement> {
    title: string;
    text: string;
}

const CardAdvantage: FC<ICardAdvantage> = ({ title, text, ...props }) => {
    return (
        <div {...props} className={styleMain.cardAdvantage}>
            <div>
                <h6>{title}</h6>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default CardAdvantage;
