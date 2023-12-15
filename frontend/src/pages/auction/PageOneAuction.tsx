import React from 'react';
import stylePage from './pageOneAuction.module.css';
import { Link, useParams } from 'react-router-dom';
import LogicDownload from '../../components/LogicDownload/LogicDownload.tsx';
import CloseButton from '../../components/CloseButton/CloseButton.tsx';
import AuctionService from '../../API/service/AuctionService.ts';
import IAuction from '../../API/interfaces/IAuction.ts';
import Hr from '../../components/UI/Hr/Hr.tsx';
import ListLot from './ListLot/ListLot.tsx';
import InformationAuction from './InformationAuction.tsx';
import ProfileService from '../../API/service/ProfileService.ts';
import PathApp from '../../routes/pathApp/PathApp.ts';
import useGetAPI from '../../hooks/API/useGetAPI.ts';
import IUserName from '../../API/interfaces/IUserName.ts';

const PageOneAuction = () => {
    const { id } = useParams<string>();
    const { data: auction, loading } = useGetAPI(
        () => AuctionService.getAuctionByID(id),
        {} as IAuction,
        id,
    );
    const { userId } = auction;
    const {
        data: { userName },
        loading: loadingUser,
    } = useGetAPI(
        () => ProfileService.getUserName(userId),
        {} as IUserName,
        userId,
    );
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
                        <Hr />
                    </div>
                </LogicDownload>
                <h2>Лоты</h2>
            </div>
            <ListLot id={id} userAuctionId={auction.userId} />
        </div>
    );
};

export default PageOneAuction;
