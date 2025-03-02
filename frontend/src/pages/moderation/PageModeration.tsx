import { Navigate, useParams } from "react-router-dom";
import PathApp from "@/routes/pathApp/PathApp.ts";
import AuctionService from "@/API/service/AuctionService.ts";
import { useContext, useState } from "react";
import { Context } from "@/context/context.ts";
import useGetPaginationAPI from "@/hooks/API/useGetPaginationAPI/useGetPaginationAPI.ts";
import { ResponseObjAuctions } from "@/API/interfaces/response/IResponseAuctions.ts";
import { TYPE_DEVICE } from "@/auxiliaryTools/defineTypeDevice.ts";
import LogicDownload from "@/components/LogicDownload/LogicDownload.tsx";
import BaseListAuctions from "@/components/lists/BaseListAuctions/BaseListAuctions.tsx";
import styles from "./pageModeration.module.scss";

const PageModeration = () => {
    const { id } = useParams();

    if (id == null) {
        alert("Ошибка загрузки страницы!");
        return <Navigate to={PathApp.main} />;
    }

    const [currentPage, setCurrentPage] = useState<number>(1);
    const { stateApp } = useContext(Context);

    const {
        data: { auctions },
        isLoading,
        pagination,
    } = useGetPaginationAPI<ResponseObjAuctions>(
        () =>
            AuctionService.getApproveAuctions(
                currentPage,
                TYPE_DEVICE === "desktop" ? 12 : 6,
                stateApp.paramsAuctions,
            ),
        ["moderationAuctions", currentPage, stateApp.paramsAuctions],
        { auctions: [] },
    );

    return (
        <>
            <div className={styles.position}>
                <h1 className={styles.title}>Модераторство</h1>
                <p>Аукционы требующие проверку:</p>
            </div>
            <LogicDownload isLoading={isLoading}>
                <BaseListAuctions
                    auctions={auctions}
                    pagination={pagination}
                    setCurrentPage={setCurrentPage}
                />
            </LogicDownload>
        </>
    );
};

export default PageModeration;
