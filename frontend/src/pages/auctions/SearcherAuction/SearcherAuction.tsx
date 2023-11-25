import React from 'react';
import FormInput from '../../../components/UI/inputs/FormInput/FormInput.tsx';
import SearchInput from '../../../components/UI/inputs/SearchInput/SearchInput.tsx';
import BaseSelect from '../../../components/UI/BaseSelect/BaseSelect.tsx';
import styleSearcher from './searcherAuction.module.css';
import Hr from '../../../components/UI/Hr/Hr.tsx';

const SearcherAuction = () => {
    const a = e => {
        const { value, name } = e.target;
        console.log(name, value);
    };
    return (
        <div>
            <h4 className={styleSearcher.title}>Поиск</h4>
            <SearchInput
                title=""
                name="searcher"
                width="large"
                changeValue={a}
            />
            <div className={styleSearcher.selects}>
                <BaseSelect
                    title="Фильтровать по:"
                    name="filter"
                    selectors={['1', '2', '3']}
                    changeValue={a}
                />
                <BaseSelect
                    title="Сортировать по:"
                    name="sort"
                    selectors={['1', '2', '3']}
                    changeValue={a}
                />
            </div>
            <Hr width="large" />
        </div>
    );
};

export default SearcherAuction;
