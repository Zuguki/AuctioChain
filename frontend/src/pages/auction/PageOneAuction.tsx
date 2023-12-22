import React, { useContext, useState } from 'react';
import stylePage from './pageOneAuction.module.css';
import { Link, useParams } from 'react-router-dom';
import LogicDownload from '../../components/LogicDownload/LogicDownload.tsx';
import CloseButton from '../../components/CloseButton/CloseButton.tsx';
import AuctionService from '../../API/service/AuctionService.ts';
import IAuction from '../../API/interfaces/IAuction.ts';
import Hr from '../../components/UI/Hr/Hr.tsx';
import ListLot from './ListLot/ListLot.tsx';
import InformationAuction from './InformationAuction.tsx';
import PathApp from '../../routes/pathApp/PathApp.ts';
import useGetAPI from '../../hooks/API/useGetAPI.ts';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import AuctionLogic from '../../logicAuction/AuctionLogic.ts';
import { Context } from '../../context/context.ts';
import { observer } from 'mobx-react-lite';
import useGetUserName from '../../hooks/API/useGetUserName.ts';

type QuizParams = {
    id: string;
};

const PageOneAuction = observer(() => {
    const { id } = useParams<{ id: string }>();
    const { userStore } = useContext(Context);
    const [changeStatus, setChangeStatus] = useState<boolean>(false);
    const { data: auction, loading } = useGetAPI(
        () => AuctionService.getAuctionByID(id),
        {} as IAuction,
        id,
        changeStatus,
    );
    const { userId } = auction;
    const { userName, loading: loadingUser, err } = useGetUserName(userId);

    const setActiveAuction = async (): Promise<void> => {
        await AuctionService.setNewStatusAuction(id);
        const res = await AuctionService.getAuctionByID(id);
        if (res) {
            setChangeStatus(() => true);
        }
    };
    return (
        <div>
            <div className={stylePage.positionClose}>
                <CloseButton />
            </div>
            <div className={stylePage.position}>
                <LogicDownload isLoading={loading || loadingUser}>
                    <div>
                        <h1 className={stylePage.title}>
                            Аукцион &quot;{auction.name}&quot;
                        </h1>
                        <Link
                            className={stylePage.userLink}
                            to={`${PathApp.account}/${userId}`}
                        >
                            <h3 className={stylePage.userName}>@{userName}</h3>
                        </Link>
                        <InformationAuction auction={auction} />
                        {AuctionLogic.isCreation(auction) &&
                            userStore.getUser().userId === userId && (
                                <>
                                    <BaseButton
                                        onClick={() => setActiveAuction()}
                                    >
                                        Завершить правку
                                    </BaseButton>
                                    <p className={stylePage.informationFinish}>
                                        Обратите внимание, что торги аукциона
                                        начнуться после подтверждения статуса
                                        &quot;завершение редактирования&quot; в
                                        отдельной странице аукциона.
                                    </p>
                                </>
                            )}
                        <Hr />
                    </div>
                </LogicDownload>
                <h2>Лоты</h2>
            </div>
            <ListLot id={id} auction={auction} />
        </div>
    );
});

export default PageOneAuction;
