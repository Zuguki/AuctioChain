import {KeyboardEvent, FC} from 'react';
import styleCodeInput from './codeInput.module.css';
import useCode from "./useCode.ts";

const CodeInput: FC<{children: string, numbers?: number}> = ({children, numbers = 4}) => {
    const blockInvalidChar = (e: KeyboardEvent<HTMLElement>) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
    const [code, changeData, ref] = useCode(numbers);
    return (
        <>
            <label className={styleCodeInput.label}>{children}</label>
            <form className={styleCodeInput.form}>
                {Array(numbers)
                    .fill('')
                    .map((_, index) =>
                        <input
                            type='number'
                            id={index.toString()}
                            key={index}
                            onKeyDown={blockInvalidChar}
                            ref={(el: HTMLInputElement) => ref.current[index] = el}
                            className={styleCodeInput.input}
                            onChange={changeData}
                        />)
                }
            </form>
            {/*{code && <p>Code is: {code}</p>}*/}
        </>
    );
};

export default CodeInput;
