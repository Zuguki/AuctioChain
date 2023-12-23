import React, { FC, useContext } from 'react';
import AuctionLogic from '../../../logicAuction/AuctionLogic.ts';
import BaseButton from '../../../components/UI/BaseButton/BaseButton.tsx';
import stylePage from '../pageOneAuction.module.css';
import { Context } from '../../../context/context.ts';
import IAuction from '../../../API/interfaces/IAuction.ts';
import AuctionService from '../../../API/service/AuctionService.ts';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import PathApp from '../../../routes/pathApp/PathApp.ts';

interface IActionsAuction {
    auction: IAuction;
    userId: string;
    setChangeStatus: (status: boolean) => void;
}

const ActionsAuction: FC<IActionsAuction> = ({
    auction,
    userId,
    setChangeStatus,
}) => {
    const { userStore } = useContext(Context);
    const nav = useNavigate();
    const id: string = auction.id;
    const isCreation: boolean = AuctionLogic.isCreation(auction);
    const setActiveAuction = async (): Promise<void> => {
        await AuctionService.setNewStatusAuction(id);
        const res = await AuctionService.getAuctionByID(id);
        if (res) {
            setChangeStatus(true);
        }
    };
    const deleteAuction = async (): Promise<void> => {
        const res: AxiosResponse = await AuctionService.deleteAuctionById(id);
        if (res) {
            nav(`${PathApp.account}/${userId}`);
            return;
        }
        alert('Неуспешное удаление аукциона!');
    };
    return (
        <>
            {userStore.getUser().userId === userId && (
                <>
                    {isCreation && (
                        <div className={stylePage.positionButtonActive}>
                            <BaseButton onClick={setActiveAuction}>
                                Завершить правку
                            </BaseButton>
                        </div>
                    )}
                    {(isCreation || AuctionLogic.isWaitBidding(auction)) && (
                        <BaseButton red onClick={deleteAuction}>
                            Удалить аукцион
                        </BaseButton>
                    )}
                    {isCreation && (
                        <p className={stylePage.informationFinish}>
                            Обратите внимание, что торги аукциона начнуться
                            после подтверждения статуса &quot;завершение
                            редактирования&quot; в отдельной странице аукциона.
                        </p>
                    )}
                </>
            )}
        </>
    );
};

export default ActionsAuction;
