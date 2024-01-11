import FormInput from '../../components/UI/inputs/FormInput/FormInput.tsx';
import FormTextArea from '../../components/UI/inputs/FormTextArea/FormTextArea.tsx';
import DateInput from '../../components/UI/inputs/DataInput/DateInput.tsx';
import styleCreateAuction from './pageCreateAuction.module.css';
import useDataUser from '../../hooks/useDataUser.ts';
import IPostAuction from '../../API/interfaces/IPostAuction.ts';
import DateLogic from '../../auxiliaryTools/dateLogic/DateLogic.ts';
import AuctionService from '../../API/service/AuctionService.ts';
import usePostAPI from '../../hooks/API/usePostAPI.ts';
import LogicFormProcessing from '../../components/LogicFormProcessing/LogicFormProcessing.tsx';
import ImageInput from '../../components/UI/inputs/ImageInput/ImageInput.tsx';
import { Form, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { FC } from 'react';
import usePostImage from '../../hooks/API/usePostImage.ts';
import PathApp from '../../routes/pathApp/PathApp.ts';
import SubmitButton from '../../components/SubmitButton/SubmitButton.tsx';
import { IResponseCreateAuction } from '../../API/interfaces/response/IResponseAuctions.ts';
import IResponseImage from '../../API/interfaces/response/IResponseImage.ts';

const PageCreateAuction: FC = () => {
    const nav = useNavigate();
    const { dataUser, logicFormValue } = useDataUser<IPostAuction>();
    const { error, loading, blurError, postData } = usePostAPI();
    const { setFile, postImage } = usePostImage(postData);
    const postAuction = async (): Promise<void> => {
        blurError();
        const resImage: void | AxiosResponse<IResponseImage> =
            await postImage();
        const image: string | undefined = resImage?.data.fileName;
        if (!image) {
            return;
        }
        const dataPostUser: IPostAuction = {
            ...dataUser,
            image,
            dateStart: DateLogic.getDateByStringISO(dataUser.dateStart),
            dateEnd: DateLogic.getDateByStringISO(dataUser.dateEnd),
        };

        const res: void | AxiosResponse<IResponseCreateAuction> =
            await postData(
                (): Promise<AxiosResponse<IResponseCreateAuction>> =>
                    AuctionService.addAuction(dataPostUser),
            );
        const auctionId: string | undefined = res?.data.auctionId;
        if (auctionId) {
            nav(`${PathApp.auction}/${auctionId}`);
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
