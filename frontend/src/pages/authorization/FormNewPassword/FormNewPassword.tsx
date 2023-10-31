import React, {FC, useEffect, useRef, useState} from 'react';
import FormDiv from "../../../components/UI/FormDiv/FormDiv.tsx";
import FormInput from "../../../components/UI/inputs/FormInput/FormInput.tsx";
import CardRequirementsPassword from "../CardRequirementsPassword/CardRequirementsPassword.tsx";
import useLogicRequirement from "../CardRequirementsPassword/useLogicRequirement.ts";


const FormNewPassword: FC = () => {
    const [password, showRequirement, isCorrectPassword, focusInput, blurPassword, changeUserValue] = useLogicRequirement();
    console.log(password);
    return (
        <FormDiv title='Восстановление пароля' textButton='Изменить'>
            <FormInput title='Введите пароль' name='newpassword' changeValue={changeUserValue}
                       onBlur={blurPassword}
                       onFocus={focusInput} />
            <CardRequirementsPassword show={showRequirement} isCorrect={isCorrectPassword}/>
            <FormInput
                title='Повторите пароль'
                name='repeatpassword'
                changeValue={() => ({})}
            />
        </FormDiv>
    );
};

export default FormNewPassword;