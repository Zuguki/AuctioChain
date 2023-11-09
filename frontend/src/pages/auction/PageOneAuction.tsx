import React, {useEffect, useState} from 'react';
import Hr from "../../components/UI/Hr/Hr.tsx";
import ListLot from "./ListLot/ListLot.tsx";
import stylePage from './pageOneAuction.module.css';
import {BaseAuction, IAuction, IElementAuctions} from "../../interfaces/auctionsTypes.ts";
import {useParams} from "react-router-dom";
import axios from "axios";


const PageOneAuction = () => {
    const { id} = useParams();
    const [auction, setAuction] = useState<IAuction>(BaseAuction);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(() => true);
        axios.get(`http://localhost:5121/api/v1/auctions/id?AuctionId=${id}`)
            .then((el) => setAuction(() => el.data))
            .then(() => setIsLoading(() => false))
    }, [id]);

    const {name, description, userId, lots, dateStart, dateEnd} = auction;

    return (
        <>
        {isLoading ? (
            <div className="spinner-border text-primary"  role="status">
                <span className="visually-hidden">Loading...</span>
            </div>) : (<div>
            <div className={stylePage.position}>
                <h1 className={stylePage.title}>Аукцион "{name}"</h1>
                <h3 className={stylePage.userName}>@{userId}</h3>
                <div className={stylePage.blockInformation}>
                    <p className={stylePage.information}>Дата начала: {dateStart}</p>
                    <p className={stylePage.information}>Дата окончания: {dateEnd}</p>
                    <p className={`${stylePage.information} ${stylePage.description}`} >Описание:</p>
                    <p className={stylePage.information}>{description}</p>
                </div>

                <Hr />
                <h2>Лоты</h2>
                <p className={stylePage.countLots}>Количество лотов: {0}</p>
            </div>
            <ListLot lots={lots} />
        </div>)}
        </>
    );
};

export default PageOneAuction;