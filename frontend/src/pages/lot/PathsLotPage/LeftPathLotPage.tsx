import React, { FC, memo } from 'react';
import styleLot from '../pageLot.module.css';
import IPathLotPage from '../../../interfaces/IPathLotPage.ts';
import useGetAPI from '../../../hooks/API/useGetAPI.ts';
import IAuction from '../../../API/interfaces/IAuction.ts';
import AuctionService from '../../../API/service/AuctionService.ts';
import { Link, useNavigate } from 'react-router-dom';
import PathApp from '../../../routes/pathApp/PathApp.ts';
import useGetUserName from '../../../hooks/API/useGetUserName.ts';
import AuctionLogic from '../../../appLogic/logicAuction/AuctionLogic.ts';
import BaseButton from '../../../components/UI/BaseButton/BaseButton.tsx';
import LotService from '../../../API/service/LotService.ts';

const LeftPathLotPage: FC<IPathLotPage> = memo(({ lot }) => {
    const { image, auctionId, name, id } = lot;
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
            {(AuctionLogic.isCreation(auction) ||
                AuctionLogic.isWaitBidding(auction)) && (
                <>
                    <div className={styleLot.positionButton}>
                        <BaseButton
                            onClick={() => nav(`${PathApp.editLot}/${id}`)}
                        >
                            Редактировать лот
                        </BaseButton>
                        <BaseButton
                            red
                            onClick={deleteLot}
                            style={{ marginLeft: 5 }}
                        >
                            Удалить лот
                        </BaseButton>
                    </div>
                    <p className={styleLot.protectedText}>
                        Удаление и редактирование лотов доступно только в
                        статусе создания аукциона и ожидания торгов!
                    </p>
                </>
            )}
            {!AuctionLogic.isCreation(auction) && (
                <p className={styleLot.protectedText}>Все права защищены.</p>
            )}
        </div>
    );
});

export default LeftPathLotPage;
