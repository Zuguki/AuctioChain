interface IWinLot {
    id: string;
    auctionId: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

export type ResponseWinLots = { winLots: IWinLot[] };

export default IWinLot;
