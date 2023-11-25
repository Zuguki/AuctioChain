import { FC, InputHTMLAttributes, ReactNode } from 'react';
import styleCheckbox from './checkboxInput.module.css';
interface ICheckBoxInput extends InputHTMLAttributes<HTMLInputElement> {
    children: ReactNode;
}
const CheckboxInput: FC<ICheckBoxInput> = ({ children, ...props }) => {
    return (
        <div className={styleCheckbox.div}>
            <input type="checkbox" className="form-check-input" {...props} />
            <label className={styleCheckbox.label}>{children}</label>
        </div>
    );
};

export default CheckboxInput;
