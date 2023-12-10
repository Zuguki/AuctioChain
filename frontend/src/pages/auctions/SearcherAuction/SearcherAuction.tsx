import React, { useContext } from 'react';
import SearchInput from '../../../components/UI/inputs/SearchInput/SearchInput.tsx';
import BaseSelect from '../../../components/UI/BaseSelect/BaseSelect.tsx';
import styleSearcher from './searcherAuction.module.css';
import Hr from '../../../components/UI/Hr/Hr.tsx';
import { Form } from 'react-router-dom';
import BaseButton from '../../../components/UI/BaseButton/BaseButton.tsx';
import { Context } from '../../../context/context.ts';

const SearcherAuction = () => {
    const a = e => {
        const { value, name } = e.target;
        console.log(name, value);
    };
    const { userStore } = useContext(Context);
    return (
        <Form>
            <h4 className={styleSearcher.title}>Поиск</h4>
            <SearchInput
                title=""
                name="searcher"
                width="large"
                autoComplete="off"
                changeValue={a}
                error={null}
                errorBlur={() => console.log('sa')}
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
            <BaseButton type="submit">Применить</BaseButton>
            <div className={styleSearcher.reset}>
                <BaseButton
                    red
                    type="submit"
                    onClick={() => userStore.logout()}
                >
                    Сбросить
                </BaseButton>
            </div>
            <Hr width="large" />
        </Form>
    );
};

export default SearcherAuction;
