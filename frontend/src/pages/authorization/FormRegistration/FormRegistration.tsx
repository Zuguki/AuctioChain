import FormDiv from "../../../components/UI/div/FormDiv/FormDiv.tsx";
import FormInput from "../../../components/UI/inputs/FormInput/FormInput.tsx";
import CheckboxInput from "../../../components/UI/inputs/CheckboxInput/CheckboxInput.tsx";
import styleRegistration from "../FormAuthorization/formAuthorization.module.css";
import PasswordInputCard from "../PasswordInputCard/PasswordInputCard.tsx";
import useDataUser from "../../../hooks/useDataUser.ts";
import useAuthResponse from "../../../hooks/API/useAuthResponse.ts";
import { Context } from "@/context/context.ts";
import IPostRegistrationUser from "../../../API/interfaces/request/IPostRegistrationUser.ts";
import CloseButton from "../../../components/CloseButton/CloseButton.tsx";
import PathApp from "../../../routes/pathApp/PathApp.ts";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RegistrationNotification } from "@/appLogic/notificationLogic/VarietesNotifications.ts";

const FormRegistration = () => {
    const nav = useNavigate();
    const { userStore } = useContext(Context);
    const { dataUser, logicFormValue } = useDataUser<IPostRegistrationUser>();

    const { error, logicButton, blurError, loading } = useAuthResponse(
        () => userStore.registration(dataUser),
        "Зарегестрироваться",
        userStore.isAuth,
        RegistrationNotification(userStore.user.name),
    );

    return (
        <FormDiv
            title="Регистрация"
            logicButton={logicButton}
            errorBlur={blurError}
            error={error}
            loading={loading}
        >
            <div className={styleRegistration.positionClose}>
                <CloseButton
                    back
                    logicClick={() => nav(PathApp.authorization)}
                />
            </div>
            <FormInput
                title="Имя пользователя (max: 10)"
                name="userName"
                autoFocus={true}
                error={error}
                errorBlur={blurError}
                changeValue={logicFormValue}
                maxLength={10}
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
                <p className={styleRegistration.checkbox}>
                    Принимаете{" "}
                    <span className={styleRegistration.link}>
                        {" "}
                        условия соглашения
                    </span>{" "}
                    сайта
                </p>
            </CheckboxInput>
        </FormDiv>
    );
};

export default FormRegistration;
