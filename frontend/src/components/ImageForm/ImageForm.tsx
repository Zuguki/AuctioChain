import { FC, HTMLAttributes } from "react";

interface IImageForm extends HTMLAttributes<HTMLImageElement> {
    src: string | null | undefined;
    imageFile: File | null;
    text: string;
}

const ImageForm: FC<IImageForm> = ({ src, imageFile, text, ...props }) => {
    if (imageFile === null && (src === null || src === undefined)) {
        return null;
    }
    const srcImage = ((): string => {
        if (imageFile == null) {
            return "";
        }
        return URL.createObjectURL(imageFile);
    })();
    return (
        <div>
            <p>{text}</p>
            {srcImage !== "" && <img {...props} src={srcImage} alt="img" />}
        </div>
    );
};

export default ImageForm;
