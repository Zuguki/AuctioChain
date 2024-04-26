import React, { FC, HTMLAttributes } from "react";
import styleSpinner from "./spinner.module.css";

interface ISpinner extends HTMLAttributes<HTMLDivElement> {
    form?: boolean;
}

const Spinner: FC<ISpinner> = ({ form = false, ...props }) => {
    return (
        <div
            className={`spinner-border text-primary ${
                form ? styleSpinner.spinnerForm : styleSpinner.spinner
            }`}
            {...props}
            role="status"
        >
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default Spinner;
