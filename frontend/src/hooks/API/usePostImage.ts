import useProcessingImageInput from "../useProcessingImageInput.ts";
import { AxiosResponse } from "axios";
import { useCallback } from "react";
import ImageService from "../../API/service/ImageService.ts";
import IResponseImage from "../../API/interfaces/response/IResponseImage.ts";
import { useMutation } from "@tanstack/react-query";

const usePostImage = () => {
    const { imageFile, setFile } = useProcessingImageInput();
    const postCorrectImage = async (): Promise<string | null> => {
        const resImage = await postImage();
        return resImage?.data.fileName ?? null;
    };

    const { mutateAsync: postData } = useMutation({
        mutationFn: (imageFile: File) => ImageService.postImage(imageFile),
    });

    const postImage = useCallback(async (): Promise<
        AxiosResponse<IResponseImage> | undefined
    > => {
        if (!imageFile) {
            alert("Загрузите изображение!");
            return;
        }

        return await postData(imageFile);
    }, [imageFile]);

    return { setFile, postImage, imageFile, postCorrectImage };
};

export default usePostImage;
