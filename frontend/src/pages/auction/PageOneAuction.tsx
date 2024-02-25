import React, { useState } from "react";
import stylePage from "./pageOneAuction.module.css";
import { Link, useParams } from "react-router-dom";
import LogicDownload from "../../components/LogicDownload/LogicDownload.tsx";
import CloseButton from "../../components/CloseButton/CloseButton.tsx";
import AuctionService from "../../API/service/AuctionService.ts";
import Hr from "../../components/UI/Hr/Hr.tsx";
import ListLot from "./ListLot/ListLot.tsx";
import InformationAuction from "./LogicWorkAuction/InformationAuction.tsx";
import PathApp from "../../routes/pathApp/PathApp.ts";
import useGetAPI from "../../hooks/API/useGetAPI.ts";
import { observer } from "mobx-react-lite";
import useGetUserName from "../../hooks/API/useGetUserName.ts";
import ActionsAuction from "./LogicWorkAuction/ActionsAuction.tsx";
import usePathLocation from "../../hooks/usePathLocation.ts";

const PageOneAuction = observer(() => {
    const { id } = useParams<{ id: string }>();
    const [changeStatus, setChangeStatus] = useState<boolean>(false);
    /*const { data: auction, isLoading } = useGetAPI(
        () => AuctionService.getAuctionByID(id),
        {} as IAuction,
        id,
        changeStatus,
    );*/
    const {
        data: auction,
        isLoading,
        isSuccess,
        error,
    } = useGetAPI(
        () => AuctionService.getAuctionByID(id),
        ["auction", id, changeStatus],
    );
    const { userId } = auction;
    const { username, isLoading: loadingUser } = useGetUserName(userId);
    const { fromPath: closePath } = usePathLocation(PathApp.auctions);
    return (
        <div>
            <div className={stylePage.positionClose}>
                <CloseButton logicClick={closePath} />
            </div>
            <div className={stylePage.position}>
                <LogicDownload isLoading={isLoading || loadingUser}>
                    <div>
                        <h1 className={stylePage.title}>
                            Аукцион &quot;{auction.name}&quot;
                        </h1>
                        <Link
                            className={stylePage.userLink}
                            to={`${PathApp.account}/${userId}`}
                        >
                            <h3 className={stylePage.userName}>@{username}</h3>
                        </Link>
                        <InformationAuction auction={auction} />
                        <ActionsAuction
                            auction={auction}
                            userId={userId}
                            setChangeStatus={setChangeStatus}
                        />
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
