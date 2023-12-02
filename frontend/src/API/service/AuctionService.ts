import $api, { paramsPagination, urlApi } from '../api.ts';
import IPostAuction from '../interfaces/IPostAuction.ts';
import { AxiosResponse } from 'axios';
import { ResponseObjAuctions } from '../interfaces/IResponseAuctions.ts';
import IAuction from '../interfaces/IAuction.ts';

export default class AuctionService {
    private static readonly urlAuctions: string = urlApi('auctions');

    public static async getAuctions(
        page: number = 1,
    ): Promise<AxiosResponse<ResponseObjAuctions>> {
        return $api.get(`${this.urlAuctions}`, {
            params: paramsPagination(page, 12),
        });
    }

    public static async getAuctionByID(
        id: string,
    ): Promise<AxiosResponse<IAuction>> {
        return $api.get(`${this.urlAuctions}/${id}`);
    }

    public static async addAuction(
        auction: IPostAuction,
    ): Promise<AxiosResponse> {
        return $api.post(this.urlAuctions, auction);
    }
}
