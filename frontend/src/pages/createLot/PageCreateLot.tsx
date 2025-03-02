import { FC } from "react";
import { useParams } from "react-router-dom";
import usePostAPI from "../../hooks/API/usePostAPI.ts";
import useDataUser from "../../hooks/useDataUser.ts";
import IPostLot, {
    reformatLot,
} from "../../API/interfaces/request/IPostLot.ts";
import usePostImage from "../../hooks/API/usePostImage.ts";
import LotInteraction from "../../components/flamePages/LotInteraction/LotInteraction.tsx";
import LotService from "../../API/service/LotService.ts";
import { NotificationCreateLot } from "@/appLogic/notificationLogic/VarietesNotifications.ts";
import PathApp from "../../routes/pathApp/PathApp.ts";
import useSendDataLot from "../../hooks/useSendDataLot.ts";

const PageCreateLot: FC = () => {
    const { id } = useParams();
    const { error, isPending, blurError, postData } = usePostAPI<IPostLot>(
        (postLot: IPostLot) => LotService.addLot(postLot),
    );
    const { dataUser, logicFormValue } = useDataUser<IPostLot>();
    const { setFile, imageFile, postCorrectImage } = usePostImage();
    const { sendData } = useSendDataLot();
    const postLot = async (): Promise<void> => {
        blurError();
        const image: string | null = await postCorrectImage();
        if (!image) {
            return;
        }

        const postLot: IPostLot = {
            ...reformatLot(dataUser, image),
            auctionId: id as string,
        };

        await sendData(
            () => postData(postLot),
            NotificationCreateLot,
            `${PathApp.auction}/${id}`,
        );
    };
    return (
        <LotInteraction
            submitForm={postLot}
            loading={isPending}
            error={error}
            logicFormValue={logicFormValue}
            blurError={blurError}
            logicFileImage={{
                setFileImage: setFile,
                imageFile: imageFile,
            }}
            componentInteraction={{
                title: "Создание лота",
                buttonText: "Создать",
                component: null,
            }}
        />
    );
};

export default PageCreateLot;
