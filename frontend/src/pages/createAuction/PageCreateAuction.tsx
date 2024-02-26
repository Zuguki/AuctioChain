import useDataUser from "../../hooks/useDataUser.ts";
import IPostAuction, {
    reformatAuction,
} from "../../API/interfaces/request/IPostAuction.ts";
import AuctionService from "../../API/service/AuctionService.ts";
import usePostAPI from "../../hooks/API/usePostAPI.ts";
import { useNavigate } from "react-router-dom";
import { FC, useContext } from "react";
import usePostImage from "../../hooks/API/usePostImage.ts";
import PathApp from "../../routes/pathApp/PathApp.ts";
import { IResponseCreateAuction } from "@/API/interfaces/response/IResponseAuctions.ts";
import { Context } from "@/context/context.ts";
import { NotificationCreateAuction } from "@/appLogic/notificationLogic/VarietesNotifications.ts";
import AuctionInteraction from "../../components/flamePages/AuctionInteraction/AuctionInteraction.tsx";

const PageCreateAuction: FC = () => {
    const { dataUser, logicFormValue } = useDataUser<IPostAuction>();
    const { error, isPending, blurError, postData } = usePostAPI<
        IPostAuction,
        IResponseCreateAuction
    >((postAuction: IPostAuction) => AuctionService.addAuction(postAuction));
    const { setFile, postCorrectImage, imageFile } = usePostImage();
    const { stateApp } = useContext(Context);
    const nav = useNavigate();
    const postAuction = async (): Promise<void> => {
        blurError();
        const image: string | null = await postCorrectImage();
        if (!image) {
            return;
        }
        const res = await postData(reformatAuction(dataUser, image));
        const auctionId: string | undefined = res?.data.auctionId;
        if (auctionId) {
            nav(`${PathApp.auction}/${auctionId}`);
            stateApp.setNotification(NotificationCreateAuction);
        }
    };
    return (
        <AuctionInteraction
            submitForm={postAuction}
            loading={isPending}
            error={error}
            logicFormValue={logicFormValue}
            blurError={blurError}
            logicFileImage={{
                setFileImage: setFile,
                imageFile: imageFile,
            }}
            componentInteraction={{
                title: "Создание аукциона",
                buttonText: "Создать аукцион",
                component: null,
            }}
        />
    );
};

export default PageCreateAuction;
