import $api, { paramsPagination } from '../api.ts';
import IPostAuction from '../interfaces/IPostAuction.ts';
import { AxiosResponse } from 'axios';
import {
    IResponseCreateAuction,
    ResponseObjAuctions,
} from '../interfaces/response/IResponseAuctions.ts';
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
    ): Promise<AxiosResponse<IResponseCreateAuction>> {
        return $api.post(this.pathAuctions, auction);
    }

    public static async setNewStatusAuction(
        id: string,
    ): Promise<AxiosResponse> {
        return $api.patch(`${this.pathAuctions}/changeCreationState/${id}`);
    }
}
