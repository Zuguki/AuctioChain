import React, {useEffect, useState} from 'react';
import Hr from "../../components/UI/Hr/Hr.tsx";
import ListLot from "./ListLot/ListLot.tsx";
import stylePage from './pageOneAuction.module.css';
import {BaseAuction, IAuction, IElementAuctions} from "../../interfaces/auctionsTypes.ts";
import {useParams} from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import useGetAPI from "../../hooks/API/useGetAPI.ts";
import LogicDownload from "../../components/LogicDownload/LogicDownload.tsx";


const PageOneAuction = () => {
    const { id} = useParams();
    const {data: auction, err, isLoading} = useGetAPI<IAuction>(`http://localhost:5121/api/v1/auctions/id?AuctionId=${id}`, BaseAuction);
    const {name, userId} = auction;

    return (
        <LogicDownload isLoading={isLoading}>
            <div>
                <div className={stylePage.position}>
                    <h1 className={stylePage.title}>Аукцион "{name}"</h1>
                    <h3 className={stylePage.userName}>@{userId}</h3>
                    <InformationAuction auction={auction} />
                    <Hr />
                    <h2>Лоты</h2>
                </div>
                <ListLot id={id} />
            </div>
        </LogicDownload>
    );
};

const InformationAuction = ({auction} : {auction: IAuction}) => {
    const { description, dateStart, dateEnd} = auction;
    return (
        <div className={stylePage.blockInformation}>
            <p className={stylePage.information}>Дата начала: {dateStart}</p>
            <p className={stylePage.information}>Дата окончания: {dateEnd}</p>
            <p className={`${stylePage.information} ${stylePage.description}`} >Описание:</p>
            <p className={stylePage.information}>{description}</p>
        </div>
    );
}
export default PageOneAuction;