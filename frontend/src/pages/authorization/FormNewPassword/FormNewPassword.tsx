import {FC} from 'react';
import FormDiv from "../../../components/UI/div/FormDiv/FormDiv.tsx";
import FormInput from "../../../components/UI/inputs/FormInput/FormInput.tsx";
import PasswordInputCard from "../PasswordInputCard/PasswordInputCard.tsx";
import logicButtonForm from "../logicButtonForm.ts";


const FormNewPassword: FC = () => {
    return (
        <FormDiv title='Восстановление пароля' logicButton={logicButtonForm('Изменить', '/')}>
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