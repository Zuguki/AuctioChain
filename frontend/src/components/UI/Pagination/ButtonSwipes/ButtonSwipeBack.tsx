import { FC } from "react";
import BaseButtonSwipe from "./BaseButtonSwipe.tsx";
import IButtonSwipe from "./IButtonSwipe.ts";

const ButtonSwipeBack: FC<IButtonSwipe> = ({
    currentPage,
    setCurrentPage,
    ...props
}) => {
    const clickSwipe = (): void => {
        if (currentPage == 1) {
            return;
        }
        setCurrentPage(currentPage - 1);
    };
    return (
        <BaseButtonSwipe
            back
            currentPage={currentPage}
            {...props}
            onClick={clickSwipe}
        />
    );
};

export default ButtonSwipeBack;
