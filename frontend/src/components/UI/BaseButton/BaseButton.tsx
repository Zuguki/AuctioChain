import { ButtonHTMLAttributes, FC } from 'react';
import btnStyle from './baseButton.module.css';
interface IBaseButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    red?: boolean;
}
const BaseButton: FC<IBaseButton> = ({ red = false, children, ...props }) => {
    return (
        <button
            className={`${btnStyle.base} ${red && btnStyle.red}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default BaseButton;
