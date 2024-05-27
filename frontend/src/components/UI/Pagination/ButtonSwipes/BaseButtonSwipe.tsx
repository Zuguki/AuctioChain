import { FC } from "react";
import stylePagination from "../pagination.module.css";
import IButtonSwipe from "./IButtonSwipe.ts";

const BaseButtonSwipe: FC<Omit<IButtonSwipe, "setCurrentPage">> = ({
    back = false,
    ...props
}) => {
    return (
        <button
            className={`${stylePagination.btnSwipe} ${
                back && stylePagination.btnSwipeBack
            }`}
            {...props}
        ></button>
    );
};

export default BaseButtonSwipe;
