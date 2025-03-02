import { ChangeEvent } from "react";

interface IImageLogicForm {
    setFileImage: (e: ChangeEvent<HTMLInputElement>) => void;
    imageFile: File | null;
}

export default IImageLogicForm;
