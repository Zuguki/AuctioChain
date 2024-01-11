interface IParamsAuctions {
    search: string | null;
    status: number | string | null;
}

export const BaseParamsAuctions: IParamsAuctions = {
    search: null,
    status: null,
};

export default IParamsAuctions;
