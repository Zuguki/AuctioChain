import React from 'react';
import SearcherAuction from "./SearcherAuction/SearcherAuction.tsx";
import ListAuctions from "./ListAuctions/ListAuctions.tsx";
import stylePage from './pageAuctions.module.css';
const PageAuctions = () => {
    const showSearcher = true;
    return (
        <div>
            <div className={stylePage.position}>
                <h1 className={stylePage.title}>Список аукционов</h1>
                {showSearcher && <SearcherAuction />}
            </div>
            <ListAuctions />
        </div>
    );
};

export default PageAuctions;