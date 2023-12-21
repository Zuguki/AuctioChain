import useProcessingImageInput from '../useProcessingImageInput.ts';
import { AxiosResponse } from 'axios';
import { useCallback } from 'react';
import ImageService from '../../API/service/ImageService.ts';
import IResponseImage from '../../API/interfaces/IResponseImage.ts';

const usePostImage = (
    postData: <T>(
        request: () => Promise<AxiosResponse<T>>,
    ) => Promise<AxiosResponse<T> | undefined>,
) => {
    const { imageFile, setFile } = useProcessingImageInput();
    const postImage = useCallback(async (): Promise<
        AxiosResponse<IResponseImage> | undefined
    > => {
        if (!imageFile) {
            alert('Загрузите изображение!');
            return;
        }
        return await postData((): Promise<AxiosResponse<IResponseImage>> => {
            return ImageService.postImage(imageFile);
        });
    }, [imageFile]);
    return { setFile, postImage };
};

export default usePostImage;
