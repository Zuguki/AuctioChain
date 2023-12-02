import { FC, FormEvent, ReactNode, useContext } from 'react';
import styleDiv from './formDiv.module.css';
import BaseButton from '../../BaseButton/BaseButton.tsx';
import { Form, Link } from 'react-router-dom';
import ILogicFormDivButton from './logicFormDivButton.ts';
import { AxiosError } from 'axios';
import { Context } from '../../../../context/context.ts';
import LogicFormProcessing from '../../../LogicFormProcessing/LogicFormProcessing.tsx';
import { Simulate } from 'react-dom/test-utils';
import load = Simulate.load;

interface IFormDiv {
    title: string;
    logicButton: ILogicFormDivButton;
    loading: boolean;
    registration?: boolean;
    error: AxiosError | null;
    children: ReactNode;
}

const FormDiv: FC<IFormDiv> = ({
    title,
    logicButton,
    error,
    loading,
    registration = false,
    children,
}) => {
    const { textButton, logicClick } = logicButton;
    return (
        <Form className={styleDiv.parent} onSubmit={() => logicClick()}>
            <div className={styleDiv.formDiv}>
                <h3
                    className={`${styleDiv.title} ${
                        error && styleDiv.titleError
                    }`}
                >
                    {title}
                </h3>
                <LogicFormProcessing loading={loading} err={error} />
                <div className={styleDiv.align}>{children}</div>
                <div
                    className={
                        !registration
                            ? styleDiv.positionBtn
                            : styleDiv.positionBtnS
                    }
                >
                    <BaseButton disabled={loading} type="submit">
                        {textButton}
                    </BaseButton>
                </div>
                {registration && (
                    <p className={styleDiv.textRegistration}>
                        Еще нет аккаунта.
                        <Link
                            to="/registration"
                            className={styleDiv.linkRegistration}
                        >
                            Зарегестрируйтесь
                        </Link>
                    </p>
                )}
            </div>
        </Form>
    );
};

export default FormDiv;
