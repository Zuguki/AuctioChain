import React from 'react';
import FormInput from '../../components/UI/inputs/FormInput/FormInput.tsx';
import FormTextArea from '../../components/UI/inputs/FormTextArea/FormTextArea.tsx';
import { Form, useParams } from 'react-router-dom';
import styleCreateLot from '../createAuction/pageCreateAuction.module.css';
import ImageInput from '../../components/UI/inputs/ImageInput/ImageInput.tsx';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import usePostAPI from '../../hooks/API/usePostAPI.ts';
import useDataUser from '../../hooks/useDataUser.ts';
import IPostLot from '../../API/interfaces/IPostLot.ts';
import { numberChars } from '../../auxiliaryTools/bloclnvalidChar.ts';
import LotService from '../../API/service/LotService.ts';
import useProcessingImageInput from '../../hooks/useProcessingImageInput.ts';
import { AxiosResponse } from 'axios';
import IResponseImage from '../../API/interfaces/IResponseImage.ts';
import ImageService from '../../API/service/ImageService.ts';

const PageCreateLot = () => {
    const { id } = useParams();
    const { loading, error, blurError, postData } = usePostAPI();
    const { dataUser, logicFormValue } = useDataUser<IPostLot>();
    const { imageFile, setFile } = useProcessingImageInput();

    const postLot = async (): Promise<void> => {
        if (!imageFile) {
            alert('Загрузите изображение!');
            return;
        }
        const res: AxiosResponse<IResponseImage> | undefined =
            await postData<IResponseImage>(
                (): Promise<AxiosResponse<IResponseImage>> =>
                    ImageService.postImage(imageFile),
            );

        const dataPostUser: IPostLot = {
            ...dataUser,
            auctionId: id,
            initialPrice: +dataUser.initialPrice,
            betStep: +dataUser.betStep,
            image: res?.data.fileName || null,
        };

        await postData(
            (): Promise<AxiosResponse> => LotService.addLot(dataPostUser),
        );
    };
    return (
        <Form className={styleCreateLot.position} onSubmit={postLot}>
            <div>
                <h1>Создание лота</h1>
                <FormInput
                    title="Название лота"
                    name="name"
                    error={error}
                    changeValue={logicFormValue}
                    errorBlur={blurError}
                />
                <FormTextArea
                    name="description"
                    title="Описание товара"
                    error={error}
                    blurError={blurError}
                    changeValue={logicFormValue}
                />
                <ImageInput
                    title="Изображение лота"
                    name="image"
                    error={error}
                    changeValue={setFile}
                    errorBlur={blurError}
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
                />
                <div className={styleCreateLot.positionButton}>
                    <BaseButton disabled={loading} type="submit">
                        Создать
                    </BaseButton>
                </div>
            </div>
        </Form>
    );
};

export default PageCreateLot;
