import styleCard from './cardAuction.module.css';
import ICardAuction from "./ICardAuction.ts";
import CardDiv from "../../../../components/UI/div/CardDiv/CardDiv.tsx";
const CardAuction = ({ auction }: { auction: ICardAuction}) => {
    const {countPersons, dataEnd} = auction;
    return (
            <CardDiv objCard={auction}>
                <p className={styleCard.information}>
                    Количество лотов: {countPersons}
                </p>
                <p className={styleCard.information}>
                    Дата окончания: {dataEnd}
                </p>
            </CardDiv>
    );
};

export default CardAuction;