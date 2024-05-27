import $api, { paramsPagination } from "../api.ts";
import IPostAuction, {
    IPutAuction,
} from "../interfaces/request/IPostAuction.ts";
import { AxiosResponse } from "axios";
import {
    IResponseCreateAuction,
    ResponseObjAuctions,
} from "../interfaces/response/IResponseAuctions.ts";
import IAuction from "../interfaces/IAuction.ts";
import IParamsAuctions, {
    baseParamsAuctions,
} from "../../interfaces/IParamsAuctions.ts";

class AuctionService {
    private readonly pathAuctions: string = "auctions";

    public async getAuctions(
        page: number = 1,
        elementOnPage: number = 12,
        paramsAuctions: IParamsAuctions = baseParamsAuctions,
    ): Promise<AxiosResponse<ResponseObjAuctions>> {
        return this.shellGetAuctions(page, elementOnPage, paramsAuctions);
    }

    public async getApproveAuctions(
        page: number = 1,
        elementOnPage: number = 12,
        paramsAuctions: IParamsAuctions = baseParamsAuctions,
    ) {
        return this.shellGetAuctions(
            page,
            elementOnPage,
            paramsAuctions,
            `approve`,
        );
    }

    public async getAuctionByID(id: string): Promise<AxiosResponse<IAuction>> {
        return $api.get(`${this.pathAuctions}/${id}`);
    }

    public async addAuction(
        auction: IPostAuction,
    ): Promise<AxiosResponse<IResponseCreateAuction>> {
        return $api.post(this.pathAuctions, auction);
    }

    public async updateAuction(auction: IPutAuction): Promise<AxiosResponse> {
        return $api.put(this.pathAuctions, auction);
    }

    public async setNewStatusAuction(id: string): Promise<AxiosResponse> {
        return $api.patch(`${this.pathAuctions}/changeCreationState/${id}`);
    }

    public async approveAuction(auctionId: string): Promise<AxiosResponse> {
        return $api.patch(`${this.pathAuctions}/approve/${auctionId}`);
    }

    public async cancelAuction(auctionId: string): Promise<AxiosResponse> {
        return $api.patch(`${this.pathAuctions}/cancel/${auctionId}`);
    }

    public async deleteAuctionById(id: string): Promise<AxiosResponse> {
        return $api.delete(`${this.pathAuctions}/${id}`);
    }

    private async shellGetAuctions(
        page: number = 1,
        elementOnPage: number = 12,
        paramsAuctions: IParamsAuctions = baseParamsAuctions,
        path: string = "",
    ): Promise<AxiosResponse<ResponseObjAuctions>> {
        return $api.get(`${this.pathAuctions}/${path}`, {
            params: {
                ...paramsPagination(page, elementOnPage),
                ...paramsAuctions,
            },
        });
    }
}

export default new AuctionService();
