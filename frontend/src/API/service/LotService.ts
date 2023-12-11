import $api, { paramsPagination } from '../api.ts';
import { AxiosResponse } from 'axios';
import ILot, { ResponseObjLots } from '../interfaces/ILot.ts';
import IPostBet from '../interfaces/IPostBet.ts';
import { ResponseObjBets } from '../interfaces/IBet.ts';
import IPostLot from '../interfaces/IPostLot.ts';

export default class LotService {
    private static readonly pathLots: string = 'auction/lots';
    private static readonly pathLotBets: string = `${this.pathLots}/bets`;

    public static async getLots(
        idAuction: string,
        page: number = 1,
        elementOnPage: number = 3,
    ): Promise<AxiosResponse<ResponseObjLots>> {
        return $api.get(`${this.pathLots}`, {
            params: {
                AuctionId: idAuction,
                ...paramsPagination(page, elementOnPage),
            },
        });
    }

    public static async getLotByID(id: string): Promise<AxiosResponse<ILot>> {
        return $api.get(`${this.pathLots}/${id}`);
    }

    public static async getBetsByLotID(
        id: string,
    ): Promise<AxiosResponse<ResponseObjBets>> {
        return $api.get(`${this.pathLotBets}`, {
            params: {
                LotId: id,
            },
        });
    }

    public static async postBetInLot(bet: IPostBet): Promise<AxiosResponse> {
        return $api.post(`${this.pathLotBets}`, bet);
    }

    public static async addLot(lot: IPostLot): Promise<AxiosResponse> {
        return $api.post(`${this.pathLots}`, lot);
    }
}
