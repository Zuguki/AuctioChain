import FormDiv from '../../../components/UI/div/FormDiv/FormDiv.tsx';
import FormInput from '../../../components/UI/inputs/FormInput/FormInput.tsx';
import CheckboxInput from '../../../components/UI/inputs/CheckboxInput/CheckboxInput.tsx';
import styleRegistration from '../FormAuthorization/formAuthorization.module.css';
import PasswordInputCard from '../PasswordInputCard/PasswordInputCard.tsx';
import useDataUser from '../../../hooks/useDataUser.ts';
import useAuthResponse from '../../../hooks/API/useAuthResponse.ts';
import { userStore } from '../../../context/context.ts';
import IPostRegistrationUser from '../../../API/interfaces/IPostRegistrationUser.ts';

const FormRegistration = () => {
    const { dataUser, logicFormValue } = useDataUser<IPostRegistrationUser>();
    const { error, logicButton, blurError, loading } = useAuthResponse(
        () => userStore.registration(dataUser),
        'Зарегестрироваться',
    );

    return (
        <FormDiv
            title="Регистрация"
            logicButton={logicButton}
            error={error}
            loading={loading}
        >
            <FormInput
                title="Имя пользователя"
                name="userName"
                error={error}
                errorBlur={blurError}
                changeValue={logicFormValue}
            />
            <FormInput
                title="Почта"
                name="email"
                type="email"
                error={error}
                errorBlur={blurError}
                changeValue={logicFormValue}
            />
            <PasswordInputCard
                error={error}
                blurError={blurError}
                changeValue={logicFormValue}
            />
            <FormInput
                title="Повторите пароль"
                name="passwordConfirm"
                error={error}
                errorBlur={blurError}
                changeValue={logicFormValue}
            />
            <CheckboxInput required>
                <p style={{ display: 'inline' }}>
                    Принимаете{' '}
                    <span className={styleRegistration.link}>
                        {' '}
                        условия соглашения
                    </span>{' '}
                    сайта
                </p>
            </CheckboxInput>
        </FormDiv>
    );
};

export default FormRegistration;
