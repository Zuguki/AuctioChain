import { useEffect, useState } from "react";
import { numberArray } from "../auxiliaryTools/numberArray.ts";
import ILogicPagination from "./API/useGetPaginationAPI/ILogicPagination.ts";

const usePagination = (
    pagination: ILogicPagination,
    sendCurrentPage: (page: number) => void,
) => {
    const { TotalPages: endPage, CurrentPage: currentPage } = pagination;
    const [paginationArray, setPaginationArray] = useState(
        numberArray(currentPage, endPage),
    );

    useEffect((): void => {
        sendCurrentPage(currentPage);
        setPaginationArray((): ("..." | number)[] =>
            numberArray(currentPage, endPage),
        );
    }, [currentPage]);

    return { currentPage, endPage, paginationArray };
};

export default usePagination;
