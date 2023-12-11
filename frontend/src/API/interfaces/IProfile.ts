import IResponseAuction from './IResponseAuctions.ts';
import ILot from './ILot.ts';

interface IProfile {
    userName: string;
    balance: number;
    userAuctions: IResponseAuction[] | null;
    winLots: ILot[] | null;
    participateLots: ILot[] | null;
}

export default IProfile;
