interface IParamsAuctions {
    search: string;
    auctionStatus: number | null;
    orderByStatus: number | null;

    [key: string]: unknown;
}

export const baseParamsAuctions: IParamsAuctions = {
    search: "",
    auctionStatus: null,
    orderByStatus: null,
};

export default IParamsAuctions;
