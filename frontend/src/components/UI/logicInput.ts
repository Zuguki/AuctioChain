import {InputHTMLAttributes, ChangeEvent} from "react";
import {CSSModulesOptions} from "vite";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    width?: 'small' | 'base' | 'large';
    changeValue: (e: ChangeEvent<HTMLInputElement>) => ChangeEvent<HTMLInputElement>;
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