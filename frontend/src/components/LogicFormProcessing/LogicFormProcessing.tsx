import React, { FC } from 'react';
import Spinner from '../UI/Spinner/Spinner.tsx';
import styleCreateAuction from '../../pages/createAuction/pageCreateAuction.module.css';
import { AxiosError } from 'axios';
import styleLogicForm from './logicFormProcessing.module.css';
interface ILogicFormProcessing {
    loading: boolean;
    err: AxiosError | null;
}

const LogicFormProcessing: FC<ILogicFormProcessing> = ({ loading, err }) => {
    return (
        <div>
            {loading && <Spinner form={true} />}
            {err && <p className={styleLogicForm.error}>{err.message}</p>}
        </div>
    );
};

export default LogicFormProcessing;
