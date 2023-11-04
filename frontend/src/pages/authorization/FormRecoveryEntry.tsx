import React, {FC} from 'react';
import FormInput from "../../components/UI/inputs/FormInput/FormInput.tsx";
import FormDiv from "../../components/UI/div/FormDiv/FormDiv.tsx";
import {Link} from "react-router-dom";
import ILogicFormDivButton from "../../components/UI/div/FormDiv/logicFormDivButton.ts";

const FormRecoveryEntry: FC = () => {
    const logicButton: ILogicFormDivButton = {
        textButton: 'Продолжить',
        path: '/authorization/recovery/code'
    }
    return (
        <FormDiv title='Восстановление пароля' logicButton={logicButton}>
            <FormInput title='Введите действительный номер телефона' name='user' changeValue={() => ({})} />
        </FormDiv>
    );
};

export default FormRecoveryEntry;