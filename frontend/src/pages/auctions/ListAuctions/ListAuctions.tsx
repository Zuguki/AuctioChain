import { FC, memo, useContext, useState } from 'react';
import LogicDownload from '../../../components/LogicDownload/LogicDownload.tsx';
import AuctionService from '../../../API/service/AuctionService.ts';
import { ResponseObjAuctions } from '../../../API/interfaces/response/IResponseAuctions.ts';
import useGetPaginationAPI from '../../../hooks/API/useGetPaginationAPI/useGetPaginationAPI.ts';
import BaseListAuctions from '../../../components/lists/BaseListAuctions/BaseListAuctions.tsx';
import { Context } from '../../../context/context.ts';
import { observer } from 'mobx-react-lite';

const ListAuctions: FC = memo(
    observer(() => {
        const [currentPage, setCurrentPage] = useState<number>(1);
        const { stateApp } = useContext(Context);
        const {
            data: { auctions },
            loading,
            err,
            pagination,
        } = useGetPaginationAPI<ResponseObjAuctions>(
            () =>
                AuctionService.getAuctions(
                    currentPage,
                    12,
                    stateApp.getParamsAuctions(),
                ),
            currentPage,
            { auctions: [] },
            stateApp.getParamsAuctions(),
        );
        return (
            <LogicDownload isLoading={loading}>
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
