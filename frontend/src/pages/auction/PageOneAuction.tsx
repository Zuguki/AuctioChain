import React from 'react';
import Hr from "../../components/UI/Hr/Hr.tsx";
import ListLot from "./ListLot/ListLot.tsx";
import stylePage from './pageOneAuction.module.css';
const PageOneAuction = ({auction}) => {
    const {name, userName, countLots, lots} = auction;

    return (
        <div>
            <div className={stylePage.position}>
                <h1 className={stylePage.title}>Аукцион "{name}"</h1>
                <h3 className={stylePage.userName}>@{userName}</h3>
                <p className={stylePage.date}>Дата начала: DD-MM-YYYY</p>
                <p className={stylePage.date}>Дата окончания: DD-MM-YYYY</p>
                <Hr />
                <h2>Лоты</h2>
                <p className={stylePage.countLots}>Количество лотов: {countLots}</p>
            </div>
            <ListLot lots={lots} />
        </div>
    );
};

export default PageOneAuction;