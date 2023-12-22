import React, { FC, useState } from 'react';
import LogicDownload from '../../components/LogicDownload/LogicDownload.tsx';
import BaseListAuctions from '../../components/lists/BaseListAuctions/BaseListAuctions.tsx';
import ProfileService from '../../API/service/ProfileService.ts';
import { ResponseObjAuctions } from '../../API/interfaces/response/IResponseAuctions.ts';
import useGetPaginationAPI from '../../hooks/API/useGetPaginationAPI/useGetPaginationAPI.ts';
import styleAccount from './pageAccount.module.css';
import { Link } from 'react-router-dom';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import PathApp from '../../routes/pathApp/PathApp.ts';

const ListAuctionsProfile: FC<{ id: string; isUser: boolean }> = ({
    id,
    isUser,
}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {
        data: { auctions },
        loading,
        pagination,
        err,
    } = useGetPaginationAPI<ResponseObjAuctions>(
        () => ProfileService.getProfileAuctions(id, currentPage),
        currentPage,
        { auctions: [] },
        id,
    );
    return (
        <div className={styleAccount.positionBlock}>
            <h2 className={styleAccount.positionTitle}>
                {isUser ? 'Мои аукционы' : 'Аукционы'}
            </h2>
            <LogicDownload isLoading={loading}>
                <>
                    {!!auctions.length && (
                        <p className={styleAccount.countCards}>
                            Количество аукционов: {pagination?.TotalCount}
                        </p>
                    )}
                    {isUser && (
                        <Link
                            to={PathApp.createAuction}
                            className={styleAccount.position}
                        >
                            <BaseButton>Создать аукцион</BaseButton>
                        </Link>
                    )}
                    <BaseListAuctions
                        auctions={auctions}
                        pagination={pagination}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            </LogicDownload>
        </div>
    );
};

export default ListAuctionsProfile;
