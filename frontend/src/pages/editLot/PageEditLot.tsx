import React from 'react';
import LotInteraction from '../../components/flamePages/LotInteraction/LotInteraction.tsx';
import { useParams } from 'react-router-dom';
import { IPutLot } from '../../API/interfaces/IPostLot.ts';
import LogicDownload from '../../components/LogicDownload/LogicDownload.tsx';
import LotService from '../../API/service/LotService.ts';
import equalsObjects from '../../auxiliaryTools/equalsObjects.ts';
import usePostAPI from '../../hooks/API/usePostAPI.ts';
import usePostImage from '../../hooks/API/usePostImage.ts';
import { AxiosResponse } from 'axios';
import { NotificationUpdateLot } from '../../appLogic/notificationLogic/VarietesNotifications.ts';
import PathApp from '../../routes/pathApp/PathApp.ts';
import useEditLot from '../../hooks/useEditLot.ts';
import useSendDataLot from '../../hooks/useSendDataLot.ts';

const PageEditLot = () => {
    const { id } = useParams();
    const { dataUser, logicFormValue, loadingLot, err, baseLot } =
        useEditLot(id);
    const { error, loading, blurError, postData } = usePostAPI();
    const { setFile, postCorrectImage, imageFile } = usePostImage(postData);
    const { sendData } = useSendDataLot();

    const updateLot = async (): Promise<void> => {
        if (equalsObjects(dataUser, baseLot)) {
            alert('Правок не было!');
            return;
        }
        blurError();
        const { initialPrice, betStep, image: imageUser } = dataUser;
        let image: string | null = imageUser;
        if (imageFile) {
            image = await postCorrectImage();
            if (!image) {
                return;
            }
        }
        const dataPostUser: IPutLot = {
            ...dataUser,
            initialPrice: +initialPrice,
            betStep: +betStep,
            image,
        };
        sendData(
            async () =>
                await postData(
                    (): Promise<AxiosResponse> =>
                        LotService.updateLot(dataPostUser),
                ),
            NotificationUpdateLot,
            `${PathApp.lot}/${id}`,
        );
    };
    return (
        <LogicDownload
            isLoading={loadingLot || equalsObjects(baseLot, {} as IPutLot)}
        >
            <LotInteraction
                submitForm={updateLot}
                loading={loading}
                error={error}
                logicFormValue={logicFormValue}
                blurError={blurError}
                logicFileImage={{
                    setFileImage: setFile,
                    imageFile: imageFile,
                }}
                componentLot={{
                    title: 'Правка лота',
                    buttonText: 'Отредактировать',
                    lot: baseLot,
                }}
            />
        </LogicDownload>
    );
};

export default PageEditLot;
