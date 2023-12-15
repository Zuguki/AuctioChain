import { ButtonHTMLAttributes } from 'react';

interface IBaseButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    red?: boolean;
    small?: boolean;
}

export default IBaseButton;
