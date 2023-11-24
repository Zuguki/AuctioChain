import $api, {urlApi} from "../../authorizationLogic/apiUrl.ts";
import IPostAuction from "../interfaces/IPostAuction.ts";
import {AxiosResponse} from "axios";
import IResponseAuction, {ResponseObjAuctions} from "../interfaces/IResponseAuctions.ts";
import IAuction from "../interfaces/IAuction.ts";

export default class AuctionService {
    private static readonly urlAuctions: string = urlApi('auctions');
    public static async getAuctions(): Promise<AxiosResponse<ResponseObjAuctions>> {
        return $api.get(`${this.urlAuctions}`); //?Page=1&ItemsPerPage=15
    }

    public static async getAuctionByID(id: string): Promise<AxiosResponse<IAuction>> {
        return $api.get(`${this.urlAuctions}/${id}`);
    }

    public static async addAuction(auction: IPostAuction): Promise<AxiosResponse> {
        return $api.post(this.urlAuctions, auction);
    }
}