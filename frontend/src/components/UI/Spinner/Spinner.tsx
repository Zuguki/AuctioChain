import React, {FC} from 'react';
import styleSpinner from './spinner.module.css';
const Spinner: FC = () => {
    return (
        <div className={`spinner-border text-primary ${styleSpinner.spinner}`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default Spinner;