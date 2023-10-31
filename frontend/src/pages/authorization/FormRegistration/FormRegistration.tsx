import React, {ChangeEvent, KeyboardEvent} from 'react';
import FormDiv from "../../../components/UI/FormDiv/FormDiv.tsx";
import FormInput from "../../../components/UI/inputs/FormInput/FormInput.tsx";
import CheckboxInput from "../../../components/UI/inputs/CheckboxInput/CheckboxInput.tsx";
import styleRegistration from "../FormAuthorization/formAuthorization.module.css";
import CardRequirementsPassword from "../CardRequirementsPassword/CardRequirementsPassword.tsx";
import useLogicRequirement from "../CardRequirementsPassword/useLogicRequirement.ts";
import {ICorrectPassword} from "../CardRequirementsPassword/interfaceCardRequirement.ts";
import PasswordInputCard from "../PasswordInputCard/PasswordInputCard.tsx";

const FormRegistration = () => {
    return (
        <FormDiv title='Регистрация' textButton='Зарегестрироваться'>
            <FormInput title='Имя пользователя' name='userName' changeValue={() => ({})} />
            <FormInput title='Телефон' name='phone' type='tel' changeValue={() => ({})} />
            <PasswordInputCard />
            <CheckboxInput><p style={{display: "inline"}}>Принимаете <span className={styleRegistration.link}> условия соглашения</span> сайта</p></CheckboxInput>
        </FormDiv>
    );
};

export default FormRegistration;