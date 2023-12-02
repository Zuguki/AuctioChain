import { ResponseObjAuctions } from './IResponseAuctions.ts';

interface ILot {
    id: string;
    auctionId: string;
    name: string;
    description: string;
    initialPrice: number;
    betStep: number;
    currentMaxBet: number;
    code: string;
    images: string[];
    isPurchased: boolean;
}

export type ResponseObjLots = { lots: ILot[] };

export default ILot;
