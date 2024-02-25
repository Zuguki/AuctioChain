import { ButtonHTMLAttributes } from "react";

interface IButtonSwipe extends ButtonHTMLAttributes<HTMLButtonElement> {
    back?: boolean;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export default IButtonSwipe;
