import { AxiosResponse } from "axios";
import IResponseRoles from "@/API/interfaces/response/IResponseRoles.ts";
import $api from "@/API/api.ts";

class AdminService {
    private readonly pathAdmin: string = "admins";

    public async rolesUser(
        userId: string,
    ): Promise<AxiosResponse<IResponseRoles>> {
        return $api.get(`${this.pathAdmin}`, {
            params: {
                userId,
            },
        });
    }

    public isModerator({ roles }: IResponseRoles): boolean {
        return roles.includes("Moderator");
    }
}

export default new AdminService();
