import { AxiosResponse } from "axios";
import IResponseBalance from "../interfaces/response/IResponseBalance.ts";
import $api from "../api.ts";

class BalanceService {
    private readonly pathBalance: string = "balance";

    public async getBalanceUser(): Promise<AxiosResponse<IResponseBalance>> {
        return $api.get(`${this.pathBalance}`);
    }

    public async postBalance(walletAddress: string): Promise<AxiosResponse> {
        return $api.post(`${this.pathBalance}`, {
            walletAddress,
        });
    }
}

export default new BalanceService();
