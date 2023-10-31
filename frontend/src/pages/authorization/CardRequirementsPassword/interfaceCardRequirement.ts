import useLogicRequirement from "./useLogicRequirement.ts";
import {ChangeEvent} from "react";

interface ICorrectPassword {
    lengthPassword: boolean,
    haveUpCase: boolean,
    haveNumber: boolean
}

type IUseLogicRequirement = [
    password: string | null,
    showRequirement: boolean,
    isCorrectPassword: ICorrectPassword,
    focusInputPassword: () => void,
    blurInputPassword: () => void,
    changeUserValue: (e: ChangeEvent<HTMLInputElement>) => void
];

interface IPasswords {
    userPassword: string,
    correctPassword: string | null
}

export {
    type ICorrectPassword,
    type IUseLogicRequirement,
    type IPasswords
}