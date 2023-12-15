import React, { FC } from 'react';
import { AxiosError } from 'axios';
import styleError from './errorLogic.module.css';

interface IErrorLogic {
    err: AxiosError;
}

const ErrorLogic: FC<IErrorLogic> = ({ err }) => {
    return (
        <div className={styleError.position}>
            <p className={styleError.err}>{err.message}</p>
            <p className={styleError.text}>Что-то пошло не так</p>
            <button
                className={styleError.button}
                onClick={() => window.location.reload()}
            />
        </div>
    );
};

export default ErrorLogic;
