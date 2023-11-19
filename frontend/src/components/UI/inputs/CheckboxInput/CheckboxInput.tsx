import {FC, ReactNode} from 'react';
import styleCheckbox from './checkboxInput.module.css'
interface ICheckBoxInput {
    children: ReactNode
}
const CheckboxInput: FC<ICheckBoxInput> = ({children}) => {
    return (
        <div className={styleCheckbox.div}>
            <input type='checkbox' className="form-check-input" required/>
            <label className={styleCheckbox.label}>{children}</label>
        </div>
    );
};

export default CheckboxInput;