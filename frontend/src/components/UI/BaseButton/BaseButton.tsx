import { FC } from 'react';
import styleBtn from './baseButton.module.css';
import IBaseButton from './IBaseButton.ts';

const BaseButton: FC<IBaseButton> = ({
    red = false,
    small = false,
    children,
    ...props
}) => {
    return (
        <button
            className={`${styleBtn.base} ${small && styleBtn.small} ${
                red && styleBtn.red
            }`}
            {...props}
        >
            {children}
        </button>
    );
};

export default BaseButton;
