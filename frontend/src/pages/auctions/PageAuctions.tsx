import React, { useContext } from "react";
import stylePage from "./pageAuctions.module.css";
import { observer } from "mobx-react-lite";
import { Context } from "@/context/context.ts";
import SearcherAuction from "./SearcherAuction/SearcherAuction.tsx";
import ListAuctions from "@/pages/auctions/ListAuctions/ListAuctions.tsx";

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
