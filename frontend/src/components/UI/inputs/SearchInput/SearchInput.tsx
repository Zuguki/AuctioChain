import React, { FC, memo } from 'react';
import inputStyle from './searchInput.module.css';
import IInput from '../IInput.ts';
import sizeStyle from '../../../../auxiliaryTools/logicSize.ts';

interface ISearchInput extends Omit<IInput, 'title'> {
    isWrite: boolean;
}

const SearchInput: FC<ISearchInput> = memo(
    ({ changeValue, width = 'base', isWrite, ...props }) => {
        return (
            <>
                <input
                    style={{ display: 'inline-block' }}
                    className={`${inputStyle.input} ${
                        sizeStyle(inputStyle.small, inputStyle.large)[width]
                    }`}
                    placeholder="Поиск"
                    {...props}
                    onChange={changeValue}
                />
                {isWrite && (
                    <div className={inputStyle.positionWrite}>
                        <div
                            className="spinner-grow text-secondary"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </>
        );
    },
);

export default SearchInput;
