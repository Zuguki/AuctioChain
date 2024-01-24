import React, { useEffect, useMemo } from 'react';
import LotInteraction from '../../components/flamePages/LotInteraction/LotInteraction.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import useDataUser from '../../hooks/useDataUser.ts';
import { IPutLot } from '../../API/interfaces/IPostLot.ts';
import LogicDownload from '../../components/LogicDownload/LogicDownload.tsx';
import useGetAPI from '../../hooks/API/useGetAPI.ts';
import LotService from '../../API/service/LotService.ts';
import ILot from '../../API/interfaces/ILot.ts';
import equalsObjects from '../../auxiliaryTools/equalsObjects.ts';
import usePostAPI from '../../hooks/API/usePostAPI.ts';
import usePostImage from '../../hooks/API/usePostImage.ts';
import { AxiosResponse } from 'axios';
import { stateApp } from '../../context/context.ts';
import { NotificationUpdateLot } from '../../appLogic/notificationLogic/VarietesNotifications.ts';
import PathApp from '../../routes/pathApp/PathApp.ts';

const PageEditLot = () => {
    const { id } = useParams();
    const {
        data: lot,
        loading: loadingLot,
        err,
    } = useGetAPI(() => LotService.getLotByID(id), {} as ILot);
    const baseLot = useMemo((): IPutLot => {
        const { id, currentMaxBet, auctionId, ...intermediateLot } = lot;
        if (id === undefined) {
            return {} as IPutLot;
        }
        return { ...intermediateLot, lotId: id };
    }, [lot]);
    const { dataUser, logicFormValue, setDataUser } =
        useDataUser<IPutLot>(baseLot);
    const { error, loading, blurError, postData } = usePostAPI();
    const { setFile, postImage, imageFile } = usePostImage(postData);
    const nav = useNavigate();
    useEffect(() => {
        setDataUser((): IPutLot => baseLot);
    }, [baseLot]);
    useEffect(() => {
        console.log(dataUser);
    }, [dataUser]);

    const updateLot = async (): Promise<void> => {
        blurError();
        const resImage = await postImage();
        const image: string | undefined = resImage?.data.fileName;
        if (!image) {
            return;
        }
        const dataPostUser: IPutLot = {
            ...dataUser,
            initialPrice: +dataUser.initialPrice,
            betStep: +dataUser.betStep,
            image,
        };

        const res = await postData(
            (): Promise<AxiosResponse> => LotService.updateLot(dataPostUser),
        );
        if (res) {
            stateApp.setNotification(NotificationUpdateLot);
            nav(`${PathApp.lot}/${id}`);
        }
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
