interface IResponseAuction {
    dateEnd: string;
    dateStart: string;
    description: string;
    id: string;
    image: string;
    lotsCount: number;
    name: string;
    status: number;
    userId: string;
}

export type ResponseObjAuctions = { auctions: IResponseAuction[] };

export type IResponseCreateAuction = { auctionId: string };
export default IResponseAuction;
