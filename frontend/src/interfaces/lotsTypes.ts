interface Lot {
    id: string,
    auctionId: string,
    name: string,
    description: string,
    betStep: number,
    buyoutPrice: number,
    code: string,
    currentMaxBet: number,
    images: string[],
    isPurchased: boolean
}

const BaseLot: ILot = {
    id: '',
    auctionId: '',
    name: '',
    description: '',
    betStep: 0,
    buyoutPrice: 0,
    code: '',
    currentMaxBet: 0,
    images: [],
    isPurchased: false
};


type ILot = Readonly<Lot>

export {
    type ILot,
    BaseLot
}
