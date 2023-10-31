import React, {FC, useEffect, useRef, useState} from 'react';
import FormDiv from "../../../components/UI/FormDiv/FormDiv.tsx";
import FormInput from "../../../components/UI/inputs/FormInput/FormInput.tsx";
import CardRequirementsPassword from "../CardRequirementsPassword/CardRequirementsPassword.tsx";


const FormNewPassword: FC = () => {
    const [showRequirement, setShowRequirement] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [isCorrectPassword, setIsCorrectPassword] = useState({
        lengthPassword: false,
        haveUpCase: false,
        haveNumber: false
    });

    const blurPassword = (e) => {
        setShowRequirement(() => false);
    }

    const changeValue = (e) => {
        setPassword(() => e.target.value);
    }

    useEffect(() => {
        function hasUppercase(str: string) {
            return str.match(/[A-Z]/) !== null;
        }

        function hasNumber(myString: string) {
            return /\d/.test(myString);
        }

        const newIsCorrect = {...isCorrectPassword};

        newIsCorrect["lengthPassword"] = password.length >= 8;
        newIsCorrect["haveUpCase"] = hasUppercase(password);
        newIsCorrect["haveNumber"] = hasNumber(password);

        if (JSON.stringify(newIsCorrect) !== JSON.stringify(isCorrectPassword)) {
            setIsCorrectPassword(() => newIsCorrect);
        }
    }, [password]);

    useEffect(() => {
        console.log(isCorrectPassword)
    }, [isCorrectPassword])

    return (
        <FormDiv title='Восстановление пароля' textButton='Изменить'>
            <FormInput title='Введите пароль' name='newpassword' changeValue={() => ({})} />
            <FormInput
                title='Повторите пароль'
                name='repeatpassword'
                changeValue={changeValue}
                onBlur={blurPassword}
                onFocus={() => setShowRequirement(() => true)}/>
            <CardRequirementsPassword show={showRequirement} isCorrect={isCorrectPassword}/>
        </FormDiv>
    );
};

export default FormNewPassword;