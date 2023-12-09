import React, { useContext } from 'react';
import SearcherAuction from './SearcherAuction/SearcherAuction.tsx';
import stylePage from './pageAuctions.module.css';
import { Context } from '../../context/context.ts';
import ListAuctions from './ListAuctions/ListAuctions.tsx';
import { observer } from 'mobx-react-lite';

const PageAuctions = observer(() => {
    const { stateApp } = useContext(Context);
    return (
        <div>
            <div className={stylePage.position}>
                <h1 className={stylePage.title}>Список аукционов</h1>
                {stateApp.getSearch() && <SearcherAuction />}
            </div>
            <ListAuctions />
        </div>
    );
});

export default PageAuctions;
