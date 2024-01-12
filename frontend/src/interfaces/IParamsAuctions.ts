interface IParamsAuctions {
    search: string | null;
    status: number | string | null;
    orderByStatus: number | string | null;
}

export const BaseParamsAuctions: IParamsAuctions = {
    search: null,
    status: null,
    orderByStatus: null,
};

export default IParamsAuctions;
