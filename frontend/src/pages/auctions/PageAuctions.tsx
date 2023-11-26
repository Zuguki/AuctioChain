import React, { useContext } from 'react';
import SearcherAuction from './SearcherAuction/SearcherAuction.tsx';
import ListAuctions from './ListAuctions/ListAuctions.tsx';
import stylePage from './pageAuctions.module.css';
import { Context } from '../../context/contextApp.ts';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import AuctionService from '../../API/service/AuctionService.ts';
const PageAuctions = () => {
    const showSearcher = true;
    const { userStore } = useContext(Context);

    return (
        <div>
            <div className={stylePage.position}>
                <h1 className={stylePage.title}>Список аукционов</h1>
                {showSearcher && <SearcherAuction />}
            </div>
            <BaseButton red onClick={() => userStore.logout()}>
                Выход
            </BaseButton>
            <ListAuctions />
        </div>
    );
};

export default PageAuctions;
