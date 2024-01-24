import FormInput from '../../components/UI/inputs/FormInput/FormInput.tsx';
import FormTextArea from '../../components/UI/inputs/FormTextArea/FormTextArea.tsx';
import DateInput from '../../components/UI/inputs/DataInput/DateInput.tsx';
import styleCreateAuction from '../../components/flamePages/LotInteraction/lotInteraction.module.css';
import useDataUser from '../../hooks/useDataUser.ts';
import IPostAuction from '../../API/interfaces/IPostAuction.ts';
import DateLogic from '../../auxiliaryTools/dateLogic/DateLogic.ts';
import AuctionService from '../../API/service/AuctionService.ts';
import usePostAPI from '../../hooks/API/usePostAPI.ts';
import LogicFormProcessing from '../../components/LogicFormProcessing/LogicFormProcessing.tsx';
import ImageInput from '../../components/UI/inputs/ImageInput/ImageInput.tsx';
import { Form, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { FC, useContext } from 'react';
import usePostImage from '../../hooks/API/usePostImage.ts';
import PathApp from '../../routes/pathApp/PathApp.ts';
import SubmitButton from '../../components/SubmitButton/SubmitButton.tsx';
import { IResponseCreateAuction } from '../../API/interfaces/response/IResponseAuctions.ts';
import { Context } from '../../context/context.ts';
import { NotificationCreateAuction } from '../../appLogic/notificationLogic/VarietesNotifications.ts';

const PageCreateAuction: FC = () => {
    const { dataUser, logicFormValue } = useDataUser<IPostAuction>();
    const { error, loading, blurError, postData } = usePostAPI();
    const { setFile, postCorrectImage } = usePostImage(postData);
    const { stateApp } = useContext(Context);
    const nav = useNavigate();
    const postAuction = async (): Promise<void> => {
        blurError();
        const image: string | null = await postCorrectImage();
        if (!image) {
            return;
        }
        const { dateStart, dateEnd } = dataUser;
        const dataPostUser: IPostAuction = {
            ...dataUser,
            image,
            dateStart: DateLogic.getDateByStringISO(dateStart),
            dateEnd: DateLogic.getDateByStringISO(dateEnd),
        };

        const res: undefined | AxiosResponse<IResponseCreateAuction> =
            await postData(
                (): Promise<AxiosResponse<IResponseCreateAuction>> =>
                    AuctionService.addAuction(dataPostUser),
            );
        const auctionId: string | undefined = res?.data.auctionId;
        if (auctionId) {
            nav(`${PathApp.auction}/${auctionId}`);
            stateApp.setNotification(NotificationCreateAuction);
        }
    };
    return (
        <Form onSubmit={postAuction} className={styleCreateAuction.position}>
            <div className={styleCreateAuction.form}>
                <div className={styleCreateAuction.titleBlock}>
                    <h1>Создание аукциона</h1>
                    <LogicFormProcessing loading={loading} err={error} />
                </div>
                <FormInput
                    title="Название аукциона"
                    name="name"
                    autoFocus={true}
                    error={error}
                    changeValue={logicFormValue}
                    errorBlur={blurError}
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
                />
                <ImageInput
                    title="Фото аукциона"
                    name="image"
                    error={error}
                    changeValue={setFile}
                    errorBlur={blurError}
                />
                <DateInput
                    title="Дата начала (GMT)"
                    name="dateStart"
                    error={error}
                    changeValue={logicFormValue}
                    errorBlur={blurError}
                />
                <p className={styleCreateAuction.additionallyInformation}>
                    Обратите внимание, что торги аукциона начнутся после
                    подтверждения статуса &quot;завершение редактирования&quot;
                    в отдельной странице аукциона.
                </p>
                <DateInput
                    title="Дата окончания (GMT)"
                    name="dateEnd"
                    min={DateLogic.getDateNow()}
                    error={error}
                    changeValue={logicFormValue}
                    errorBlur={blurError}
                />
                <div className={styleCreateAuction.positionButton}>
                    <SubmitButton loading={loading}>
                        Создать аукцион
                    </SubmitButton>
                </div>
            </div>
        </Form>
    );
};

export default PageCreateAuction;
