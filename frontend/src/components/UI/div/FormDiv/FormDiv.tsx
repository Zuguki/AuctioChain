import {FC, ReactNode} from 'react';
import styleDiv from './formDiv.module.css'
import BaseButton from "../../BaseButton/BaseButton.tsx";
import {Link, useNavigate} from "react-router-dom";
import ILogicFormDivButton from "./logicFormDivButton.ts";

interface IFormDiv {
    title: string,
    logicButton: ILogicFormDivButton,
    registration?: boolean
    children:  ReactNode
}

const FormDiv: FC<IFormDiv> = ({title, logicButton, registration = false, children}) => {
    const nav = useNavigate();
    return (
        <div className={styleDiv.parent}>
            <div className={styleDiv.formDiv}>
                <h3 className={styleDiv.title}>{title}</h3>
                <div className={styleDiv.align}>
                    {children}
                </div>
                <div className= {!registration ? styleDiv.positionBtn : styleDiv.positionBtnS}>
                    <BaseButton onClick={() => nav(logicButton.path)}>
                        {logicButton.textButton}
                    </BaseButton>
                </div>
                {registration && <p className={styleDiv.textRegistration}>
                        Еще нет аккаунта.
                        <Link to='/authorization/registration' className={styleDiv.linkRegistration}>
                            Зарегестрируйтесь
                        </Link>
                </p>}
            </div>
        </div>
    );
};

export default FormDiv;