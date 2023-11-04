import styleCard from './cardAuction.module.css';
import ButtonCard from "./ButtonCard/ButtonCard.tsx";
import logo from './testPhoto.png';
import ICardAuction from "../ICardAuction.ts";
const CardAuction = ({ auction }: { auction: ICardAuction}) => {
    const {name, img, countPersons, dataEnd, description} = auction;
    return (
            <div className={styleCard.card}>
                <h5 className={styleCard.title}>
                    {name}
                </h5>
                <img className={styleCard.img}
                     src={logo}
                     alt={img}
                />
                <p className={styleCard.information}>
                    Количество лотов: {countPersons}
                </p>
                <p className={styleCard.information}>
                    Дата окончания: {dataEnd}
                </p>
                <p className={styleCard.description}>
                    {description}
                </p>
                <ButtonCard>
                    Открыть
                </ButtonCard>
            </div>
    );
};

export default CardAuction;