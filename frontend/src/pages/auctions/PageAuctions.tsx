import React, { useContext, useEffect } from 'react';
import SearcherAuction from './SearcherAuction/SearcherAuction.tsx';
import stylePage from './pageAuctions.module.css';
import { ContextUser } from '../../context/contextUser.ts';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import ImageInput from '../../components/UI/inputs/ImageInput/ImageInput.tsx';
import useDataUser from '../../hooks/useDataUser.ts';
import ListAuctions from './ListAuctions/ListAuctions.tsx';
import {
    auctionInformation,
    ContextAuction,
} from '../../context/contextAuction.ts';

const PageAuctions = () => {
    const showSearcher = true;
    const { userStore } = useContext(ContextUser);

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
