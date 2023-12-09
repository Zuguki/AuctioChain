import { KeyboardEvent } from 'react';

const blockInvalidChar = (e: KeyboardEvent<HTMLElement>, chars: string[]) =>
    chars.includes(e.key) && e.preventDefault();

const numberChars: string[] = ['e', 'E', '+', '-', '.', ','];
const passwordChars: string[] = [
    '}',
    '{',
    ']',
    '"',
    "'",
    ';',
    ':',
    '?',
    '/',
    '|',
    '\\',
    '*',
    '#',
    '№',
    '%',
    '^',
    '&',
    '$',
    ',',
    ' ',
    '(',
    ')',
    '-',
    '=',
    '+',
];

export { blockInvalidChar, numberChars, passwordChars };
