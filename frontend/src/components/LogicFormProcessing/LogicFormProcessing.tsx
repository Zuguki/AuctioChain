import React, { FC } from 'react';
import Spinner from '../UI/Spinner/Spinner.tsx';
import styleCreateAuction from '../../pages/createAuction/pageCreateAuction.module.css';
import { AxiosError } from 'axios';
import styleLogicForm from './logicFormProcessing.module.css';
interface ILogicFormProcessing {
    loading: boolean;
    err: AxiosError | null;
    centerText?: boolean;
}

const LogicFormProcessing: FC<ILogicFormProcessing> = ({
    loading,
    centerText = true,
    err,
}) => {
    return (
        <div className={styleLogicForm.position}>
            {loading && <Spinner form={true} />}
            {err && (
                <p
                    className={`${styleLogicForm.error} ${
                        !centerText && styleLogicForm.left
                    }`}
                >
                    {err.message}
                </p>
            )}
        </div>
    );
};

export default LogicFormProcessing;
