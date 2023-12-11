interface IPostLot {
    auctionId: string;
    name: string;
    description: string;
    initialPrice: number;
    betStep: number;
    image: string | null;
}

export default IPostLot;
