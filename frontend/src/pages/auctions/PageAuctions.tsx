import React, { useContext, useEffect } from "react";
import stylePage from "./pageAuctions.module.css";
import { observer } from "mobx-react-lite";
import { Context } from "@/context/context.ts";
import SearcherAuction from "./SearcherAuction/SearcherAuction.tsx";
import ListAuctions from "@/pages/auctions/ListAuctions/ListAuctions.tsx";
import { useLocation } from "react-router-dom";

const PageAuctions = observer(() => {
    const { stateApp } = useContext(Context);

    const location = useLocation();
    useEffect(() => {
        if (location.search) {
            stateApp.setSearch(true);
        }
    }, [location]);

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
