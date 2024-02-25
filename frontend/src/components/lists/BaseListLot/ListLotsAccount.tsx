import React, { FC } from "react";
import styleAccount from "../../../pages/account/pageAccount.module.css";
import LogicDownload from "../../LogicDownload/LogicDownload.tsx";
import BaseListLot from "./BaseListLot.tsx";
import ILogicPagination from "../../../hooks/API/useGetPaginationAPI/ILogicPagination.ts";
import ILot from "../../../API/interfaces/ILot.ts";

interface ListLotsAccount {
    lots: ILot[];
    title: string;
    loading: boolean;
    pagination: ILogicPagination | null;
    setCurrentPage: (page: number) => void;
}

const ListLotsAccount: FC<ListLotsAccount> = ({
    lots,
    title,
    loading,
    pagination,
    setCurrentPage,
}) => {
    return (
        <div className={styleAccount.positionBlock}>
            <h2 className={styleAccount.position}>{title}</h2>
            <LogicDownload isLoading={loading}>
                <>
                    {!!lots.length && (
                        <p className={styleAccount.informationLots}>
                            Количество лотов: {pagination?.TotalCount}
                        </p>
                    )}
                    <BaseListLot
                        lots={lots}
                        pagination={pagination}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            </LogicDownload>
        </div>
    );
};

export default ListLotsAccount;
