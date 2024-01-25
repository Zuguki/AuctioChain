import React from 'react';
import LotInteraction from '../../components/flamePages/LotInteraction/LotInteraction.tsx';
import { useParams } from 'react-router-dom';
import { IPutLot, reformatLot } from '../../API/interfaces/IPostLot.ts';
import LogicDownload from '../../components/LogicDownload/LogicDownload.tsx';
import LotService from '../../API/service/LotService.ts';
import equalsObjects from '../../auxiliaryTools/equalsObjects.ts';
import usePostAPI from '../../hooks/API/usePostAPI.ts';
import usePostImage from '../../hooks/API/usePostImage.ts';
import { AxiosResponse } from 'axios';
import { NotificationUpdateLot } from '../../appLogic/notificationLogic/VarietesNotifications.ts';
import PathApp from '../../routes/pathApp/PathApp.ts';
import useSendDataLot from '../../hooks/useSendDataLot.ts';
import editPageLogic from '../../components/flamePages/editPageLogic.ts';
import useEditLot from '../../hooks/useEdit/useEditLot.ts';

const PageEditLot = () => {
    const { id } = useParams();
    const { dataUser, logicFormValue, loadingLot, err, baseLot } =
        useEditLot(id);
    const { error, loading, blurError, postData } = usePostAPI();
    const { setFile, postCorrectImage, imageFile } = usePostImage(postData);
    const { sendData } = useSendDataLot();
    const updateLot = async (): Promise<void> => {
        const image: string | undefined = await editPageLogic(
            dataUser,
            baseLot,
            imageFile,
            blurError,
            postCorrectImage,
        );
        if (image === undefined) {
            return;
        }
        await sendData(
            async (): Promise<AxiosResponse | undefined> =>
                await postData(
                    (): Promise<AxiosResponse> =>
                        LotService.updateLot(reformatLot(dataUser, image)),
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
                componentInteraction={{
                    title: 'Правка лота',
                    buttonText: 'Отредактировать',
                    component: baseLot,
                }}
            />
        </LogicDownload>
    );
};

export default PageEditLot;
