import React, {FC} from 'react';
import styleSpinner from './spinner.module.css';

interface ISpinner {
    form?: boolean
}

const Spinner: FC<ISpinner> = ({form = false}) => {
    return (
        <div
            className={`spinner-border text-primary ${form ? styleSpinner.spinnerForm : styleSpinner.spinner}`}
            role="status"
        >
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default Spinner;