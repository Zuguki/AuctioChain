import React, { useContext } from 'react';
import SearcherAuction from './SearcherAuction/SearcherAuction.tsx';
import stylePage from './pageAuctions.module.css';
import { Context } from '../../context/context.ts';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import ListAuctions from './ListAuctions/ListAuctions.tsx';
import { observer } from 'mobx-react-lite';

const PageAuctions = observer(() => {
    const { stateApp, userStore } = useContext(Context);
    return (
        <div>
            <div className={stylePage.position}>
                <h1 className={stylePage.title}>Список аукционов</h1>
                {stateApp.getSearch() && <SearcherAuction />}
            </div>
            <BaseButton red onClick={() => userStore.logout()}>
                Выход
            </BaseButton>
            <ListAuctions />
        </div>
    );
});

export default PageAuctions;
