import {
    FC,
    ForwardedRef,
    forwardRef,
    InputHTMLAttributes,
    ReactNode,
} from "react";
import styleCheckbox from "./checkboxInput.module.css";

interface ICheckBoxInput extends InputHTMLAttributes<HTMLInputElement> {
    children: ReactNode;
}

const CheckboxInput: FC<ICheckBoxInput> = forwardRef(
    ({ children, ...props }, ref: ForwardedRef<HTMLInputElement>) => {
        return (
            <div className={styleCheckbox.div}>
                <input
                    type="checkbox"
                    className="form-check-input"
                    {...props}
                    ref={ref}
                />
                <label className={styleCheckbox.label}>{children}</label>
            </div>
        );
    },
);

export default CheckboxInput;
