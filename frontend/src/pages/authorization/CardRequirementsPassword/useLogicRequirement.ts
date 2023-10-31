import {ChangeEvent, useEffect, useState} from "react";
import {ICorrectPassword, IPasswords, IUseLogicRequirement} from "./interfaceCardRequirement.ts";
import {hasNumber, hasUppercase} from "../../../auxiliaryTools/hasSymbol.ts";


const useLogicRequirement = (): IUseLogicRequirement => {
    const [showRequirement, setShowRequirement] = useState<boolean>(false);
    const [passwords, setPasswords] = useState<IPasswords>({
        userPassword: '',
        correctPassword: null
    });

    const [isCorrectPassword, setIsCorrectPassword] = useState<ICorrectPassword>({
        lengthPassword: false,
        haveUpCase: false,
        haveNumber: false
    });

    const blurInputPassword = () => setShowRequirement((): boolean => false);
    const focusInputPassword = () => setShowRequirement((): boolean => true);
    const changeUserValue = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswords((prevState: IPasswords): IPasswords => ({...prevState, userPassword: e.target.value}));
        Object.values(isCorrectPassword).every((val) => val === true) && setPasswords((prevState: IPasswords): IPasswords => ({...prevState, correctPassword: e.target.value}));
    }


    useEffect(() => {
        const newIsCorrect: ICorrectPassword = {...isCorrectPassword};

        newIsCorrect["lengthPassword"] = passwords.userPassword.length >= 8;
        newIsCorrect["haveUpCase"] = hasUppercase(passwords.userPassword);
        newIsCorrect["haveNumber"] = hasNumber(passwords.userPassword);

        if (JSON.stringify(newIsCorrect) !== JSON.stringify(isCorrectPassword)) {
            setIsCorrectPassword(() => newIsCorrect);
        }
    }, [passwords]);

    useEffect(() => {
        Object.values(isCorrectPassword).every((val) => val === true)
            ? setPasswords((prevState: IPasswords): IPasswords =>({...prevState, correctPassword: prevState.userPassword}))
            : setPasswords((prevState: IPasswords): IPasswords => ({...prevState, correctPassword: null}))
    }, [isCorrectPassword])

    return [
        passwords.correctPassword,
        showRequirement,
        isCorrectPassword,
        focusInputPassword,
        blurInputPassword,
        changeUserValue
    ];
}

export default useLogicRequirement;