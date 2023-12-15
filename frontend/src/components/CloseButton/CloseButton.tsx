import React, { ButtonHTMLAttributes, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styleClose from './closeButton.module.css';

interface ICloseButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    logicClick?: () => void;
    back?: boolean;
}

const CloseButton: FC<ICloseButton> = ({
    back = false,
    logicClick,
    ...props
}) => {
    const navigate = useNavigate();
    const clickClose = (): void => {
        if (!logicClick) {
            navigate(-1);
            return;
        }
        logicClick();
    };

    return (
        <button
            {...props}
            onClick={clickClose}
            className={`${styleClose.close} ${back && styleClose.back}`}
        ></button>
    );
};

export default CloseButton;
