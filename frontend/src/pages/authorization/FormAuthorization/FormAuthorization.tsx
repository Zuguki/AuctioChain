import FormDiv from '../../../components/UI/div/FormDiv/FormDiv.tsx';
import FormInput from '../../../components/UI/inputs/FormInput/FormInput.tsx';
import useDataUser from '../../../hooks/useDataUser.ts';
import useAuthResponse from '../../../hooks/useAuthResponse.ts';
import { observer } from 'mobx-react-lite';
import PostLoginUser from '../../../authorizationLogic/postAuth/PostLoginUser.ts';

const FormAuthorization = observer(() => {
    const { dataUser, logicFormValue } = useDataUser<PostLoginUser>();
    const { err, logicButton, blurErr } = useAuthResponse(dataUser, 'Вход');
    //userAuth();

    return (
        <FormDiv
            title="Вход"
            logicButton={logicButton}
            error={err}
            registration
        >
            <FormInput
                title="Телефон или имя пользователя"
                name="login"
                autoComplete="on"
                error={err}
                changeValue={logicFormValue}
                blurError={blurErr}
            />
            <FormInput
                title="Пароль"
                name="password"
                type="password"
                autoComplete="current-password"
                error={err}
                blurError={blurErr}
                changeValue={logicFormValue}
            />
            {/*<div className={`${err && styleRegistration.marginForgotPassword}`}>
                <Link to='/authorization/recovery' className={styleRegistration.forgotPassword}>Забыли пароль?</Link>
            </div>*/}
        </FormDiv>
    );
});

export default FormAuthorization;
