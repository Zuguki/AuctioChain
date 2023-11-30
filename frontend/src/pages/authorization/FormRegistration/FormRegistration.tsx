import FormDiv from '../../../components/UI/div/FormDiv/FormDiv.tsx';
import FormInput from '../../../components/UI/inputs/FormInput/FormInput.tsx';
import CheckboxInput from '../../../components/UI/inputs/CheckboxInput/CheckboxInput.tsx';
import styleRegistration from '../FormAuthorization/formAuthorization.module.css';
import PasswordInputCard from '../PasswordInputCard/PasswordInputCard.tsx';
import { PostRegistrationUser } from '../../../authorizationLogic/PostAuth.ts';
import useDataUser from '../../../hooks/useDataUser.ts';
import useAuthResponse from '../../../hooks/API/useAuthResponse.ts';
import React, { useEffect } from 'react';
import { userStore } from '../../../context/contextUser.ts';

const FormRegistration = () => {
    const { dataUser, logicFormValue } = useDataUser<PostRegistrationUser>();
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
                blurError={blurError}
                changeValue={logicFormValue}
            />
            <FormInput
                title="Почта"
                name="email"
                type="email"
                error={error}
                blurError={blurError}
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
                blurError={blurError}
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
