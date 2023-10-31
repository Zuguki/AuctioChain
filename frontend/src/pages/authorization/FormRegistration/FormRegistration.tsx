import React, {ChangeEvent, KeyboardEvent} from 'react';
import FormDiv from "../../../components/UI/FormDiv/FormDiv.tsx";
import FormInput from "../../../components/UI/inputs/FormInput/FormInput.tsx";
import CheckboxInput from "../../../components/UI/inputs/CheckboxInput/CheckboxInput.tsx";
import styleRegistration from "../FormAuthorization/formAuthorization.module.css";
import CardRequirementsPassword from "../CardRequirementsPassword/CardRequirementsPassword.tsx";
import useLogicRequirement from "../CardRequirementsPassword/useLogicRequirement.ts";
import {ICorrectPassword} from "../CardRequirementsPassword/interfaceCardRequirement.ts";

const FormRegistration = () => {
    const [password, showRequirement, isCorrectPassword, focusInputPassword, blurInputPassword, changeUserValue] = useLogicRequirement();
    const blockInvalidChar = (e: KeyboardEvent<HTMLElement>) => ['e', 'E', '+', '-', '.', ','].includes(e.key) && e.preventDefault();
    return (
        <FormDiv title='Регистрация' textButton='Зарегестрироваться'>
            <FormInput title='Имя пользователя' name='userName' changeValue={() => ({})} />
            <FormInput title='Телефон' name='phone' type='tel' changeValue={() => ({})} />
            <FormInput title='Пароль' name='password' changeValue={changeUserValue} onBlur={blurInputPassword}  onKeyDown={blockInvalidChar} onFocus={focusInputPassword}/>
            <CardRequirementsPassword  show={showRequirement} isCorrect={isCorrectPassword}/>
            <CheckboxInput><p style={{display: "inline"}}>Принимаете <span className={styleRegistration.link}> условия соглашения</span> сайта</p></CheckboxInput>
        </FormDiv>
    );
};

export default FormRegistration;