import {FC, ReactElement, useEffect, useState} from 'react';
import ICardAuction from "./CardAuction/ICardAuction.ts";
import CardAuction from "./CardAuction/CardAuction.tsx";
import styleList from './listAuctions.module.css'
import Pagination from "../../../components/UI/Pagination/Pagination.tsx";
import axios from 'axios';
import {BaseAuction, IElementAuctions} from "../../../interfaces/auctionsTypes.ts";
import useGetAPI from "../../../API/hooks/useGetAPI.ts";
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";
import LogicDownload from "../../../components/LogicDownload/LogicDownload.tsx";
import AuctionService from "../../../API/service/AuctionService.ts";
import IResponseAuction, {ResponseObjAuctions} from "../../../API/interfaces/IResponseAuctions.ts";


const ListAuctions: FC = () => {
   // const [currentPage, setCurrentPage] = useState<number>(1);
    const {data: {auctions}, err, loading} = useGetAPI<ResponseObjAuctions>(AuctionService.getAuctions(), {auctions: []});
    return (
        // change
        <LogicDownload isLoading={loading}>
            <>
                {/**/}
                <div className={styleList.position}>
                {auctions.map((auction: IElementAuctions): ReactElement =>
                    <CardAuction
                        key={auction.id}
                        auction={auction}
                    />)}
                </div>
                {/*{auctions.length !== 0 && <Pagination endPage={Math.ceil(auctions.length / )}
                                                  sendCurrentPage={(page: number) => setCurrentPage(() => page)} />}*!/*/}
            </>
        </LogicDownload>
    );
};

export default ListAuctions;