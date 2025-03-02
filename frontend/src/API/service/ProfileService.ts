import $api, { paramsPagination } from "../api.ts";
import { AxiosResponse } from "axios";
import { ResponseObjAuctions } from "../interfaces/response/IResponseAuctions.ts";
import { ResponseActiveLots } from "../interfaces/ILot.ts";
import IUserName from "../interfaces/IUserName.ts";
import { ResponseWinLots } from "@/API/interfaces/IWinLot.ts";

class ProfileService {
    private readonly pathProfile: string = "profiles";

    public async getUserName(id: string): Promise<AxiosResponse<IUserName>> {
        return $api.get(`${this.pathProfile}/userName`, {
            params: {
                UserId: id,
            },
        });
    }

    public async getProfileAuctions(
        id: string,
        page: number = 1,
        elementOnPage: number = 3,
    ): Promise<AxiosResponse<ResponseObjAuctions>> {
        return $api.get(
            `${this.pathProfile}/auctions`,
            this.getConfig(id, page, elementOnPage),
        );
    }

    public async getActiveLots(
        id: string,
        page: number = 1,
        elementOnPage: number = 3,
    ): Promise<AxiosResponse<ResponseActiveLots>> {
        return $api.get(
            `${this.pathProfile}/activeLots`,
            this.getConfig(id, page, elementOnPage),
        );
    }

    public async getWinLot(
        id: string,
        page: number = 1,
        elementOnPage: number = 3,
    ): Promise<AxiosResponse<ResponseWinLots>> {
        return $api.get(
            `${this.pathProfile}/winLots`,
            this.getConfig(id, page, elementOnPage),
        );
    }

    private getConfig(id: string, page: number, elementOnPage: number) {
        return {
            params: {
                ...paramsPagination(page, elementOnPage),
                UserId: id,
            },
        };
    }
}

export default new ProfileService();
