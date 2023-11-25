import $api, { urlApi } from '../../authorizationLogic/apiUrl.ts';
import { AxiosResponse } from 'axios';
import ILot, { ResponseObjLots } from '../interfaces/ILot.ts';

export default class LotService {
    private static readonly urlAuctions: string = urlApi('auction/lots');

    public static async getLots(
        idAuction: string,
    ): Promise<AxiosResponse<ResponseObjLots>> {
        return $api.get(`${this.urlAuctions}?AuctionId=${idAuction}`);
    }

    public static async getLotByID(id: string): Promise<AxiosResponse<ILot>> {
        return $api.get(`${this.urlAuctions}/${id}`);
    }

    /* public static async addLot(lot) {
        return $api.post(this.urlAuctions);
    }*/
}
