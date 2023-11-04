import React from 'react';
import FormDiv from "../../../components/UI/div/FormDiv/FormDiv.tsx";
import FormInput from "../../../components/UI/inputs/FormInput/FormInput.tsx";
import styleRegistration from './formAuthorization.module.css';
import CheckboxInput from "../../../components/UI/inputs/CheckboxInput/CheckboxInput.tsx";
import {Link} from "react-router-dom";
import ILogicFormDivButton from "../../../components/UI/div/FormDiv/logicFormDivButton.ts";

const FormAuthorization = () => {
    const logicButton: ILogicFormDivButton = {
        textButton: 'Войти',
        path: '/'
    }
    return (
        <FormDiv title={'Вход'} logicButton={logicButton} registration>
            <FormInput title='Телефон или имя пользователя' name='login' changeValue={() => ({})} />
            <FormInput title='Пароль' name='password' type='password' changeValue={() => ({})} />
            <Link to='/authorization/recovery' className={styleRegistration.forgotPassword}>Забыли пароль?</Link>
        </FormDiv>
    );
};

export default FormAuthorization;