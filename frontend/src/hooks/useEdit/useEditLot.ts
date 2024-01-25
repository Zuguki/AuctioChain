import useGetAPI from '../API/useGetAPI.ts';
import LotService from '../../API/service/LotService.ts';
import ILot from '../../API/interfaces/ILot.ts';
import { useEffect, useMemo } from 'react';
import { IPutLot } from '../../API/interfaces/IPostLot.ts';
import useDataUser from '../useDataUser.ts';

const useEditLot = (id: string) => {
    const {
        data: lot,
        loading: loadingLot,
        err,
    } = useGetAPI(() => LotService.getLotByID(id), {} as ILot);
    const baseLot = useMemo((): IPutLot => {
        const { id, currentMaxBet, auctionId, ...intermediateLot } = lot;
        if (id === undefined) {
            return {} as IPutLot;
        }
        return { ...intermediateLot, lotId: id };
    }, [lot]);
    const { dataUser, logicFormValue, setDataUser } =
        useDataUser<IPutLot>(baseLot);
    useEffect((): void => {
        setDataUser((): IPutLot => baseLot);
    }, [baseLot]);
    return { dataUser, logicFormValue, loadingLot, err, baseLot };
};

export default useEditLot;
