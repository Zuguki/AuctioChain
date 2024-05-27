import { AxiosResponse } from "axios";
import $api from "../api.ts";
import IResponseImage from "../interfaces/response/IResponseImage.ts";

class ImageService {
    private readonly pathImage: string = "/images";

    public async postImage(file: File): Promise<AxiosResponse<IResponseImage>> {
        return $api.post(
            this.pathImage,
            { file: file },
            {
                headers: { "Content-Type": "multipart/form-data" },
            },
        );
    }
}

export default new ImageService();
