import React, { FC } from 'react';
import styleLot from '../pageLot.module.css';
import IPathLotPage from '../../../interfaces/IPathLotPage.ts';
import useGetAPI from '../../../hooks/API/useGetAPI.ts';
import IAuction from '../../../API/interfaces/IAuction.ts';
import AuctionService from '../../../API/service/AuctionService.ts';
import ProfileService from '../../../API/service/ProfileService.ts';
import IUserName from '../../../API/interfaces/IUserName.ts';
import { Link } from 'react-router-dom';
import PathApp from '../../../routes/pathApp/PathApp.ts';

const LeftPathLotPage: FC<IPathLotPage> = ({
    lot: { image, auctionId, name },
}) => {
    if (!auctionId) return null;
    const { data: auction } = useGetAPI<IAuction>(
        () => AuctionService.getAuctionByID(auctionId),
        {} as IAuction,
        auctionId,
    );
    const { userId } = auction;
    const {
        data: { userName },
    } = useGetAPI(
        () => ProfileService.getUserName(userId),
        {} as IUserName,
        userId,
    );
    return (
        <div className={styleLot.left}>
            <img className={styleLot.img} src={image} alt="lot" />
            {userName && (
                <p className={styleLot.auxiliaryText}>
                    Владелец:&nbsp;
                    <Link
                        to={`${PathApp.account}/${userId}`}
                        className={styleLot.textUser}
                    >
                        @{userName}
                    </Link>
                </p>
            )}
            <p className={styleLot.auxiliaryText}>Лот: &quot;{name}&quot;</p>
            <p className={styleLot.protectedText}>Все права защищены.</p>
        </div>
    );
};

export default LeftPathLotPage;
