import React, { FC, useState } from "react";
import useGetPaginationAPI from "../../hooks/API/useGetPaginationAPI/useGetPaginationAPI.ts";
import ProfileService from "../../API/service/ProfileService.ts";
import ListLotsAccount from "../../components/lists/BaseListLot/ListLotsAccount.tsx";
import { ResponseWinLots } from "@/API/interfaces/ILot.ts";

const ListWinLots: FC<{
    id: string;
    isUser: boolean;
}> = ({ id }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {
        data: { winLots },
        isLoading,
        error,
        pagination,
    } = useGetPaginationAPI<ResponseWinLots>(
        () => ProfileService.getWinLot(id, currentPage),
        ["winLots", currentPage],
        { winLots: [] },
    );

    return (
        <ListLotsAccount
            title="Выигранные лоты"
            lots={winLots}
            loading={isLoading}
            pagination={pagination}
            setCurrentPage={setCurrentPage}
        />
    );
};

export default ListWinLots;
