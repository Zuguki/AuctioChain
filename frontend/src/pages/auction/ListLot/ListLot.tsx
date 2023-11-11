import React, {FC, ReactElement, useEffect, useState} from 'react';
import SearcherAuction from "../../auctions/SearcherAuction/SearcherAuction.tsx";
import ListAuctions from "../../auctions/ListAuctions/ListAuctions.tsx";
import CardLot from "./CardLot/CardLot.tsx";
import Pagination from "../../../components/UI/Pagination/Pagination.tsx";
import styleList from "./listLot.module.css";
import axios from "axios";
import stylePage from "../pageOneAuction.module.css";
import {ILot} from "../../../interfaces/lotsTypes.ts";
import useGetAPI from "../../../hooks/API/useGetAPI.ts";
import LogicDownload from "../../../components/LogicDownload/LogicDownload.tsx";

const ListLot: FC<{ id: string}> = ({id}) => {
    const { data: {lots}, isLoading, err} = useGetAPI<{ lots: ILot[] }>(`http://localhost:5121/api/v1/auction/lots?AuctionId=${id}`, { lots: [] });
    return (
        <LogicDownload isLoading={isLoading}>
            <div>
                {lots.length !== 0 ? (<>
                    <p className={stylePage.informationLots}>Количество лотов: {lots.length}</p>
                    <div className={styleList.position}>
                        {lots.map((lot): ReactElement => <CardLot key={lot.id} lot={lot}/>)}
                    </div>
                    <Pagination endPage={10} sendCurrentPage={() => ({})}/>)
                </>) : (
                    <p className={stylePage.informationLots}>Лотов нет</p>
                )}
            </div>
        </LogicDownload>
    );
};

export default ListLot;