import React, { FC, useContext, useState } from 'react';
import styleLot from './pageLot.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ILot from '../../API/interfaces/ILot.ts';
import LogicDownload from '../../components/LogicDownload/LogicDownload.tsx';
import CloseButton from '../../components/UI/CloseButton/CloseButton.tsx';
import useGetAPI from '../../hooks/API/useGetAPI.ts';
import LotService from '../../API/service/LotService.ts';
import PageBet from '../bet/PageBet.tsx';
import { Context } from '../../context/context.ts';
import ErrorLogic from '../../components/ErrorLogic/ErrorLogic.tsx';
import LeftPathLotPage from './PathsLotPage/LeftPathLotPage.tsx';
import RightPathLotPage from './PathsLotPage/RightPathPageLot.tsx';
import PathApp from '../../routes/pathApp/PathApp.ts';

const PageLot: FC = () => {
    const { id } = useParams();
    const { userStore } = useContext(Context);
    const nav = useNavigate();
    const location = useLocation();
    const {
        data: lot,
        loading,
        err,
    } = useGetAPI<ILot>(() => LotService.getLotByID(id), {} as ILot);
    const [showBet, setShowBet] = useState<boolean>(false);
    const closeBet = () => setShowBet((): boolean => false);
    const openBet = (): void => {
        if (userStore.getAuth()) {
            setShowBet((): boolean => true);
            return;
        }
        nav(PathApp.authorization, { state: { from: location } });
    };
    if (err) {
        return <ErrorLogic err={err} />;
    }

    return (
        <LogicDownload isLoading={loading}>
            <div>
                <CloseButton />
                <div className={styleLot.position}>
                    <LeftPathLotPage lot={lot} />
                    <RightPathLotPage lot={lot} openBet={openBet} />
                </div>
                {showBet && <PageBet lotId={id} close={closeBet} />}
            </div>
        </LogicDownload>
    );
};

export default PageLot;
