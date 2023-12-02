import $api, { paramsPagination, urlApi } from '../api.ts';
import { AxiosResponse } from 'axios';
import ILot, { ResponseObjLots } from '../interfaces/ILot.ts';
import IPostBet from '../interfaces/IPostBet.ts';
import { ResponseObjBets } from '../interfaces/IBet.ts';

export default class LotService {
    private static readonly urlLots: string = urlApi('auction/lots');
    private static readonly urlLotBets: string = `${this.urlLots}/bets`;

    public static async getLots(
        idAuction: string,
        page: number = 1,
    ): Promise<AxiosResponse<ResponseObjLots>> {
        return $api.get(`${this.urlLots}`, {
            params: {
                AuctionId: idAuction,
                ...paramsPagination(page, 3),
            },
        });
    }

    public static async getLotByID(id: string): Promise<AxiosResponse<ILot>> {
        return $api.get(`${this.urlLots}/${id}`);
    }

    public static async getBetsByLotID(
        id: string,
    ): Promise<AxiosResponse<ResponseObjBets>> {
        return $api.get(`${this.urlLotBets}`, {
            params: {
                LotId: id,
            },
        });
    }

    public static async postBetInLot(bet: IPostBet): Promise<AxiosResponse> {
        return $api.post(`${this.urlLotBets}`, bet);
    }

    /* public static async addLot(lot) {
        return $api.post(this.urlLots);
    }*/
}
