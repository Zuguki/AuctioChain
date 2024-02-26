import $api, { paramsPagination } from "../api.ts";
import { AxiosResponse } from "axios";
import ILot, { ResponseObjLots } from "../interfaces/ILot.ts";
import IPostBet from "../interfaces/request/IPostBet.ts";
import { ResponseObjBets } from "../interfaces/IBet.ts";
import IPostLot, { IPutLot } from "../interfaces/request/IPostLot.ts";

class LotService {
    private readonly pathLots: string = "auction/lots";
    private readonly pathLotBets: string = `${this.pathLots}/bets`;

    public async getLots(
        idAuction: string,
        page: number = 1,
        elementOnPage: number = 3,
    ): Promise<AxiosResponse<ResponseObjLots>> {
        return $api.get(`${this.pathLots}`, {
            params: {
                AuctionId: idAuction,
                ...paramsPagination(page, elementOnPage),
            },
        });
    }

    public async getLotByID(id: string): Promise<AxiosResponse<ILot>> {
        return $api.get(`${this.pathLots}/${id}`);
    }

    public async getBetsByLotID(
        id: string,
    ): Promise<AxiosResponse<ResponseObjBets>> {
        return $api.get(`${this.pathLotBets}`, {
            params: {
                LotId: id,
            },
        });
    }

    public async postBetInLot(bet: IPostBet): Promise<AxiosResponse> {
        return $api.post(`${this.pathLotBets}`, bet);
    }

    public async addLot(lot: IPostLot): Promise<AxiosResponse> {
        return $api.post(`${this.pathLots}`, lot);
    }

    public async updateLot(lot: IPutLot): Promise<AxiosResponse> {
        return $api.put(`${this.pathLots}`, lot);
    }

    public async deleteLotById(id: string): Promise<AxiosResponse> {
        return $api.delete(`${this.pathLots}`, {
            params: {
                LotId: id,
            },
        });
    }
}

export default new LotService();
