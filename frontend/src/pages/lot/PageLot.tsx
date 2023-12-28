import React, { FC, useContext, useState } from 'react';
import styleLot from './pageLot.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ILot from '../../API/interfaces/ILot.ts';
import LogicDownload from '../../components/LogicDownload/LogicDownload.tsx';
import CloseButton from '../../components/CloseButton/CloseButton.tsx';
import useGetAPI from '../../hooks/API/useGetAPI.ts';
import LotService from '../../API/service/LotService.ts';
import PageBet from '../bet/PageBet.tsx';
import { Context } from '../../context/context.ts';
import LeftPathLotPage from './PathsLotPage/LeftPathLotPage.tsx';
import RightPathLotPage from './PathsLotPage/RightPathPageLot.tsx';
import PathApp from '../../routes/pathApp/PathApp.ts';
import { AxiosResponse } from 'axios';

const PageLot: FC = () => {
    const { id } = useParams();
    const { userStore } = useContext(Context);
    const nav = useNavigate();
    const location = useLocation();
    const [bet, setBet] = useState<AxiosResponse | null>(null);
    const {
        data: lot,
        loading,
        err,
    } = useGetAPI<ILot>(() => LotService.getLotByID(id), {} as ILot, bet);
    const [showBet, setShowBet] = useState<boolean>(false);
    const closeBet = () => setShowBet((): boolean => false);
    const openBet = (): void => {
        if (userStore.getAuth()) {
            setShowBet((): boolean => true);
            return;
        }
        nav(PathApp.authorization, { state: { from: location } });
    };

    return (
        <LogicDownload isLoading={loading}>
            <div>
                <div className={styleLot.positionClose}>
                    <CloseButton />
                </div>
                <div className={styleLot.position}>
                    <LeftPathLotPage lot={lot} />
                    <RightPathLotPage lot={lot} openBet={openBet} />
                </div>
                {showBet && (
                    <PageBet setBet={setBet} lot={lot} close={closeBet} />
                )}
            </div>
        </LogicDownload>
    );
};

export default PageLot;
