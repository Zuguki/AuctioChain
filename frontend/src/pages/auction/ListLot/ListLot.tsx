import React, {ReactElement} from 'react';
import SearcherAuction from "../../auctions/SearcherAuction/SearcherAuction.tsx";
import ListAuctions from "../../auctions/ListAuctions/ListAuctions.tsx";
import CardLot from "./CardLot/CardLot.tsx";
import Pagination from "../../../components/UI/Pagination/Pagination.tsx";

const ListLot = ({lots}) => {
    return (
        <div>
            <div>
                {lots.map((lot): ReactElement => <CardLot key={lot.id} lot={lot}/>)}
            </div>
            <Pagination endPage={10} sendCurrentPage={() => ({})}/>
        </div>
    );
};

export default ListLot;