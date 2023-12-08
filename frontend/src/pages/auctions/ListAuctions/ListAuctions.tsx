import { FC, ReactElement, useEffect, useState } from 'react';
import CardAuction from './CardAuction/CardAuction.tsx';
import styleList from './listAuctions.module.css';
import { IElementAuctions } from '../../../interfaces/auctionsTypes.ts';
import LogicDownload from '../../../components/LogicDownload/LogicDownload.tsx';
import AuctionService from '../../../API/service/AuctionService.ts';
import { ResponseObjAuctions } from '../../../API/interfaces/IResponseAuctions.ts';
import Pagination from '../../../components/UI/Pagination/Pagination.tsx';
import useGetPaginationAPI from '../../../hooks/API/useGetPaginationAPI/useGetPaginationAPI.ts';
import BaseButton from '../../../components/UI/BaseButton/BaseButton.tsx';
import ErrorLogic from '../../../components/ErrorLogic/ErrorLogic.tsx';

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
            <>
                <div className={styleList.position}>
                    {auctions.map(
                        (auction: IElementAuctions): ReactElement => (
                            <CardAuction key={auction.id} auction={auction} />
                        ),
                    )}
                </div>
                {auctions.length !== 0 && pagination && (
                    <Pagination
                        pagination={pagination}
                        sendCurrentPage={setCurrentPage}
                    />
                )}
            </>
        </LogicDownload>
    );
};

export default ListAuctions;
