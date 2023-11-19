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
import {IUser, PostLoginUser} from "../../../authorizationLogic/IUser.ts";
import {observer} from "mobx-react-lite";

const FormAuthorization = () => {
    const {store} = useContext(Context);
    const [err, setErr] = useState<AxiosError | null>(null);
    const logicButton: ILogicFormDivButton = {
        textButton: 'Войти',
        path: '/',
        logicClick: () => {
            store.login(dataUser)
                .then((err: (AxiosError | null)) => setErr(() => err));
        }
    }
    const [dataUser, setDataUser] = useState<PostLoginUser>({} as PostLoginUser);
    const logicFormValue = (e: ChangeEvent<HTMLInputElement>): void => {
        const { value, name} = e.target;
        setDataUser((prevDataUser) => ({...prevDataUser, [name]: value}));
    }
    const nav = useNavigate();
    store.isAuth && nav('/auctions');
    return (
        <FormDiv title='Вход' logicButton={logicButton} error={err} registration>
            <FormInput title='Телефон или имя пользователя' name='login' onFocus={() => setErr(() => null)}  error={err} changeValue={logicFormValue} />
            <FormInput title='Пароль' name='password' type='password' error={err} onFocus={() => setErr(() => null)} changeValue={logicFormValue} />
            <div className={`${err && styleRegistration.marginForgotPassword}`}>
                <Link to='/authorization/recovery' className={styleRegistration.forgotPassword}>Забыли пароль?</Link>
            </div>
        </FormDiv>
    );
};

export default FormAuthorization;