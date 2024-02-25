import { ChangeEvent, useState } from "react";

const useProcessingImageInput = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const setFile = (e: ChangeEvent<HTMLInputElement>): void =>
        setImageFile((): File | null =>
            e.target.files ? e.target.files[0] : null,
        );
    return { imageFile, setFile };
};

export default useProcessingImageInput;
