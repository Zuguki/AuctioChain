import styleCard from "./cardAuction.module.css";
import CardDiv from "../../UI/div/CardDiv/CardDiv.tsx";
import { FC } from "react";
import AuctionLogic from "../../../appLogic/logicAuction/AuctionLogic.ts";
import IResponseAuction from "../../../API/interfaces/response/IResponseAuctions.ts";

type ICardAuction = { auction: IResponseAuction };
const CardAuction: FC<ICardAuction> = ({ auction }) => {
    const { lotsCount, status } = auction;

    return (
        <CardDiv objCard={auction}>
            <p className={styleCard.information}>
                Количество лотов: {lotsCount}
            </p>
            <p className={styleCard.information}>
                Статус: {AuctionLogic.getTextStatus(status)}
            </p>
        </CardDiv>
    );
};

export default CardAuction;
