import { FC, ReactElement, useState } from 'react';
import CardLot from './CardLot/CardLot.tsx';
import Pagination from '../../../components/UI/Pagination/Pagination.tsx';
import styleList from './listLot.module.css';
import stylePage from '../pageOneAuction.module.css';
import LogicDownload from '../../../components/LogicDownload/LogicDownload.tsx';
import LotService from '../../../API/service/LotService.ts';
import { ResponseObjLots } from '../../../API/interfaces/ILot.ts';
import useGetPaginationAPI from '../../../hooks/API/useGetPaginationAPI/useGetPaginationAPI.ts';

const ListLot: FC<{ id: string }> = ({ id }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {
        data: { lots },
        err,
        pagination,
        loading,
    } = useGetPaginationAPI<ResponseObjLots>(
        () => LotService.getLots(id, currentPage),
        currentPage,
        { lots: [] },
    );
    return (
        <LogicDownload isLoading={loading}>
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
        </LogicDownload>
    );
};

export default ListLot;
