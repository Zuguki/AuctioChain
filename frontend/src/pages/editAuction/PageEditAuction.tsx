import React, { useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import AuctionService from '../../API/service/AuctionService.ts';
import {
    IPutAuction,
    reformatAuction,
} from '../../API/interfaces/IPostAuction.ts';
import AuctionInteraction from '../../components/flamePages/AuctionInteraction/AuctionInteraction.tsx';
import LogicDownload from '../../components/LogicDownload/LogicDownload.tsx';
import usePostAPI from '../../hooks/API/usePostAPI.ts';
import usePostImage from '../../hooks/API/usePostImage.ts';
import equalsObjects from '../../auxiliaryTools/equalsObjects.ts';
import { Context } from '../../context/context.ts';
import PathApp from '../../routes/pathApp/PathApp.ts';
import { NotificationUpdateAuction } from '../../appLogic/notificationLogic/VarietesNotifications.ts';
import { AxiosResponse } from 'axios';
import editPageLogic from '../../components/flamePages/editPageLogic.ts';
import useEditAuction from '../../hooks/useEdit/useEditAuction.ts';

const PageEditAuction = () => {
    const { id } = useParams();
    const { dataUser, loadingAuction, auction, logicFormValue, baseAuction } =
        useEditAuction(id as string);
    const { error, loading, blurError, postData } = usePostAPI();
    const { setFile, postCorrectImage, imageFile } = usePostImage(postData);
    const nav = useNavigate();
    const { stateApp, userStore } = useContext(Context);
    const { userId, status } = auction;
    if (
        (userId !== undefined && userId !== userStore.getUser().userId) ||
        status !== 1
    ) {
        alert('Вам отказано в доступе!');
        return <Navigate to={PathApp.auctions} />;
    }

    const updateAuction = async () => {
        const image: string | undefined = await editPageLogic(
            dataUser,
            baseAuction,
            imageFile,
            blurError,
            postCorrectImage,
        );
        if (image === undefined) {
            return;
        }

        const res: AxiosResponse | undefined = await postData(
            (): Promise<AxiosResponse> =>
                AuctionService.updateAuction(reformatAuction(dataUser, image)),
        );
        if (res) {
            nav(`${PathApp.auction}/${auction.id}`);
            stateApp.setNotification(NotificationUpdateAuction);
        }
    };
    return (
        <LogicDownload
            isLoading={
                loadingAuction || equalsObjects(baseAuction, {} as IPutAuction)
            }
        >
            <AuctionInteraction
                submitForm={updateAuction}
                loading={loading}
                error={error}
                logicFormValue={logicFormValue}
                blurError={blurError}
                logicFileImage={{
                    setFileImage: setFile,
                    imageFile: imageFile,
                }}
                componentInteraction={{
                    title: 'Правка аукциона',
                    buttonText: 'Отредактировать',
                    component: baseAuction,
                }}
            />
        </LogicDownload>
    );
};

export default PageEditAuction;
