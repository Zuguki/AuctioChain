import React, { FC, useState } from 'react';
import useGetPaginationAPI from '../../hooks/API/useGetPaginationAPI/useGetPaginationAPI.ts';
import ProfileService from '../../API/service/ProfileService.ts';
import { ResponseActiveLots } from '../../API/interfaces/ILot.ts';
import ListLotsAccount from '../../components/lists/BaseListLot/ListLotsAccount.tsx';

const ListActiveLots: FC<{
    id: string;
    isUser: boolean;
}> = ({ id }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {
        data: { activeLots },
        loading,
        err,
        pagination,
    } = useGetPaginationAPI<ResponseActiveLots>(
        () => ProfileService.getActiveLots(id, currentPage),
        currentPage,
        { activeLots: [] },
        id,
    );
    return (
        <ListLotsAccount
            title="Активные лоты"
            lots={activeLots}
            loading={loading}
            pagination={pagination}
            setCurrentPage={setCurrentPage}
        />
    );
};

export default ListActiveLots;
