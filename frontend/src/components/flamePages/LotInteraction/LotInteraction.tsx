import { FC } from "react";
import LogicFormProcessing from "../../LogicFormProcessing/LogicFormProcessing.tsx";
import FormInput from "../../UI/inputs/FormInput/FormInput.tsx";
import FormTextArea from "../../UI/inputs/FormTextArea/FormTextArea.tsx";
import ImageInput from "../../UI/inputs/ImageInput/ImageInput.tsx";
import { numberChars } from "@/auxiliaryTools/blockInvalidChar.ts";
import SubmitButton from "../../SubmitButton/SubmitButton.tsx";
import { Form } from "react-router-dom";
import ImageForm from "../../ImageForm/ImageForm.tsx";
import stylePageLot from "./lotInteraction.module.css";
import IInteraction from "../../../interfaces/interfacesInteraction/IInteraction.ts";
import { IPutLot } from "@/API/interfaces/request/IPostLot.ts";

const LotInteraction: FC<IInteraction<IPutLot>> = ({
    submitForm,
    loading,
    error,
    logicFormValue,
    blurError,
    logicFileImage,
    componentInteraction,
}) => {
    const { setFileImage, imageFile } = logicFileImage;
    const { title, buttonText, component } = componentInteraction;
    return (
        <Form className={stylePageLot.position} onSubmit={submitForm}>
            <div className={stylePageLot.form}>
                <div className={stylePageLot.titleBlockLot}>
                    <h1>{title}</h1>
                    <LogicFormProcessing loading={loading} err={error} />
                </div>
                <FormInput
                    title="Название лота"
                    name="name"
                    error={error}
                    autoFocus={true}
                    changeValue={logicFormValue}
                    errorBlur={blurError}
                    defaultValue={component?.name}
                />
                <FormTextArea
                    name="description"
                    title="Описание товара"
                    error={error}
                    errorBlur={blurError}
                    changeValue={logicFormValue}
                    defaultValue={component?.description}
                />
                <ImageInput
                    title="Изображение лота"
                    name="image"
                    error={error}
                    changeValue={setFileImage}
                    errorBlur={blurError}
                />
                <ImageForm
                    className={stylePageLot.image}
                    src={component?.image}
                    text="Текущее изображение лота"
                    imageFile={imageFile}
                />
                <FormInput
                    title="Начальная цена (Ac)"
                    name="initialPrice"
                    error={error}
                    width="small"
                    type="number"
                    changeValue={logicFormValue}
                    blockChars={numberChars}
                    errorBlur={blurError}
                    defaultValue={component?.initialPrice}
                />
                <FormInput
                    title="Шаг лота (Ac)"
                    name="betStep"
                    width="small"
                    type="number"
                    error={error}
                    blockChars={numberChars}
                    changeValue={logicFormValue}
                    errorBlur={blurError}
                    defaultValue={component?.betStep}
                />
                <div className={stylePageLot.positionButton}>
                    <SubmitButton loading={loading}>{buttonText}</SubmitButton>
                </div>
            </div>
        </Form>
    );
};

export default LotInteraction;
