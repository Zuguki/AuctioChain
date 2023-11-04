import {InputHTMLAttributes, ChangeEvent} from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    width?: 'small' | 'base' | 'large';
    blockChars?: string[];
    title: string;
    name: string;
    changeValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default IInput;