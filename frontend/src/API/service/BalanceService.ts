import { AxiosResponse } from "axios";
import IResponseBalance from "../interfaces/response/IResponseBalance.ts";
import $api from "../api.ts";

export default class BalanceService {
    private static readonly pathBalance = "balance";

    public static async getBalanceUser(): Promise<
        AxiosResponse<IResponseBalance>
    > {
        return $api.get(`${this.pathBalance}`);
    }

    public static async postBalance(
        walletAddress: string,
    ): Promise<AxiosResponse> {
        return $api.post(`${this.pathBalance}`, {
            walletAddress,
        });
    }
}
