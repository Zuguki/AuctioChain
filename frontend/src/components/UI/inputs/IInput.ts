import { ChangeEvent, InputHTMLAttributes } from 'react';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    width?: 'small' | 'base' | 'large';
    blockChars?: string[];
    title: string;
    name: string;
    error: Error | null;
    changeValue: (e: ChangeEvent<HTMLInputElement>) => void;
    errorBlur: () => void;
}

export default IInput;
