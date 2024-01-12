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
import useFilterAuctions from '../../../hooks/useSelectAuctions/useFilterAuctions.ts';
import useSearchInput from '../../../hooks/useSearchInput.ts';
import equalsObjects from '../../../auxiliaryTools/equalsObjects.ts';
import useSortAuctions from '../../../hooks/useSelectAuctions/useSortAuctions.ts';

const SearcherAuction = memo(() => {
    const { stateApp } = useContext(Context);
    const [paramsFilter, setParamsFilter] =
        useState<IParamsAuctions>(BaseParamsAuctions);
    const { statusFilter, changeFilter } =
        useFilterAuctions<IParamsAuctions>(setParamsFilter);
    const { isWrite, changeSearch } =
        useSearchInput<IParamsAuctions>(setParamsFilter);
    const { statusSort, changeSort } = useSortAuctions(setParamsFilter);
    useEffect(() => {
        if (equalsObjects(paramsFilter, BaseParamsAuctions)) {
            return;
        }
        stateApp.setParamsAuctions(paramsFilter);
        return () => stateApp.setParamsAuctions(BaseParamsAuctions);
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
                    name="orderByStatus"
                    selectors={statusSort}
                    changeValue={changeSort}
                />
                <BaseSelect
                    title="Фильтровать по статусу:"
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
