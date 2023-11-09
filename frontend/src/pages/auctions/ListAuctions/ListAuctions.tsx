import {FC, ReactElement, useEffect, useState} from 'react';
import ICardAuction from "./CardAuction/ICardAuction.ts";
import CardAuction from "./CardAuction/CardAuction.tsx";
import styleList from './listAuctions.module.css'
import Pagination from "../../../components/UI/Pagination/Pagination.tsx";
import axios from 'axios';
import {IElementAuctions} from "../../../interfaces/auctionsTypes.ts";

const ListAuctions: FC = () => {
    const [auctions, setAuctions] = useState<IElementAuctions[]>([]);
    const [currentPage, seCurrentPage] = useState<number>(1);
    console.log('l', auctions.length)
    useEffect(() => {
        axios.get('http://localhost:5121/api/v1/auctions')
            .then((result) => setAuctions(() => result.data.auctions))
    }, []);

    useEffect(() => {
        console.log(currentPage)
    }, [currentPage]);

    return (
        // change
        <div>
            <div className={styleList.position}>
                {auctions.filter((_, index) => {
                    console.log(index, index / 6)
                    return (Math.floor(index / 6) + 1) === currentPage;
                }).map((auction: IElementAuctions): ReactElement =>
                    <CardAuction
                        key={auction.id}
                        auction={auction}
                    />)}
            </div>
            {auctions.length !== 0 && <Pagination endPage={Math.ceil(auctions.length / 6)}
                                                  sendCurrentPage={(page: number) => seCurrentPage(() => page)}/>}
        </div>
    );
};

export default ListAuctions;