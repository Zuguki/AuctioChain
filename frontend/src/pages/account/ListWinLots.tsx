import React, { FC, useState } from 'react';
import BaseListLot from '../../components/lists/BaseListLot/BaseListLot.tsx';
import useGetPaginationAPI from '../../hooks/API/useGetPaginationAPI/useGetPaginationAPI.ts';
import ProfileService from '../../API/service/ProfileService.ts';
import { ResponseWinLots } from '../../API/interfaces/ILot.ts';
import LogicDownload from '../../components/LogicDownload/LogicDownload.tsx';
import styleAccount from './pageAccount.module.css';

const ListWinLots: FC<{
    id: string;
    isUser: boolean;
}> = ({ id }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {
        data: { winLots },
        loading,
        err,
        pagination,
    } = useGetPaginationAPI<ResponseWinLots>(
        () => ProfileService.getWinLot(id, currentPage),
        currentPage,
        { winLots: [] },
    );
    return (
        <div>
            <h2 className={styleAccount.position}>Выигранные лоты</h2>
            <LogicDownload isLoading={loading}>
                <>
                    {!!winLots.length && (
                        <p className={styleAccount.informationLots}>
                            Количество лотов: {pagination?.TotalCount}
                        </p>
                    )}
                    <BaseListLot
                        lots={winLots}
                        pagination={pagination}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            </LogicDownload>
        </div>
    );
};

export default ListWinLots;
