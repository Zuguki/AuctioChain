import IAuction from "../../../API/interfaces/IAuction.ts";
import stylePage from "../pageOneAuction.module.css";
import DateLogic from "../../../auxiliaryTools/dateLogic/DateLogic.ts";
import { FC } from "react";
import AuctionLogic from "../../../appLogic/logicAuction/AuctionLogic.ts";

const InformationAuction: FC<{ auction: IAuction }> = ({ auction }) => {
    const { description, dateStart, dateEnd } = auction;
    return (
        <div className={stylePage.blockInformation}>
            <p className={stylePage.information}>
                <span className={stylePage.description}>Дата начала:</span>
                &nbsp;
                {DateLogic.getBaseFormatDateToStringISO(dateStart)}
            </p>
            <p className={stylePage.information}>
                <span className={stylePage.description}>Дата окончания:</span>
                &nbsp;
                {DateLogic.getBaseFormatDateToStringISO(dateEnd)}
            </p>
            <p className={stylePage.information}>
                <span className={stylePage.description}>Статус:</span>&nbsp;
                {AuctionLogic.getTextStatus(auction.status)}
            </p>
            <p className={`${stylePage.information} ${stylePage.description}`}>
                Описание:
            </p>
            <p className={stylePage.information}>{description}</p>
        </div>
    );
};

export default InformationAuction;
