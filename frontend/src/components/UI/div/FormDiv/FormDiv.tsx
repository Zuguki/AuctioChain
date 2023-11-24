import React, {FC, FormEvent, ReactNode, useContext, useState} from 'react';
import styleDiv from './formDiv.module.css'
import BaseButton from "../../BaseButton/BaseButton.tsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ILogicFormDivButton from "./logicFormDivButton.ts";
import {AxiosError} from "axios";
import {Context} from "../../../../context/contextApp.ts";
import Spinner from "../../Spinner/Spinner.tsx";

interface IFormDiv {
    title: string,
    logicButton: ILogicFormDivButton,
    registration?: boolean,
    error: AxiosError | null,
    children:  ReactNode
}

const FormDiv: FC<IFormDiv> = ({title, logicButton, error, registration = false, children}) => {
    const {userStore} = useContext(Context);
    const load: boolean = userStore.getLoading();
    return (
        <form className={styleDiv.parent} onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
            <div className={styleDiv.formDiv}>
                <h3
                    className={`${styleDiv.title} ${error && styleDiv.titleError}`}
                >
                    {title}
                </h3>
                {error && <p className={styleDiv.error}>{error.message}</p>}
                {load && <Spinner form={true} />}
                <div
                    className={styleDiv.align}
                >
                    {children}
                </div>
                <div
                    className={!registration ? styleDiv.positionBtn : styleDiv.positionBtnS}
                >
                    <BaseButton
                        type='submit'
                        disabled={load}
                        onClick={() => logicButton.logicClick()}
                    >
                        {logicButton.textButton}
                    </BaseButton>
                </div>
                {registration && <p className={styleDiv.textRegistration}>
                        Еще нет аккаунта.
                        <Link to={`/authorization/registration`} className={styleDiv.linkRegistration}>
                            Зарегестрируйтесь
                        </Link>
                </p>}
            </div>
        </form>
    );
};

export default FormDiv;