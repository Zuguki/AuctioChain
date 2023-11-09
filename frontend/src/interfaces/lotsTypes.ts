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

type ILot = Readonly<Lot>

export {
    type ILot
}
