import React from 'react';
import stylePage from './pageOneAuction.module.css';
import { useParams } from 'react-router-dom';
import useGetAPI from '../../hooks/API/useGetAPI.ts';
import LogicDownload from '../../components/LogicDownload/LogicDownload.tsx';
import CloseButton from '../../components/UI/CloseButton/CloseButton.tsx';
import AuctionService from '../../API/service/AuctionService.ts';
import DateLogic from '../../auxiliaryTools/dateLogic/DateLogic.ts';
import IAuction from '../../API/interfaces/IAuction.ts';
import Hr from '../../components/UI/Hr/Hr.tsx';
import ListLot from './ListLot/ListLot.tsx';

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

    return (
        <>
            <LogicDownload isLoading={loading}>
                <div>
                    <CloseButton />
                    <div className={stylePage.position}>
                        <h1 className={stylePage.title}>Аукцион "{name}"</h1>
                        <h3 className={stylePage.userName}>@{userId}</h3>
                        {Object.hasOwn(auction, 'dateStart') && (
                            <InformationAuction auction={auction} />
                        )}
                        <Hr />
                        <h2>Лоты</h2>
                    </div>
                </div>
            </LogicDownload>
            <ListLot id={id} />
        </>
    );
};

const InformationAuction = ({ auction }: { auction: IAuction }) => {
    const { description, dateStart, dateEnd } = auction;
    return (
        <div className={stylePage.blockInformation}>
            <p className={stylePage.information}>
                Дата начала: {DateLogic.getBaseFormatDateTOStringISO(dateStart)}
            </p>
            <p className={stylePage.information}>
                Дата окончания:{' '}
                {DateLogic.getBaseFormatDateTOStringISO(dateEnd)}
            </p>
            <p className={`${stylePage.information} ${stylePage.description}`}>
                Описание:
            </p>
            <p className={stylePage.information}>{description}</p>
        </div>
    );
};
export default PageOneAuction;
