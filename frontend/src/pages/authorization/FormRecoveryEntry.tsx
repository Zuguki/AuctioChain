import React, {FC} from 'react';
import FormInput from "../../components/UI/inputs/FormInput/FormInput.tsx";
import FormDiv from "../../components/UI/FormDiv/FormDiv.tsx";

const FormRecoveryEntry: FC = () => {
    return (
        <FormDiv title='Восстановление пароля' textButton='Продолжить'>
            <FormInput title='Введите действительный номер телефона' name='user' changeValue={() => ({})} />
        </FormDiv>
    );
};

export default FormRecoveryEntry;