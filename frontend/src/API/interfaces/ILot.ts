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

export type ResponseObjLots = { lots: ILot[] };

export default ILot;
