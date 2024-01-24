import {
    ChangeEvent,
    FC,
    ForwardedRef,
    forwardRef,
    KeyboardEvent,
    memo,
} from 'react';
import IInput from '../IInput.ts';
import styleFormInput from './formInput.module.css';
import { blockInvalidChar } from '../../../../auxiliaryTools/bloclnvalidChar.ts';
import sizeStyle from '../../../../auxiliaryTools/logicSize.ts';

const FormInput: FC<IInput> = memo(
    forwardRef(
        (
            {
                changeValue,
                width = 'base',
                title,
                blockChars = [],
                error,
                errorBlur,
                ...props
            },
            ref: ForwardedRef<HTMLInputElement>,
        ) => {
            return (
                <div>
                    <label className={styleFormInput.title}>{title}</label>
                    <input
                        ref={ref}
                        className={`${styleFormInput.input} ${
                            error && styleFormInput.inputError
                        } ${
                            sizeStyle(
                                styleFormInput.small,
                                styleFormInput.large,
                            )[width]
                        }`}
                        {...props}
                        onFocus={errorBlur}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                            errorBlur();
                            changeValue(e);
                        }}
                        onKeyDown={(e: KeyboardEvent<HTMLElement>) =>
                            blockInvalidChar(e, blockChars)
                        }
                        required
                    />
                </div>
            );
        },
    ),
);

export default FormInput;
