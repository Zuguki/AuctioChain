import $api, { paramsPagination } from '../api.ts';
import IPostAuction from '../interfaces/IPostAuction.ts';
import { AxiosResponse } from 'axios';
import { ResponseObjAuctions } from '../interfaces/IResponseAuctions.ts';
import IAuction from '../interfaces/IAuction.ts';

export default class AuctionService {
    private static readonly pathAuctions: string = 'auctions';

    public static async getAuctions(
        page: number = 1,
        elementOnPage: number = 12,
    ): Promise<AxiosResponse<ResponseObjAuctions>> {
        return $api.get(`${this.pathAuctions}`, {
            params: paramsPagination(page, elementOnPage),
        });
    }

    public static async getAuctionByID(
        id: string,
    ): Promise<AxiosResponse<IAuction>> {
        return $api.get(`${this.pathAuctions}/${id}`);
    }

    public static async addAuction(
        auction: IPostAuction,
    ): Promise<AxiosResponse> {
        return $api.post(this.pathAuctions, auction);
    }
}
