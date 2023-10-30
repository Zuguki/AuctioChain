import React from 'react';
import FormDiv from "../../components/UI/FormDiv/FormDiv.tsx";
import FormInput from "../../components/UI/inputs/FormInput/FormInput.tsx";
import ReactCodeInput from "react-code-input";
import CodeInput from "../../components/UI/inputs/CodeInput/CodeInput.tsx";

const FormRecoverCode = () => {
    return (
        <FormDiv title='Восстановление пароля' textButton='Продолжить'>
            <CodeInput>Введите код указанный в сообщении</CodeInput>
        </FormDiv>
    );
};

export default FormRecoverCode;