import { CSSModulesOptions } from "vite";

const sizeStyle = (
    smallStyle: CSSModulesOptions,
    largeStyle: CSSModulesOptions,
) => ({
    small: smallStyle,
    base: "",
    large: largeStyle,
});

export default sizeStyle;
