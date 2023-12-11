import React, { FC, ReactElement } from 'react';
import stylePage from '../pages/auction/pageOneAuction.module.css';
import styleList from '../pages/auction/ListLot/listLot.module.css';
import CardLot from '../pages/auction/ListLot/CardLot/CardLot.tsx';
import Pagination from './UI/Pagination/Pagination.tsx';
import ILot from '../API/interfaces/ILot.ts';
import ILogicPagination from '../hooks/API/useGetPaginationAPI/ILogicPagination.ts';

interface IBaseListLot {
    lots: ILot[];
    pagination: ILogicPagination | null;
    setCurrentPage: (page: number) => void;
}

const BaseListLot: FC<IBaseListLot> = ({
    lots,
    pagination,
    setCurrentPage,
}) => {
    return (
        <div>
            {lots.length !== 0 ? (
                <>
                    <p className={stylePage.informationLots}>
                        Количество лотов: {pagination?.TotalCount}
                    </p>
                    <div className={styleList.position}>
                        {lots.map(
                            (lot): ReactElement => (
                                <CardLot key={lot.id} lot={lot} />
                            ),
                        )}
                    </div>
                    {pagination && (
                        <Pagination
                            pagination={pagination}
                            sendCurrentPage={setCurrentPage}
                        />
                    )}
                    )
                </>
            ) : (
                <p className={stylePage.informationLots}>Лотов нет</p>
            )}
        </div>
    );
};

export default BaseListLot;
