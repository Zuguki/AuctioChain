import React, { memo, useContext, useEffect, useState } from 'react';
import SearchInput from '../../../components/UI/inputs/SearchInput/SearchInput.tsx';
import BaseSelect from '../../../components/UI/BaseSelect/BaseSelect.tsx';
import styleSearcher from './searcherAuction.module.css';
import Hr from '../../../components/UI/Hr/Hr.tsx';
import { Form } from 'react-router-dom';
import IParamsAuctions, {
    BaseParamsAuctions,
} from '../../../interfaces/IParamsAuctions.ts';
import { Context } from '../../../context/context.ts';
import useFilterAuctions from '../../../hooks/useFilterAuctions.ts';
import useSearchInput from '../../../hooks/useSearchInput.ts';

const SearcherAuction = memo(() => {
    const [paramsFilter, setParamsFilter] =
        useState<IParamsAuctions>(BaseParamsAuctions);
    const { statusFilter, changeFilter } =
        useFilterAuctions<IParamsAuctions>(setParamsFilter);
    const { isWrite, changeSearch } =
        useSearchInput<IParamsAuctions>(setParamsFilter);
    const { stateApp } = useContext(Context);
    useEffect((): void => {
        stateApp.setParamsAuctions(paramsFilter);
    }, [paramsFilter]);

    return (
        <Form>
            <h4 className={styleSearcher.title}>Поиск</h4>
            <SearchInput
                name="search"
                width="large"
                autoFocus={true}
                autoComplete="off"
                changeValue={changeSearch}
                error={null}
                errorBlur={() => ({})}
                isWrite={isWrite}
            />
            <div className={styleSearcher.selects}>
                <BaseSelect
                    title="Сортировать по:"
                    name="filter"
                    selectors={[]}
                    changeValue={() => ({})}
                />
                <BaseSelect
                    title=" Фильтровать по статусу:"
                    name="status"
                    selectors={statusFilter}
                    changeValue={changeFilter}
                />
            </div>
            <Hr width="large" />
        </Form>
    );
});

export default SearcherAuction;
