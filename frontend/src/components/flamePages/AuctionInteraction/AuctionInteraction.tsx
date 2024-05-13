import { FC } from "react";
import styleCreateAuction from "../LotInteraction/lotInteraction.module.css";
import LogicFormProcessing from "../../LogicFormProcessing/LogicFormProcessing.tsx";
import FormInput from "../../UI/inputs/FormInput/FormInput.tsx";
import FormTextArea from "../../UI/inputs/FormTextArea/FormTextArea.tsx";
import ImageInput from "../../UI/inputs/ImageInput/ImageInput.tsx";
import DateInput from "../../UI/inputs/DataInput/DateInput.tsx";
import DateLogic from "../../../auxiliaryTools/dateLogic/DateLogic.ts";
import SubmitButton from "../../SubmitButton/SubmitButton.tsx";
import { Form } from "react-router-dom";
import IInteraction from "../../../interfaces/interfacesInteraction/IInteraction.ts";
import { IPutAuction } from "@/API/interfaces/request/IPostAuction.ts";
import ImageForm from "../../ImageForm/ImageForm.tsx";

const { getDatetimeLocal } = DateLogic;
const AuctionInteraction: FC<IInteraction<IPutAuction>> = ({
    submitForm,
    loading,
    error,
    logicFormValue,
    blurError,
    logicFileImage,
    componentInteraction,
}) => {
    const { setFileImage, imageFile } = logicFileImage;
    const { title, component, buttonText } = componentInteraction;
    return (
        <Form onSubmit={submitForm} className={styleCreateAuction.position}>
            <div className={styleCreateAuction.form}>
                <div className={styleCreateAuction.titleBlock}>
                    <h1>{title}</h1>
                    <LogicFormProcessing loading={loading} err={error} />
                </div>
                <FormInput
                    title="Название аукциона"
                    name="name"
                    autoFocus={true}
                    error={error}
                    changeValue={logicFormValue}
                    errorBlur={blurError}
                    defaultValue={component?.name}
                />
                <p className={styleCreateAuction.additionallyInformation}>
                    Пишите название без слова аукцион.
                </p>
                <FormTextArea
                    title="Описание аукциона"
                    name="description"
                    error={error}
                    errorBlur={blurError}
                    changeValue={logicFormValue}
                    defaultValue={component?.description}
                />
                <ImageInput
                    title="Фото аукциона"
                    name="image"
                    error={error}
                    changeValue={setFileImage}
                    errorBlur={blurError}
                />
                <ImageForm
                    src={component?.image}
                    imageFile={imageFile}
                    text="Текущее изображение аукциона"
                    className={styleCreateAuction.image}
                />
                <DateInput
                    title="Дата начала"
                    name="dateStart"
                    error={error}
                    changeValue={logicFormValue}
                    errorBlur={blurError}
                    defaultValue={
                        component?.dateStart &&
                        getDatetimeLocal(component.dateStart)
                    }
                />
                <p className={styleCreateAuction.additionallyInformation}>
                    Обратите внимание, что торги аукциона начнутся после
                    подтверждения статуса &quot;завершение редактирования&quot;
                    в отдельной странице аукциона.
                </p>
                <DateInput
                    title="Дата окончания"
                    name="dateEnd"
                    min={DateLogic.getDateNow()}
                    error={error}
                    changeValue={logicFormValue}
                    errorBlur={blurError}
                    defaultValue={
                        component?.dateEnd &&
                        getDatetimeLocal(component.dateEnd)
                    }
                />
                <div className={styleCreateAuction.positionButton}>
                    <SubmitButton loading={loading}>{buttonText}</SubmitButton>
                </div>
            </div>
        </Form>
    );
};

export default AuctionInteraction;
