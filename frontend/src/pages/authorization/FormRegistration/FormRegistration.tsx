import React, {ChangeEvent, KeyboardEvent, useContext, useEffect, useState} from 'react';
import FormDiv from "../../../components/UI/div/FormDiv/FormDiv.tsx";
import FormInput from "../../../components/UI/inputs/FormInput/FormInput.tsx";
import CheckboxInput from "../../../components/UI/inputs/CheckboxInput/CheckboxInput.tsx";
import styleRegistration from "../FormAuthorization/formAuthorization.module.css";
import PasswordInputCard from "../PasswordInputCard/PasswordInputCard.tsx";
import ILogicFormDivButton from "../../../components/UI/div/FormDiv/logicFormDivButton.ts";
import {AxiosError} from "axios";
import {Context} from "../../../App.tsx";
import {PostLoginUser, PostRegistrationUser} from "../../../authorizationLogic/IUser.ts";
import {useNavigate} from "react-router-dom";

const FormRegistration = () => {
    const {store} = useContext(Context);
    const nav = useNavigate();
    const logicButton: ILogicFormDivButton = {
        textButton: 'Зарегестрироваться',
        path: '/',
        logicClick: () => {
            console.log(dataUser)
            store.registration(dataUser)
                .then((err: (AxiosError | null)) => setErr(() => err))
        }
    }
    store.isAuth && nav('/auctions');
    const [err, setErr] = useState<AxiosError | null>(null);
    const [dataUser, setDataUser] = useState<PostRegistrationUser>({} as PostRegistrationUser);
    const logicFormValue = (e: ChangeEvent<HTMLInputElement>): void => {
        const { value, name} = e.target;
        setDataUser((prevDataUser) => ({...prevDataUser, [name]: value}));
    }

    return (
        <FormDiv title='Регистрация' logicButton={logicButton} error={err}>
            <FormInput error={err} onFocus={()=> setErr(() => null)} title='Имя пользователя' name='userName' changeValue={logicFormValue} />
            <FormInput error={err} title='Почта' name='email' type='email' changeValue={logicFormValue} />
            <PasswordInputCard error={err} changeValue={logicFormValue} />
            <FormInput title='Повторите пароль' name='passwordConfirm' error={err} changeValue={logicFormValue} />
            <CheckboxInput><p style={{display: "inline"}}>Принимаете <span className={styleRegistration.link}> условия соглашения</span> сайта</p></CheckboxInput>
        </FormDiv>
    );
};

export default FormRegistration;