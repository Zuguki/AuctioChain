import React from 'react';
import FormInput from '../../components/UI/inputs/FormInput/FormInput.tsx';
import FormTextArea from '../../components/UI/inputs/FormTextArea/FormTextArea.tsx';
import { Form, useNavigate, useParams } from 'react-router-dom';
import styleCreateLot from '../createAuction/pageCreateAuction.module.css';
import ImageInput from '../../components/UI/inputs/ImageInput/ImageInput.tsx';
import usePostAPI from '../../hooks/API/usePostAPI.ts';
import useDataUser from '../../hooks/useDataUser.ts';
import IPostLot from '../../API/interfaces/IPostLot.ts';
import { numberChars } from '../../auxiliaryTools/bloclnvalidChar.ts';
import LotService from '../../API/service/LotService.ts';
import { AxiosResponse } from 'axios';
import usePostImage from '../../hooks/API/usePostImage.ts';
import PathApp from '../../routes/pathApp/PathApp.ts';
import LogicFormProcessing from '../../components/LogicFormProcessing/LogicFormProcessing.tsx';
import SubmitButton from '../../components/SubmitButton/SubmitButton.tsx';
import { stateApp } from '../../context/context.ts';
import { NotificationCreateLot } from '../../appLogic/notificationLogic/VarietesNotifications.ts';

const PageCreateLot = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const { loading, error, blurError, postData } = usePostAPI();
    const { dataUser, logicFormValue } = useDataUser<IPostLot>();
    const { setFile, postImage } = usePostImage(postData);

    const postLot = async (): Promise<void> => {
        blurError();
        const resImage = await postImage();
        const image: string | undefined = resImage?.data.fileName;
        if (!image) {
            return;
        }
        const dataPostUser: IPostLot = {
            ...dataUser,
            auctionId: id as string,
            initialPrice: +dataUser.initialPrice,
            betStep: +dataUser.betStep,
            image,
        };

        const res = await postData(
            (): Promise<AxiosResponse> => LotService.addLot(dataPostUser),
        );
        if (res) {
            stateApp.setNotification(NotificationCreateLot);
            nav(`${PathApp.auction}/${id}`);
        }
    };
    return (
        <Form className={styleCreateLot.position} onSubmit={postLot}>
            <div className={styleCreateLot.form}>
                <div className={styleCreateLot.titleBlockLot}>
                    <h1>Создание лота</h1>
                    <LogicFormProcessing loading={loading} err={error} />
                </div>

                <FormInput
                    title="Название лота"
                    name="name"
                    error={error}
                    autoFocus={true}
                    changeValue={logicFormValue}
                    errorBlur={blurError}
                />
                <FormTextArea
                    name="description"
                    title="Описание товара"
                    error={error}
                    errorBlur={blurError}
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
                    <SubmitButton loading={loading}>Создать</SubmitButton>
                </div>
            </div>
        </Form>
    );
};

export default PageCreateLot;
