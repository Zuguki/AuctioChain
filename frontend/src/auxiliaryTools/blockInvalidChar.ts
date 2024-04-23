import { KeyboardEvent } from "react";

const blockInvalidChar = (
    e: KeyboardEvent<HTMLElement>,
    chars: string[],
): false | void => chars.includes(e.key) && e.preventDefault();

const numberChars: string[] = ["e", "E", "+", "-"];
const passwordChars: string[] = [
    "}",
    "{",
    "]",
    '"',
    "'",
    ";",
    ":",
    "?",
    "/",
    "|",
    "\\",
    "*",
    "#",
    "№",
    "%",
    "^",
    "&",
    "$",
    ",",
    " ",
    "(",
    ")",
    "-",
    "=",
    "+",
];

export { blockInvalidChar, numberChars, passwordChars };
