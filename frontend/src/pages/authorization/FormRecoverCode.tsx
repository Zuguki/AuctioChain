import React from 'react';
import FormDiv from "../../components/UI/div/FormDiv/FormDiv.tsx";
import FormInput from "../../components/UI/inputs/FormInput/FormInput.tsx";
import ReactCodeInput from "react-code-input";
import CodeInput from "../../components/UI/inputs/CodeInput/CodeInput.tsx";
import ILogicFormDivButton from "../../components/UI/div/FormDiv/logicFormDivButton.ts";
import logicButtonForm from "./logicButtonForm.ts";

const FormRecoverCode = () => {
    return (
        <FormDiv title='Восстановление пароля' logicButton={logicButtonForm('Продолжить', '/authorization/recovery/newPassword')}>
            <CodeInput>Введите код указанный в сообщении</CodeInput>
        </FormDiv>
    );
};

export default FormRecoverCode;