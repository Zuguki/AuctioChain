import React, {FC, useEffect, useRef, useState} from 'react';
import FormDiv from "../../../components/UI/FormDiv/FormDiv.tsx";
import FormInput from "../../../components/UI/inputs/FormInput/FormInput.tsx";
import CardRequirementsPassword from "../CardRequirementsPassword/CardRequirementsPassword.tsx";
import useLogicRequirement from "../CardRequirementsPassword/useLogicRequirement.ts";
import PasswordInputCard from "../PasswordInputCard/PasswordInputCard.tsx";


const FormNewPassword: FC = () => {
    return (
        <FormDiv title='Восстановление пароля' textButton='Изменить'>
            <PasswordInputCard />
            <FormInput
                title='Повторите пароль'
                name='repeatpassword'
                changeValue={() => ({})}
            />
        </FormDiv>
    );
};

export default FormNewPassword;