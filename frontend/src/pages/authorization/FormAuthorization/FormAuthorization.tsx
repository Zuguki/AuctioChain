import FormDiv from '../../../components/UI/div/FormDiv/FormDiv.tsx';
import FormInput from '../../../components/UI/inputs/FormInput/FormInput.tsx';
import useDataUser from '../../../hooks/useDataUser.ts';
import useAuthResponse from '../../../hooks/API/useAuthResponse.ts';
import { observer } from 'mobx-react-lite';
import PostLoginUser from '../../../API/interfaces/PostLoginUser.ts';
import { Context } from '../../../context/context.ts';
import { useContext, useEffect } from 'react';

const FormAuthorization = observer(() => {
    const { userStore } = useContext(Context);
    const { dataUser, logicFormValue } = useDataUser<PostLoginUser>();
    const { error, logicButton, loading, blurError } = useAuthResponse(
        () => userStore.login(dataUser),
        'Вход',
    );

    return (
        <FormDiv
            title="Вход"
            logicButton={logicButton}
            loading={loading}
            error={error}
            registration
        >
            <p>{userStore.getUser().userId}</p>
            <FormInput
                title="Телефон или имя пользователя"
                name="login"
                autoComplete="on"
                error={error}
                changeValue={logicFormValue}
                errorBlur={blurError}
            />
            <FormInput
                title="Пароль"
                name="password"
                type="password"
                autoComplete="current-password"
                error={error}
                errorBlur={blurError}
                changeValue={logicFormValue}
            />
            {/*<div className={`${err && styleRegistration.marginForgotPassword}`}>
                <Link to='/authorization/recovery' className={styleRegistration.forgotPassword}>Забыли пароль?</Link>
            </div>*/}
        </FormDiv>
    );
});

export default FormAuthorization;
