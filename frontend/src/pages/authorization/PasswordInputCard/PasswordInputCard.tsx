import FormInput from "../../../components/UI/inputs/FormInput/FormInput.tsx";
import CardRequirementsPassword from "../CardRequirementsPassword/CardRequirementsPassword.tsx";
import useLogicRequirement from "../CardRequirementsPassword/useLogicRequirement.ts";
import {passwordChars} from "../../../auxiliaryTools/bloclnvalidChar.ts";
import {AxiosError} from "axios";
import {ChangeEvent, FC} from "react";

interface IPasswordInputCard {
    error: AxiosError | null;
    changeValue: (e: ChangeEvent<HTMLInputElement>) => void;
}
const PasswordInputCard: FC<IPasswordInputCard> = ({error, changeValue }) => {
    const {showRequirement, isCorrectPassword, focusInputPassword, blurInputPassword, changeUserValue} = useLogicRequirement();
    return (
        <>
            <FormInput
                error={error}
                title='Пароль'
                name='password'
                changeValue={(e: ChangeEvent<HTMLInputElement>): void => {
                    changeValue(e);
                    changeUserValue(e);
                }}
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