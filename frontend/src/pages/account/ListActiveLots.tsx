import { FC, useState } from "react";
import useGetPaginationAPI from "../../hooks/API/useGetPaginationAPI/useGetPaginationAPI.ts";
import ProfileService from "../../API/service/ProfileService.ts";
import ListLotsAccount from "../../components/lists/BaseListLot/ListLotsAccount.tsx";
import { ResponseActiveLots } from "@/API/interfaces/ILot.ts";

const ListActiveLots: FC<{
    id: string;
    isUser: boolean;
}> = ({ id }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {
        data: { activeLots },
        isLoading,
        pagination,
    } = useGetPaginationAPI<ResponseActiveLots>(
        () => ProfileService.getActiveLots(id, currentPage),
        ["activeLots", id, currentPage],
        { activeLots: [] },
    );
    return (
        <ListLotsAccount
            title="Активные лоты"
            lots={activeLots}
            loading={isLoading}
            pagination={pagination}
            setCurrentPage={setCurrentPage}
        />
    );
};

export default ListActiveLots;
