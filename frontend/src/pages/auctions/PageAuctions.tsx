import React, {useContext} from 'react';
import SearcherAuction from "./SearcherAuction/SearcherAuction.tsx";
import ListAuctions from "./ListAuctions/ListAuctions.tsx";
import stylePage from './pageAuctions.module.css';
import CloseButton from "../../components/UI/CloseButton/CloseButton.tsx";
import {Context} from "../../App.tsx";
const PageAuctions = () => {
    const showSearcher = true;
    const {store} = useContext(Context);
    console.log(store.isAuth)
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