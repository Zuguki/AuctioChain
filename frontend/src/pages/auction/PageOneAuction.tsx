import React from 'react';
import stylePage from './pageOneAuction.module.css';
import { useParams } from 'react-router-dom';
import useGetAPI from '../../hooks/API/useGetAPI.ts';
import LogicDownload from '../../components/LogicDownload/LogicDownload.tsx';
import CloseButton from '../../components/UI/CloseButton/CloseButton.tsx';
import AuctionService from '../../API/service/AuctionService.ts';
import IAuction from '../../API/interfaces/IAuction.ts';
import Hr from '../../components/UI/Hr/Hr.tsx';
import ListLot from './ListLot/ListLot.tsx';
import ErrorLogic from '../../components/ErrorLogic/ErrorLogic.tsx';
import InformationAuction from './InformationAuction.tsx';

const PageOneAuction = () => {
    const { id } = useParams<string>();
    const {
        data: auction,
        err,
        loading,
    } = useGetAPI<IAuction>(
        () => AuctionService.getAuctionByID(id),
        {} as IAuction,
    );

    const { name, userId } = auction;
    if (err) {
        return <ErrorLogic err={err} />;
    }
    return (
        <div className={stylePage.position}>
            <LogicDownload isLoading={loading}>
                <>
                    <CloseButton />
                    <div>
                        <h1 className={stylePage.title}>
                            Аукцион &quot;{name}&quot;
                        </h1>
                        <h3 className={stylePage.userName}>@{userId}</h3>
                        <InformationAuction auction={auction} />
                        <Hr />
                    </div>
                </>
            </LogicDownload>
            <h2>Лоты</h2>
            <ListLot id={id} />
        </div>
    );
};

export default PageOneAuction;
