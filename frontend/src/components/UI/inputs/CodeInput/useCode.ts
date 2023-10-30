import {ChangeEvent, MutableRefObject, useEffect, useRef, useState} from "react";


type PropsInput = {
    value: string;
    id: string | number;
};

type TUseCode = {
    code: number;
    changeData: (e: ChangeEvent<HTMLInputElement>) => void;
    ref: MutableRefObject<HTMLInputElement[]>;

}

const newUserValue = (userValue: string[], index:number, newValue: string): string[] => {
    const newUserValue: string[] = [...userValue];
    newUserValue[index] = newValue;
    return newUserValue;
};

const focusInput = (ref: MutableRefObject<HTMLInputElement[]>, idValue: number): void => {
    if (idValue === ref.current.length - 1) {
        ref.current[idValue].blur();
        return;
    }

    ref.current[idValue + 1].focus();
}

const useCode = (numbers: number): TUseCode => {
    const [userValue, setUserValue] = useState<string []>(Array(numbers).fill(''));
    const [code, setCode] = useState<number | null>(null);
    const ref = useRef<HTMLInputElement[]>([]);

    const changeData = (e:ChangeEvent<HTMLInputElement>): void => {
        let {value, id}: PropsInput = e.target;
        const lengthValue: number = value.length;
        id = Number(id);

        if (lengthValue === 0) {
            setUserValue((prevCode) => newUserValue(prevCode, id, ''));
            return;
        }

        if (lengthValue > 1) {
            value = value.substring(0, lengthValue - 1);
            e.target.value = value;
        }
        setUserValue((prevCode: string[]): string[] => newUserValue(prevCode, id, value));

        focusInput(ref, id);
    }


    useEffect((): void => {
        if (userValue.includes('')) {
            setCode((): null => null);
            return;
        }
        setCode((): number => Number(userValue.join('')));
    }, [userValue]);

    return [code, changeData, ref];
}

export default useCode;