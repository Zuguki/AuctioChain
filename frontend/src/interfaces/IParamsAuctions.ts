interface IParamsAuctions {
    search: string;
    status: number | string | null;
}

export const BaseParamsAuctions: IParamsAuctions = {
    search: '',
    status: null,
};

export default IParamsAuctions;
