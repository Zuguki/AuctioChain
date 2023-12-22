import { FC, useState } from 'react';
import LogicDownload from '../../../components/LogicDownload/LogicDownload.tsx';
import AuctionService from '../../../API/service/AuctionService.ts';
import { ResponseObjAuctions } from '../../../API/interfaces/response/IResponseAuctions.ts';
import useGetPaginationAPI from '../../../hooks/API/useGetPaginationAPI/useGetPaginationAPI.ts';
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
