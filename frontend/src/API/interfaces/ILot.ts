import { ResponseObjAuctions } from './IResponseAuctions.ts';

interface ILot {
    id: string;
    auctionId: string;
    name: string;
    description: string;
    betStep: number;
    buyoutPrice: number;
    code: string;
    currentMaxBet: number;
    images: string[];
    isPurchased: boolean;
}

export type ResponseObjLots = { lots: ILot[] };

export default ILot;
