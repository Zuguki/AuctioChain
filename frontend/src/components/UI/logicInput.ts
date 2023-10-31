import {InputHTMLAttributes, ChangeEvent} from "react";
import {CSSModulesOptions} from "vite";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    width?: 'small' | 'base' | 'large';
    blockChars?: string[];
    title: string;
    name: string;
    changeValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const sizeStileInput = (smallStyle: CSSModulesOptions, largeStyle : CSSModulesOptions) => ({
    'small': smallStyle,
    'base': '',
    'large': largeStyle
});

export {
    type IInput,
    sizeStileInput
}