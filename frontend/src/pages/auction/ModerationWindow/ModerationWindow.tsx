import useGetAPI from "@/hooks/API/useGetAPI.ts";
import AdminService from "@/API/service/AdminService.ts";
import { FC, useContext, useState } from "react";
import BaseButton from "@/components/UI/BaseButton/BaseButton.tsx";
import AuthService from "@/API/service/AuthService.ts";
import styles from "./moderationWindow.module.scss";
import arrow from "../../../design/icons/collapse.svg";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import AuctionService from "@/API/service/AuctionService.ts";
import { useNavigate } from "react-router-dom";
import PathApp from "@/routes/pathApp/PathApp.ts";
import { Context } from "@/context/context.ts";
import { NotificationModeration } from "@/appLogic/notificationLogic/VarietesNotifications.ts";

interface IModerationWindow {
    auctionId: string;
}

const ModerationWindow: FC<IModerationWindow> = ({ auctionId }) => {
    const { data: roles, isLoading } = useGetAPI(
        () => AuthService.roles(),
        ["roles"],
    );
    const [show, setShow] = useState<boolean>(true);
    const nav = useNavigate();
    const { userStore, stateApp } = useContext(Context);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (callback: () => Promise<AxiosResponse>) => callback(),
    });

    const moveWithAuction = async (callback: () => Promise<AxiosResponse>) => {
        try {
            await mutateAsync(() => callback());
            stateApp.notification = NotificationModeration;
            nav(`${PathApp.moderation}/${userStore.user.userId}`);
            return;
        } catch (e) {
            if (e instanceof AxiosError) {
                alert(e.response?.data || `Error: ${e.message}`);
            }
        }
    };

    if (!isLoading && !AdminService.isModerator(roles)) {
        return <></>;
    }

    return (
        <>
            {!isLoading && AdminService.isModerator(roles) && (
                <>
                    {show ? (
                        <div className={styles.modal}>
                            <div className={styles.imgArrowClose}>
                                <button
                                    className={styles.arrowButton}
                                    onClick={() => setShow(() => false)}
                                >
                                    <img src={arrow} alt="arrow" />
                                </button>
                            </div>
                            <h5>Модераторство</h5>
                            <div className={styles.buttons}>
                                <BaseButton
                                    disabled={isPending}
                                    onClick={() =>
                                        moveWithAuction(() =>
                                            AuctionService.approveAuction(
                                                auctionId,
                                            ),
                                        )
                                    }
                                >
                                    Принять
                                </BaseButton>
                                <BaseButton
                                    red
                                    disabled={isPending}
                                    onClick={() =>
                                        moveWithAuction(() =>
                                            AuctionService.cancelAuction(
                                                auctionId,
                                            ),
                                        )
                                    }
                                >
                                    Отклонить
                                </BaseButton>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={styles.notShowPanel}
                            onClick={() => setShow(() => true)}
                        >
                            <div className={styles.imgArrowOpen}>
                                <img src={arrow} alt="arrow" />
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default ModerationWindow;
