interface ILot {
    id: string;
    auctionId: string;
    name: string;
    description: string;
    initialPrice: number;
    betStep: number;
    currentMaxBet: number;
    image: string;
}

interface IWinLot {
    id: string;
    auctionId: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

export type ResponseObjLots = { lots: ILot[] };
export type ResponseWinLots = { winLots: IWinLot[] };
export type ResponseActiveLots = { activeLots: ILot[] };
export default ILot;
