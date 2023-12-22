import React, { FC, useContext, useState } from 'react';
import LogicDownload from '../../../components/LogicDownload/LogicDownload.tsx';
import LotService from '../../../API/service/LotService.ts';
import { ResponseObjLots } from '../../../API/interfaces/ILot.ts';
import useGetPaginationAPI from '../../../hooks/API/useGetPaginationAPI/useGetPaginationAPI.ts';
import BaseListLot from '../../../components/lists/BaseListLot/BaseListLot.tsx';
import stylePage from '../pageOneAuction.module.css';
import BaseButton from '../../../components/UI/BaseButton/BaseButton.tsx';
import { Context } from '../../../context/context.ts';
import PathApp from '../../../routes/pathApp/PathApp.ts';
import { Link } from 'react-router-dom';
import IAuction from '../../../API/interfaces/IAuction.ts';
import AuctionLogic from '../../../logicAuction/AuctionLogic.ts';

const ListLot: FC<{ id: string; auction: IAuction }> = ({ id, auction }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { userStore } = useContext(Context);
    const userId: string = userStore.getUser().userId;
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
            <>
                {!!lots.length && (
                    <p className={stylePage.informationLots}>
                        Количество лотов: {pagination?.TotalCount}
                    </p>
                )}
                {userId === auction.userId &&
                    AuctionLogic.isCreation(auction) && (
                        <div className={stylePage.positionCreateLot}>
                            <Link to={`${PathApp.createLot}/${id}`}>
                                <BaseButton>Создать лот</BaseButton>
                            </Link>
                        </div>
                    )}

                <BaseListLot
                    lots={lots}
                    pagination={pagination}
                    setCurrentPage={setCurrentPage}
                />
            </>
        </LogicDownload>
    );
};

export default ListLot;
