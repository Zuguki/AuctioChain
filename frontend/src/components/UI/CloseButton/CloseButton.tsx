import React, {ButtonHTMLAttributes, FC} from 'react';
import {useNavigate} from "react-router-dom";
import styleClose from './closeButton.module.css'
interface ICloseButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    back?: boolean;
}
const CloseButton: FC<ICloseButton> = ({ back = false, ...props}) => {
    const navigate = useNavigate();
    return (
        <button
            {...props}
            onClick={() => navigate(-1)}
            className={`${styleClose.close} ${back && styleClose.back}`}>
        </button>
    );
};

export default CloseButton;