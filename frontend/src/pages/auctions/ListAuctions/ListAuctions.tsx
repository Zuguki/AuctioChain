import {FC, ReactElement, useEffect, useState} from 'react';
import ICardAuction from "./CardAuction/ICardAuction.ts";
import CardAuction from "./CardAuction/CardAuction.tsx";
import styleList from './listAuctions.module.css'
import Pagination from "../../../components/UI/Pagination/Pagination.tsx";
import axios from 'axios';
import {BaseAuction, IElementAuctions} from "../../../interfaces/auctionsTypes.ts";
import useGetAPI from "../../../hooks/API/useGetAPI.ts";
import Spinner from "../../../components/UI/Spinner/Spinner.tsx";
import LogicDownload from "../../../components/LogicDownload/LogicDownload.tsx";

const ListAuctions: FC = () => {

    const {data: {auctions}, isLoading, err} = useGetAPI<{auctions: IElementAuctions[]}>('http://localhost:5121/api/v1/auctions', {auctions: []});
    const [currentPage, setCurrentPage] = useState<number>(1);

    return (
        // change
        <LogicDownload isLoading={isLoading}>
            <>
                {/*.filter((_, index) => (Math.floor(index / 6) + 1) === currentPage)*/}
                <div className={styleList.position}>
                {auctions.map((auction: IElementAuctions): ReactElement =>
                    <CardAuction
                        key={auction.id}
                        auction={auction}
                    />)}
                </div>
                {/*{auctions.length !== 0 && <Pagination endPage={Math.ceil(auctions.length / 6)}
                                                  sendCurrentPage={(page: number) => setCurrentPage(() => page)} />}*/}
            </>
        </LogicDownload>
    );
};

export default ListAuctions;