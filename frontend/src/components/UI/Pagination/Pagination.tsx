import React, { FC, ReactElement } from "react";
import stylePagination from "./pagination.module.css";
import ButtonPage from "./ButtonPage.tsx";
import ButtonSwipeUp from "./ButtonSwipes/ButtonSwipeUp.tsx";
import ButtonSwipeBack from "./ButtonSwipes/ButtonSwipeBack.tsx";
import ILogicPagination from "../../../hooks/API/useGetPaginationAPI/ILogicPagination.ts";
import usePagination from "../../../hooks/usePagination.ts";

interface IPagination {
    pagination: ILogicPagination;
    sendCurrentPage: (page: number) => void;
}

const Pagination: FC<IPagination> = ({ pagination, sendCurrentPage }) => {
    const { endPage, currentPage, paginationArray } = usePagination(
        pagination,
        sendCurrentPage,
    );

    if (endPage <= 1) {
        return null;
    }
    return (
        <div className={stylePagination.position}>
            <ButtonSwipeBack
                currentPage={currentPage}
                setCurrentPage={sendCurrentPage}
                disabled={currentPage === 1}
            />
            {paginationArray.map(
                (el: "..." | number): ReactElement => (
                    <ButtonPage
                        current={el === currentPage}
                        key={el}
                        value={el}
                        sendCurrentPage={sendCurrentPage}
                    >
                        {el}
                    </ButtonPage>
                ),
            )}
            <ButtonSwipeUp
                currentPage={currentPage}
                setCurrentPage={sendCurrentPage}
                endPage={endPage}
                disabled={currentPage === endPage}
            />
        </div>
    );
};
export default Pagination;
