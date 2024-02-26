import React, { FC, useContext } from "react";
import LotInteraction from "../../components/flamePages/LotInteraction/LotInteraction.tsx";
import { Navigate, useParams } from "react-router-dom";
import { IPutLot, reformatLot } from "@/API/interfaces/request/IPostLot.ts";
import LogicDownload from "../../components/LogicDownload/LogicDownload.tsx";
import LotService from "../../API/service/LotService.ts";
import equalsObjects from "../../auxiliaryTools/equalsObjects.ts";
import usePostAPI from "../../hooks/API/usePostAPI.ts";
import usePostImage from "../../hooks/API/usePostImage.ts";
import { AxiosResponse } from "axios";
import { NotificationUpdateLot } from "@/appLogic/notificationLogic/VarietesNotifications.ts";
import PathApp from "../../routes/pathApp/PathApp.ts";
import useSendDataLot from "../../hooks/useSendDataLot.ts";
import editPageLogic from "../../components/flamePages/editPageLogic.ts";
import useEditLot from "../../hooks/useEdit/useEditLot.ts";
import { Context } from "@/context/context.ts";

const PageEditLot: FC = () => {
    const { id } = useParams();
    const { dataUser, logicFormValue, loadingLot, baseLot, auction } =
        useEditLot(id);
    const { error, isPending, blurError, postData } = usePostAPI<IPutLot>(
        (updatedLot) => LotService.updateLot(updatedLot),
    );
    const { setFile, postCorrectImage, imageFile } = usePostImage();
    const { sendData } = useSendDataLot();
    const { userStore } = useContext(Context);

    if (auction) {
        const { userId, status } = auction;
        if (userId !== userStore.getUser().userId || status < 1 || status > 2) {
            alert("Вам отказано в доступе!");
            return <Navigate to={PathApp.auctions} />;
        }
    }

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
            (): Promise<AxiosResponse> =>
                postData(reformatLot(dataUser, image)),
            NotificationUpdateLot,
            `${PathApp.lot}/${id}`,
        );
    };
    return (
        <LogicDownload
            isLoading={
                loadingLot || equalsObjects(baseLot, {} as IPutLot) || !auction
            }
        >
            <LotInteraction
                submitForm={updateLot}
                loading={isPending}
                error={error}
                logicFormValue={logicFormValue}
                blurError={blurError}
                logicFileImage={{
                    setFileImage: setFile,
                    imageFile: imageFile,
                }}
                componentInteraction={{
                    title: "Правка лота",
                    buttonText: "Отредактировать",
                    component: baseLot,
                }}
            />
        </LogicDownload>
    );
};

export default PageEditLot;
