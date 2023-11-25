import styleCard from './cardAuction.module.css';
import CardDiv from '../../../../components/UI/div/CardDiv/CardDiv.tsx';
import { IElementAuctions } from '../../../../interfaces/auctionsTypes.ts';
import { FC } from 'react';

type InformationCardAuction = { lotsCount: number; dateEnd: string };
type ICardAuction = { auction: IElementAuctions };
const CardAuction: FC<ICardAuction> = ({ auction }) => {
    const { lotsCount, dateEnd }: InformationCardAuction = auction;

    return (
        <CardDiv objCard={auction}>
            <p className={styleCard.information}>
                Количество лотов: {lotsCount}
            </p>
            <p className={styleCard.information}>Дата окончания: {dateEnd}</p>
        </CardDiv>
    );
};

export default CardAuction;
