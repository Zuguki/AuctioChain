import React, { ButtonHTMLAttributes, FC, MouseEvent } from 'react';
import stylePagination from './pagination.module.css';

interface IButtonPage extends ButtonHTMLAttributes<HTMLButtonElement> {
    current?: boolean;
    children: number | '...';
    sendCurrentPage: (page: number) => void;
}

const ButtonPage: FC<IButtonPage> = ({
    children,
    current,
    sendCurrentPage,
    ...props
}) => {
    const style: string = `${stylePagination.number} ${
        current && stylePagination.currentNumber
    }`;
    const clickButton = (e: MouseEvent<HTMLButtonElement>): void => {
        if (e.target.value === '...') {
            return;
        }
        sendCurrentPage(Number(e.target.value));
    };
    return (
        <div className={stylePagination.blockHeight}>
            <button className={style} {...props} onClick={clickButton}>
                {children}
            </button>
            {current && <div className={stylePagination.line}></div>}
        </div>
    );
};

export default ButtonPage;
