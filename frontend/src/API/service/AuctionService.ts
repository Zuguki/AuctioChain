import $api, { paramsPagination } from "../api.ts";
import IPostAuction, { IPutAuction } from "../interfaces/IPostAuction.ts";
import { AxiosResponse } from "axios";
import {
    IResponseCreateAuction,
    ResponseObjAuctions,
} from "../interfaces/response/IResponseAuctions.ts";
import IAuction from "../interfaces/IAuction.ts";
import IParamsAuctions, {
    BaseParamsAuctions,
} from "../../interfaces/IParamsAuctions.ts";

export default class AuctionService {
    private static readonly pathAuctions: string = "auctions";

    public static async getAuctions(
        page: number = 1,
        elementOnPage: number = 12,
        paramsAuctions: IParamsAuctions = BaseParamsAuctions,
    ): Promise<AxiosResponse<ResponseObjAuctions>> {
        console.log(paramsAuctions);
        return $api.get(`${this.pathAuctions}`, {
            params: {
                ...paramsPagination(page, elementOnPage),
                /*...upFirstLetterByParams(paramsAuctions),*/
                ...paramsAuctions,
            },
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

    public static async updateAuction(
        auction: IPutAuction,
    ): Promise<AxiosResponse> {
        return $api.put(this.pathAuctions, auction);
    }

    public static async setNewStatusAuction(
        id: string,
    ): Promise<AxiosResponse> {
        return $api.patch(`${this.pathAuctions}/changeCreationState/${id}`);
    }

    public static async deleteAuctionById(id: string): Promise<AxiosResponse> {
        return $api.delete(`${this.pathAuctions}/${id}`);
    }
}
