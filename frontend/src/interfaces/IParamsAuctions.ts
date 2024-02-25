interface IParamsAuctions {
    search: string | null;
    auctionStatus: number | string | null;
    orderByStatus: number | string | null;

    [key: string]: unknown;
}

export const BaseParamsAuctions: IParamsAuctions = {
    search: null,
    auctionStatus: null,
    orderByStatus: null,
};

export default IParamsAuctions;
