import React, {ReactElement} from 'react';
import SearcherAuction from "../../auctions/SearcherAuction/SearcherAuction.tsx";
import ListAuctions from "../../auctions/ListAuctions/ListAuctions.tsx";
import CardLot from "./CardLot/CardLot.tsx";
import Pagination from "../../../components/UI/Pagination/Pagination.tsx";
import styleList from "./listLot.module.css";

const ListLot = ({lots}) => {
    return (
        <div>
            <div className={styleList.position}>
                {lots.map((lot): ReactElement => <CardLot key={lot.id} lot={lot}/>)}
            </div>
            <Pagination endPage={10} sendCurrentPage={() => ({})}/>
        </div>
    );
};

export default ListLot;