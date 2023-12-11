import { AxiosResponse } from 'axios';
import $api from '../api.ts';
import IResponseImage from '../interfaces/IResponseImage.ts';

export default class ImageService {
    private static readonly pathImage: string = '/images';

    public static async postImage(
        file: File,
    ): Promise<AxiosResponse<IResponseImage>> {
        return $api.post(
            this.pathImage,
            { file: file },
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            },
        );
    }
}
