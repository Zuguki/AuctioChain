import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import FormDiv from "../../../components/UI/div/FormDiv/FormDiv.tsx";
import FormInput from "../../../components/UI/inputs/FormInput/FormInput.tsx";
import styleRegistration from './formAuthorization.module.css';
import CheckboxInput from "../../../components/UI/inputs/CheckboxInput/CheckboxInput.tsx";
import {Link, useNavigate} from "react-router-dom";
import ILogicFormDivButton from "../../../components/UI/div/FormDiv/logicFormDivButton.ts";
import {AxiosError, name} from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Context} from "../../../App.tsx";
import BaseButton from "../../../components/UI/BaseButton/BaseButton.tsx";
import {PostLoginUser} from "../../../authorizationLogic/PostAuth.ts";
import useDataUser from "../../../hooks/useDataUser.ts";
import useAuthResponse from "../../../hooks/useAuthResponse.ts";
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";
import {observer} from "mobx-react-lite";

const FormAuthorization = observer(() => {
    const {dataUser, logicFormValue} = useDataUser<PostLoginUser>();
    const {err, logicButton, blurErr} = useAuthResponse(dataUser, 'Вход');

    return (
        <FormDiv
            title='Вход'
            logicButton={logicButton}
            error={err}
            registration
        >
            <FormInput
                title='Телефон или имя пользователя'
                name='login'
                autoComplete='on'
                error={err}
                changeValue={logicFormValue}
                blurError={blurErr}
            />
            <FormInput
                title='Пароль'
                name='password'
                type='password'
                autoComplete='current-password'
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