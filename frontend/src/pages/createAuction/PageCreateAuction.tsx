import FormInput from '../../components/UI/inputs/FormInput/FormInput.tsx';
import FormTextArea from '../../components/UI/inputs/FormTextArea/FormTextArea.tsx';
import DateInput from '../../components/UI/inputs/DataInput/DateInput.tsx';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import styleCreateAuction from './pageCreateAuction.module.css';
import useDataUser from '../../hooks/useDataUser.ts';
import IPostAuction from '../../API/interfaces/IPostAuction.ts';
import DateLogic from '../../auxiliaryTools/dateLogic/DateLogic.ts';
import AuctionService from '../../API/service/AuctionService.ts';
import usePostAPI from '../../hooks/API/usePostAPI.ts';
import LogicFormProcessing from '../../components/LogicFormProcessing/LogicFormProcessing.tsx';
import ImageInput from '../../components/UI/inputs/ImageInput/ImageInput.tsx';
import ImageService from '../../API/service/ImageService.ts';
import IResponseImage from '../../API/interfaces/IResponseImage.ts';
import useProcessingImageInput from '../../hooks/useProcessingImageInput.ts';
import { Form } from 'react-router-dom';
import { Axios, AxiosError, AxiosResponse } from 'axios';
import { FC } from 'react';

const PageCreateAuction: FC = () => {
    const { dataUser, logicFormValue } = useDataUser<IPostAuction>();
    const { error, loading, blurError, postData } = usePostAPI();
    const { imageFile, setFile } = useProcessingImageInput();
    const postAuction = async (): Promise<void> => {
        blurError();
        if (!imageFile) {
            alert('Загрузите изображение!');
            return;
        }
        const res: AxiosResponse<IResponseImage> | undefined =
            await postData<IResponseImage>(
                (): Promise<AxiosResponse<IResponseImage>> =>
                    ImageService.postImage(imageFile),
            );

        const dataPostUser: IPostAuction = {
            ...dataUser,
            image: res?.data.fileName || null,
            dateStart: DateLogic.getDateByStringISO(dataUser.dateStart),
            dateEnd: DateLogic.getDateByStringISO(dataUser.dateEnd),
        };

        await postData(
            (): Promise<AxiosResponse> =>
                AuctionService.addAuction(dataPostUser),
        );
    };
    return (
        <Form onSubmit={postAuction} className={styleCreateAuction.position}>
            <div>
                <h1>Создание аукциона</h1>
                <LogicFormProcessing loading={loading} err={error} />
                <FormInput
                    title="Название аукциона"
                    name="name"
                    error={error}
                    changeValue={logicFormValue}
                    errorBlur={blurError}
                />
                <FormTextArea
                    title="Описание аукциона"
                    name="description"
                    error={error}
                    blurError={blurError}
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
                    title="Дата начала"
                    name="dateStart"
                    error={error}
                    changeValue={logicFormValue}
                    errorBlur={blurError}
                />
                <DateInput
                    title="Дата окончания"
                    name="dateEnd"
                    error={error}
                    changeValue={logicFormValue}
                    errorBlur={blurError}
                />
                <div className={styleCreateAuction.positionButton}>
                    <BaseButton
                        disabled={loading}
                        type="submit"
                        onClick={postAuction}
                    >
                        Создать аукцион
                    </BaseButton>
                </div>
            </div>
        </Form>
    );
};

export default PageCreateAuction;
