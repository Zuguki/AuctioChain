import $api, { paramsPagination, urlApi } from '../api.ts';
import { AxiosResponse } from 'axios';
import ILot, { ResponseObjLots } from '../interfaces/ILot.ts';
import IPostBet from '../interfaces/IPostBet.ts';

export default class LotService {
    private static readonly urlAuctions: string = urlApi('auction/lots');

    public static async getLots(
        idAuction: string,
        page: number = 1,
    ): Promise<AxiosResponse<ResponseObjLots>> {
        return $api.get(`${this.urlAuctions}`, {
            params: {
                AuctionId: idAuction,
                ...paramsPagination(page, 3),
            },
        });
    }

    public static async getLotByID(id: string): Promise<AxiosResponse<ILot>> {
        return $api.get(`${this.urlAuctions}/${id}`);
    }

    public static async postBetInLot(bet: IPostBet): Promise<AxiosResponse> {
        return $api.post(`${this.urlAuctions}/bets`, bet);
    }

    /* public static async addLot(lot) {
        return $api.post(this.urlAuctions);
    }*/
}
