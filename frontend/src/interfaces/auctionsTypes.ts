type ElementAuctions = {
    id: string,
    name: string,
    description: string,
    lotsCount: number,
    image: string,
    userId: string,
    dateStart: string,
    dateEnd: string,
    status: number
}

interface Auction {
    id: string,
    name: string,
    description: string,
    lots: [],
    image: string,
    userId: string,
    dateStart: string,
    dateEnd: string,
    status: number
}

const BaseAuction: IAuction = {
    id: '',
    name: '',
    description: '',
    lots: [],
    image: '',
    userId: '',
    dateStart: '',
    dateEnd: '',
    status: 0
};

type IElementAuctions = Readonly<ElementAuctions>;
type IAuction = Readonly<Auction>;

export {
    type IElementAuctions,
    type IAuction,
    BaseAuction
}