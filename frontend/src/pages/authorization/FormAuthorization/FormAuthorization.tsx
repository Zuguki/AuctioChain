import React from 'react';
import FormDiv from "../../../components/UI/FormDiv/FormDiv.tsx";
import FormInput from "../../../components/UI/inputs/FormInput/FormInput.tsx";
import styleRegistration from './formAuthorization.module.css';
import CheckboxInput from "../../../components/UI/inputs/CheckboxInput/CheckboxInput.tsx";

const FormAuthorization = () => {
    return (
        <FormDiv title={'Вход'} textButton={'Войти'} registration>
            <FormInput title='Телефон или имя пользователя' name='login' changeValue={() => ({})} />
            <FormInput title='Пароль' name='password' type='password' changeValue={() => ({})} />
            <p className={styleRegistration.forgotPassword}>Забыли пароль?</p>
        </FormDiv>
    );
};

export default FormAuthorization;