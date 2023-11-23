import FormDiv from "../../../components/UI/div/FormDiv/FormDiv.tsx";
import FormInput from "../../../components/UI/inputs/FormInput/FormInput.tsx";
import CheckboxInput from "../../../components/UI/inputs/CheckboxInput/CheckboxInput.tsx";
import styleRegistration from "../FormAuthorization/formAuthorization.module.css";
import PasswordInputCard from "../PasswordInputCard/PasswordInputCard.tsx";
import {PostRegistrationUser} from "../../../authorizationLogic/PostAuth.ts";
import useDataUser from "../../../hooks/useDataUser.ts";
import useAuthResponse from "../../../hooks/useAuthResponse.ts";
import React, {useEffect} from "react";

const FormRegistration = () => {

    const {dataUser, logicFormValue} = useDataUser<PostRegistrationUser>();
    const {err, logicButton, blurErr} = useAuthResponse(dataUser, 'Зарегестрироваться');

   /* useEffect((): void => {
        userAuth();
    }, [userAuth]);*/

    return (
        <FormDiv
            title='Регистрация'
            logicButton={logicButton}
            error={err}
        >
            <FormInput
                title='Имя пользователя'
                name='userName'
                error={err}
                blurError={blurErr}
                changeValue={logicFormValue}
            />
            <FormInput
                title='Почта'
                name='email'
                type='email'
                error={err}
                blurError={blurErr}
                changeValue={logicFormValue}
            />
            <PasswordInputCard
                error={err}
                blurError={blurErr}
                changeValue={logicFormValue}
            />
            <FormInput
                title='Повторите пароль'
                name='passwordConfirm'
                error={err}
                blurError={blurErr}
                changeValue={logicFormValue}
            />
            <CheckboxInput required>
                <p style={{display: "inline"}}>
                    Принимаете <span className={styleRegistration.link}> условия соглашения</span> сайта
                </p>
            </CheckboxInput>
        </FormDiv>
    );
};

export default FormRegistration;