interface IPostLot {
    auctionId: string;
    name: string;
    description: string;
    initialPrice: number;
    betStep: number;
    image: string | null;
}

export type IPutLot = Omit<IPostLot, 'auctionId'> & { lotId: string };

export default IPostLot;
