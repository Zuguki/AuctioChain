import { FC, useState } from 'react';
import LogicDownload from '../../../components/LogicDownload/LogicDownload.tsx';
import AuctionService from '../../../API/service/AuctionService.ts';
import { ResponseObjAuctions } from '../../../API/interfaces/IResponseAuctions.ts';
import useGetPaginationAPI from '../../../hooks/API/useGetPaginationAPI/useGetPaginationAPI.ts';
import ErrorLogic from '../../../components/ErrorLogic/ErrorLogic.tsx';
import BaseListAuctions from '../../../components/lists/BaseListAuctions/BaseListAuctions.tsx';

const ListAuctions: FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {
        data: { auctions },
        loading,
        err,
        pagination,
    } = useGetPaginationAPI<ResponseObjAuctions>(
        () => AuctionService.getAuctions(currentPage),
        currentPage,
        { auctions: [] },
    );
    if (err) {
        return <ErrorLogic err={err} />;
    }
    return (
        <LogicDownload isLoading={loading}>
            <BaseListAuctions
                auctions={auctions}
                pagination={pagination}
                setCurrentPage={setCurrentPage}
            />
        </LogicDownload>
    );
};

export default ListAuctions;
