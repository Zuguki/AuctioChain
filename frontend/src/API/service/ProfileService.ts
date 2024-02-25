import $api, { paramsPagination } from "../api.ts";
import { AxiosResponse } from "axios";
import { ResponseObjAuctions } from "../interfaces/response/IResponseAuctions.ts";
import { ResponseActiveLots, ResponseWinLots } from "../interfaces/ILot.ts";
import IUserName from "../interfaces/IUserName.ts";

export default class ProfileService {
    private static pathProfile: string = "profiles";

    public static async getUserName(
        id: string,
    ): Promise<AxiosResponse<IUserName>> {
        return $api.get(`${this.pathProfile}/userName`, {
            params: {
                UserId: id,
            },
        });
    }

    public static async getProfileAuctions(
        id: string,
        page: number = 1,
        elementOnPage: number = 3,
    ): Promise<AxiosResponse<ResponseObjAuctions>> {
        return $api.get(
            `${this.pathProfile}/auctions`,
            this.getConfig(id, page, elementOnPage),
        );
    }

    public static async getActiveLots(
        id: string,
        page: number = 1,
        elementOnPage: number = 3,
    ): Promise<AxiosResponse<ResponseActiveLots>> {
        return $api.get(
            `${this.pathProfile}/activeLots`,
            this.getConfig(id, page, elementOnPage),
        );
    }

    public static async getWinLot(
        id: string,
        page: number = 1,
        elementOnPage: number = 3,
    ): Promise<AxiosResponse<ResponseWinLots>> {
        return $api.get(
            `${this.pathProfile}/winLots`,
            this.getConfig(id, page, elementOnPage),
        );
    }

    private static getConfig(id: string, page: number, elementOnPage: number) {
        return {
            params: {
                ...paramsPagination(page, elementOnPage),
                UserId: id,
            },
        };
    }
}
