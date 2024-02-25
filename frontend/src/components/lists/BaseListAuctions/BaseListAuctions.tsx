import React, { FC, ReactElement } from "react";
import styleList from "./listAuctions.module.css";
import CardAuction from "../CardAuction/CardAuction.tsx";
import Pagination from "../../UI/Pagination/Pagination.tsx";
import IResponseAuction from "../../../API/interfaces/response/IResponseAuctions.ts";
import ILogicPagination from "../../../hooks/API/useGetPaginationAPI/ILogicPagination.ts";

interface IBaseListAuctions {
    auctions: IResponseAuction[];
    pagination: ILogicPagination | null;
    setCurrentPage: (page: number) => void;
}

const BaseListAuctions: FC<IBaseListAuctions> = ({
    auctions,
    pagination,
    setCurrentPage,
}) => {
    if (!auctions.length) {
        return <p className={styleList.information}>Аукционов нет</p>;
    }
    return (
        <div>
            <div className={styleList.position}>
                {auctions.map(
                    (auction: IResponseAuction): ReactElement => (
                        <CardAuction key={auction.id} auction={auction} />
                    ),
                )}
            </div>
            {auctions.length !== 0 && (
                <Pagination
                    pagination={pagination}
                    sendCurrentPage={setCurrentPage}
                />
            )}
        </div>
    );
};

export default BaseListAuctions;
