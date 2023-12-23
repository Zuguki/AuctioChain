import React, { FC, useContext } from 'react';
import AuctionLogic from '../../../logicAuction/AuctionLogic.ts';
import BaseButton from '../../../components/UI/BaseButton/BaseButton.tsx';
import stylePage from '../pageOneAuction.module.css';
import { Context } from '../../../context/context.ts';
import IAuction from '../../../API/interfaces/IAuction.ts';
import AuctionService from '../../../API/service/AuctionService.ts';
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
        try {
            await AuctionService.setNewStatusAuction(id);
        } catch (err) {
            alert(`Ошибка обновления статуса: ${err}`);
            return;
        }
        try {
            await AuctionService.getAuctionByID(id);
            setChangeStatus(true);
        } catch (err) {
            alert('Ошибка обновления. Попробуйте перезагрузить страницу!');
        }
    };
    const deleteAuction = async (): Promise<void> => {
        try {
            await AuctionService.deleteAuctionById(id);
            nav(`${PathApp.account}/${userId}`);
        } catch (err) {
            alert('Ошибка удаления');
        }
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
