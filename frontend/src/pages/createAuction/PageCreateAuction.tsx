import useDataUser from '../../hooks/useDataUser.ts';
import IPostAuction, {
    reformatAuction,
} from '../../API/interfaces/IPostAuction.ts';
import DateLogic from '../../auxiliaryTools/dateLogic/DateLogic.ts';
import AuctionService from '../../API/service/AuctionService.ts';
import usePostAPI from '../../hooks/API/usePostAPI.ts';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { FC, useContext } from 'react';
import usePostImage from '../../hooks/API/usePostImage.ts';
import PathApp from '../../routes/pathApp/PathApp.ts';
import { IResponseCreateAuction } from '../../API/interfaces/response/IResponseAuctions.ts';
import { Context } from '../../context/context.ts';
import { NotificationCreateAuction } from '../../appLogic/notificationLogic/VarietesNotifications.ts';
import AuctionInteraction from '../../components/flamePages/AuctionInteraction/AuctionInteraction.tsx';

const { getDateByStringISO } = DateLogic;
const PageCreateAuction: FC = () => {
    const { dataUser, logicFormValue } = useDataUser<IPostAuction>();
    const { error, loading, blurError, postData } = usePostAPI();
    const { setFile, postCorrectImage, imageFile } = usePostImage(postData);
    const { stateApp } = useContext(Context);
    const nav = useNavigate();
    const postAuction = async (): Promise<void> => {
        blurError();
        const image: string | null = await postCorrectImage();
        if (!image) {
            return;
        }
        /*const postAuction: IPostAuction = {
            ...dataUser,
            image,
            dateStart: getDateByStringISO(dateStart),
            dateEnd: getDateByStringISO(dateEnd),
        };*/
        const res: undefined | AxiosResponse<IResponseCreateAuction> =
            await postData(
                (): Promise<AxiosResponse<IResponseCreateAuction>> =>
                    AuctionService.addAuction(reformatAuction(dataUser, image)),
            );
        const auctionId: string | undefined = res?.data.auctionId;
        if (auctionId) {
            nav(`${PathApp.auction}/${auctionId}`);
            stateApp.setNotification(NotificationCreateAuction);
        }
    };
    return (
        <AuctionInteraction
            submitForm={postAuction}
            loading={loading}
            error={error}
            logicFormValue={logicFormValue}
            blurError={blurError}
            logicFileImage={{
                setFileImage: setFile,
                imageFile: imageFile,
            }}
            componentInteraction={{
                title: 'Создание аукциона',
                buttonText: 'Создать аукцион',
                component: null,
            }}
        />
        /*<Form onSubmit={postAuction} className={styleCreateAuction.position}>
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
        </Form>*/
    );
};

export default PageCreateAuction;
