import { FC, memo, useContext, useState } from "react";
import LogicDownload from "../../../components/LogicDownload/LogicDownload.tsx";
import AuctionService from "../../../API/service/AuctionService.ts";
import { ResponseObjAuctions } from "@/API/interfaces/response/IResponseAuctions.ts";
import useGetPaginationAPI from "../../../hooks/API/useGetPaginationAPI/useGetPaginationAPI.ts";
import BaseListAuctions from "../../../components/lists/BaseListAuctions/BaseListAuctions.tsx";
import { observer } from "mobx-react-lite";
import { Context } from "@/context/context.ts";

const ListAuctions: FC = memo(
    observer(() => {
        const [currentPage, setCurrentPage] = useState<number>(1);
        const { stateApp } = useContext(Context);

        const {
            data: { auctions },
            isLoading,
            pagination,
        } = useGetPaginationAPI<ResponseObjAuctions>(
            () =>
                AuctionService.getAuctions(
                    currentPage,
                    2,
                    stateApp.paramsAuctions,
                ),
            ["auctions", currentPage, stateApp.paramsAuctions],
            { auctions: [] },
        );
        return (
            <LogicDownload isLoading={isLoading}>
                <BaseListAuctions
                    auctions={auctions}
                    pagination={pagination}
                    setCurrentPage={setCurrentPage}
                />
            </LogicDownload>
        );
    }),
);

export default ListAuctions;
