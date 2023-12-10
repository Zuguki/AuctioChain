import { FC, KeyboardEvent, ReactElement } from 'react';
import styleCodeInput from './codeInput.module.css';
import useCode from './useCode.ts';
import {
    blockInvalidChar,
    numberChars,
} from '../../../../auxiliaryTools/bloclnvalidChar.ts';

const CodeInput: FC<{ children: string; numbers?: number }> = ({
    children,
    numbers = 4,
}) => {
    const [code, changeData, ref] = useCode(numbers);

    return (
        <>
            <label className={styleCodeInput.label}>{children}</label>
            <form className={styleCodeInput.form}>
                {Array(numbers)
                    .fill('')
                    .map(
                        (_, index: number): ReactElement<HTMLInputElement> => (
                            <input
                                type="number"
                                id={index.toString()}
                                key={index}
                                onKeyDown={(
                                    e: KeyboardEvent<HTMLInputElement>,
                                ) => blockInvalidChar(e, numberChars)}
                                ref={(el: HTMLInputElement) =>
                                    (ref.current[index] = el)
                                }
                                className={styleCodeInput.input}
                                onChange={changeData}
                            />
                        ),
                    )}
            </form>
            {code && <p>Code is: {code}</p>}
        </>
    );
};

export default CodeInput;
