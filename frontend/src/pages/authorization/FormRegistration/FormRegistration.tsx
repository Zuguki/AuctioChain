import React, {ChangeEvent, KeyboardEvent} from 'react';
import FormDiv from "../../../components/UI/div/FormDiv/FormDiv.tsx";
import FormInput from "../../../components/UI/inputs/FormInput/FormInput.tsx";
import CheckboxInput from "../../../components/UI/inputs/CheckboxInput/CheckboxInput.tsx";
import styleRegistration from "../FormAuthorization/formAuthorization.module.css";
import PasswordInputCard from "../PasswordInputCard/PasswordInputCard.tsx";
import ILogicFormDivButton from "../../../components/UI/div/FormDiv/logicFormDivButton.ts";

const FormRegistration = () => {
    const logicButton: ILogicFormDivButton = {
        textButton: 'Зарегестрироваться',
        path: '/'
    }

    return (
        <FormDiv title='Регистрация' logicButton={logicButton}>
            <FormInput title='Имя пользователя' name='userName' changeValue={() => ({})} />
            <FormInput title='Телефон' name='phone' type='tel' changeValue={() => ({})} />
            <PasswordInputCard />
            <CheckboxInput><p style={{display: "inline"}}>Принимаете <span className={styleRegistration.link}> условия соглашения</span> сайта</p></CheckboxInput>
        </FormDiv>
    );
};

export default FormRegistration;