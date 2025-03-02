interface IBet {
    id: string;
    userId: string;
    lotId: string;
    amount: number;
    dateTime: string;
}

export type ResponseObjBets = { bets: IBet[] };

export default IBet;
