import { AxiosResponse } from "axios";
import IResponseBalance from "../interfaces/response/IResponseBalance.ts";
import $api from "../api.ts";
import IPostWithdraw from "@/API/interfaces/request/IPostWithdraw.ts";

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

    public async withdraw(dataWithdraw: IPostWithdraw): Promise<AxiosResponse> {
        return $api.post(`${this.pathBalance}/withdraw`, dataWithdraw);
    }
}

export default new BalanceService();
