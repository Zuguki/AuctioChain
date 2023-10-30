import {FC, ReactNode} from 'react';
import styleDiv from './formDiv.module.css'
import BaseButton from "../BaseButton/BaseButton.tsx";

interface IFormDiv {
    title: string,
    textButton: string,
    registration?: boolean
    children:  ReactNode
}

const FormDiv: FC<IFormDiv> = ({title, textButton, registration = false, children}) => {
    return (
        <div className={styleDiv.parent}>
            <div className={styleDiv.formDiv}>
                <h3 className={styleDiv.title}>{title}</h3>
                <div className={styleDiv.align}>
                    {children}
                </div>
                <div className={styleDiv.positionBtn}>
                    <BaseButton>
                        {textButton}
                    </BaseButton>
                </div>
                {registration && <p className={styleDiv.textRegistration}>
                        Еще нет аккаунта.
                        <span className={styleDiv.linkRegistration}>
                            Зарегестрируйтесь
                        </span>
                </p>}
            </div>
        </div>
    );
};

export default FormDiv;