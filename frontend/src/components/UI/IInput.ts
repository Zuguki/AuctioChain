import { InputHTMLAttributes, ChangeEvent } from 'react';
import { AxiosError } from 'axios';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    width?: 'small' | 'base' | 'large';
    blockChars?: string[];
    title: string;
    name: string;
    error: AxiosError | null;
    changeValue: (e: ChangeEvent<HTMLInputElement>) => void;
    errorBlur: () => void;
}

export default IInput;
