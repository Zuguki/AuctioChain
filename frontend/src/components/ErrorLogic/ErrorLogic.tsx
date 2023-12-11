import React, { FC } from 'react';
import BaseButton from '../UI/BaseButton/BaseButton.tsx';
import { AxiosError } from 'axios';
import styleError from './errorLogic.module.css';

interface IErrorLogic {
    err: AxiosError;
}
const ErrorLogic: FC<IErrorLogic> = ({ err }) => {
    return (
        <div className={styleError.position}>
            <p className={styleError.err}>{err.message}</p>
            <p className={styleError.text}>Попробуйте обновить страницу</p>
            <BaseButton onClick={() => window.location.reload()}>
                Обновить страницу
            </BaseButton>
        </div>
    );
};

export default ErrorLogic;
