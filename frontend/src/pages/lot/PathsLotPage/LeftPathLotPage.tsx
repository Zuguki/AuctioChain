import React, { FC, memo } from 'react';
import styleLot from '../pageLot.module.css';
import IPathLotPage from '../../../interfaces/IPathLotPage.ts';
import useGetAPI from '../../../hooks/API/useGetAPI.ts';
import IAuction from '../../../API/interfaces/IAuction.ts';
import AuctionService from '../../../API/service/AuctionService.ts';
import { Link, useNavigate } from 'react-router-dom';
import PathApp from '../../../routes/pathApp/PathApp.ts';
import useGetUserName from '../../../hooks/API/useGetUserName.ts';
import AuctionLogic from '../../../logicAuction/AuctionLogic.ts';
import BaseButton from '../../../components/UI/BaseButton/BaseButton.tsx';
import LotService from '../../../API/service/LotService.ts';

const LeftPathLotPage: FC<IPathLotPage> = memo(
    ({ lot: { image, auctionId, name, id } }) => {
        if (!auctionId) return null;
        const nav = useNavigate();
        const { data: auction } = useGetAPI<IAuction>(
            () => AuctionService.getAuctionByID(auctionId),
            {} as IAuction,
            auctionId,
        );
        const { userId } = auction;
        const { userName } = useGetUserName(userId);
        const deleteLot = async (): Promise<void> => {
            try {
                await LotService.deleteLotById(id);
                nav(`${PathApp.auction}/${auctionId}`);
            } catch (err) {
                alert('Ошибка удаления лота!');
            }
        };
        return (
            <div className={styleLot.left}>
                <img className={styleLot.img} src={image} alt="lot" />
                {userName && auctionId && (
                    <>
                        <p className={styleLot.auxiliaryText}>
                            Владелец:&nbsp;
                            <Link
                                to={`${PathApp.account}/${userId}`}
                                className={styleLot.linkLot}
                            >
                                @{userName}
                            </Link>
                        </p>
                        <p className={styleLot.auxiliaryText}>
                            Аукцион:&nbsp;
                            <Link
                                className={styleLot.linkLot}
                                to={`${PathApp.auction}/${auctionId}`}
                            >
                                {name}
                            </Link>
                        </p>
                    </>
                )}
                {AuctionLogic.isCreation(auction) && (
                    <>
                        <div className={styleLot.positionDelete}>
                            <BaseButton red onClick={deleteLot}>
                                Удалить лот
                            </BaseButton>
                        </div>
                        <p className={styleLot.protectedText}>
                            Удаление лотов доступно только в статусе создания
                            аукциона!
                        </p>
                    </>
                )}
                {!AuctionLogic.isCreation(auction) && (
                    <p className={styleLot.protectedText}>
                        Все права защищены.
                    </p>
                )}
            </div>
        );
    },
);

export default LeftPathLotPage;
