import FormInput from "../../../components/UI/inputs/FormInput/FormInput.tsx";
import CardRequirementsPassword from "../CardRequirementsPassword/CardRequirementsPassword.tsx";
import useLogicRequirement from "../CardRequirementsPassword/useLogicRequirement.ts";
import {passwordChars} from "../../../auxiliaryTools/bloclnvalidChar.ts";

const PasswordInputCard = () => {
    const [password, showRequirement, isCorrectPassword, focusInputPassword, blurInputPassword, changeUserValue] = useLogicRequirement();
    console.log(password)
    return (
        <>
            <FormInput
                title='Пароль'
                name='password'
                changeValue={changeUserValue}
                onBlur={blurInputPassword}
                blockChars={passwordChars}
                onFocus={focusInputPassword}
            />
            <CardRequirementsPassword
                show={showRequirement}
                isCorrect={isCorrectPassword}
            />
        </>
    );
};

export default PasswordInputCard;