interface IResponseAuction {
    dateEnd: string;
    dateStart: string; //2023-11-22T14:25:13.187Z
    description: string;
    id: string;
    image: string;
    lotsCount: number;
    name: string;
    status: number;
    userId: string;
}

export type ResponseObjAuctions = { auctions: IResponseAuction[] };
export default IResponseAuction;
