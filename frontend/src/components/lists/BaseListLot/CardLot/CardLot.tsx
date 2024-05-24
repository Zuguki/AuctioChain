import { FC } from "react";
import CardDiv from "../../../UI/div/CardDiv/CardDiv.tsx";
import styleCard from "./cardLot.module.css";
import { IBaseCard, IObjCard } from "@/interfaces/BaseCard.ts";
import ILot from "../../../../API/interfaces/ILot.ts";
import IWinLot from "@/API/interfaces/IWinLot.ts";

const CardLot: FC<{ lot: ILot | IWinLot }> = ({ lot }) => {
    const { id, name, description, image } = lot;
    const lotObjCard: IObjCard<IBaseCard> = {
        id,
        image,
        name,
        description,
    };

    let price: number;
    if ("initialPrice" in lot) {
        const { currentMaxBet, initialPrice } = lot;
        price = currentMaxBet <= 0 ? initialPrice : currentMaxBet;
    } else {
        price = lot.price;
    }

    return (
        <CardDiv objCard={lotObjCard}>
            <p className={styleCard.price}>
                Цена:&nbsp;
                {<span className={styleCard.priceNumber}>{price}&nbsp;AC</span>}
            </p>
        </CardDiv>
    );
};

export default CardLot;
