import {CSSModulesOptions} from "vite";

const sizeStile = (smallStyle: CSSModulesOptions, largeStyle : CSSModulesOptions) => ({
    'small': smallStyle,
    'base': '',
    'large': largeStyle
});

export default sizeStile;