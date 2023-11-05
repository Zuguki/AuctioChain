import React from 'react';
import Hr from "../../components/UI/Hr/Hr.tsx";
import CardLot from "./ListLot/CardLot/CardLot.tsx";
import ListLot from "./ListLot/ListLot.tsx";

const PageOneAuction = ({auction}) => {
    const {name, userName, countLots, lots} = auction;

    return (
        <div>
            <h1>Аукцион "{name}"</h1>
            <h3>@{userName}</h3>
            <p>Дата начала: DD-MM-YYYY</p>
            <p>Дата окончания: DD-MM-YYYY</p>
            <Hr />
            <h2>Лоты</h2>
            <p>Количество лотов: {countLots}</p>
            <ListLot lots={lots} />
        </div>
    );
};

export default PageOneAuction;