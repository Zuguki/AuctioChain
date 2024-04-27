import React, { FC } from "react";
import BaseButtonSwipe from "./BaseButtonSwipe.tsx";
import IButtonSwipe from "./IButtonSwipe.ts";

const ButtonSwipeUp: FC<IButtonSwipe & { endPage: number }> = ({
    currentPage,
    setCurrentPage,
    endPage,
    ...props
}) => {
    const clickSwipe = (): void => {
        if (currentPage === endPage) {
            return;
        }
        setCurrentPage(currentPage + 1);
    };
    return (
        <BaseButtonSwipe
            currentPage={currentPage}
            {...props}
            onClick={clickSwipe}
        />
    );
};

export default ButtonSwipeUp;
