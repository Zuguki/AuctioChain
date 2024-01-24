import React, { ChangeEvent, FC } from 'react';
import LogicFormProcessing from '../../LogicFormProcessing/LogicFormProcessing.tsx';
import FormInput from '../../UI/inputs/FormInput/FormInput.tsx';
import FormTextArea from '../../UI/inputs/FormTextArea/FormTextArea.tsx';
import ImageInput from '../../UI/inputs/ImageInput/ImageInput.tsx';
import { numberChars } from '../../../auxiliaryTools/bloclnvalidChar.ts';
import SubmitButton from '../../SubmitButton/SubmitButton.tsx';
import { Form } from 'react-router-dom';
import { AxiosError } from 'axios';
import ILotComponentInteraction from '../../../interfaces/ILotComponentInteraction.ts';
import ImageForm from '../../ImageForm/ImageForm.tsx';
import IImageLogicForm from '../../../interfaces/IImageLogicForm.ts';
import stylePageLot from './lotInteraction.module.css';

interface LotInteraction {
    submitForm: () => Promise<void>;
    loading: boolean;
    error: AxiosError | null;
    logicFormValue: (e: ChangeEvent<HTMLInputElement>) => void;
    blurError: () => void;
    logicFileImage: IImageLogicForm;
    componentLot: ILotComponentInteraction;
}

const LotInteraction: FC<LotInteraction> = ({
    submitForm,
    loading,
    error,
    logicFormValue,
    blurError,
    logicFileImage: { setFileImage, imageFile },
    componentLot,
}) => {
    const { title, buttonText, lot } = componentLot;
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
                    defaultValue={lot?.name}
                />
                <FormTextArea
                    name="description"
                    title="Описание товара"
                    error={error}
                    errorBlur={blurError}
                    changeValue={logicFormValue}
                    defaultValue={lot?.description}
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
                    src={lot?.image}
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
                    defaultValue={lot?.initialPrice}
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
                    defaultValue={lot?.betStep}
                />
                <div className={stylePageLot.positionButton}>
                    <SubmitButton loading={loading}>{buttonText}</SubmitButton>
                </div>
            </div>
        </Form>
    );
};

export default LotInteraction;
