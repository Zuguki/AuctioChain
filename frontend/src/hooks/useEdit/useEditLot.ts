import useGetAPI from "../API/useGetAPI.ts";
import LotService from "../../API/service/LotService.ts";
import ILot from "../../API/interfaces/ILot.ts";
import { useEffect, useMemo, useState } from "react";
import { IPutLot } from "../../API/interfaces/IPostLot.ts";
import useDataUser from "../useDataUser.ts";
import IAuction from "../../API/interfaces/IAuction.ts";
import AuctionService from "../../API/service/AuctionService.ts";
import { AxiosResponse } from "axios";

const useEditLot = (id: string) => {
    const [auction, setAuction] = useState<IAuction | null>(null);
    const {
        data: lot,
        loading: loadingLot,
        err,
    } = useGetAPI(() => LotService.getLotByID(id), {} as ILot);
    useEffect((): void => {
        (async (): Promise<void> => {
            const { id, auctionId } = lot;
            if (id !== undefined) {
                const { data } = await AuctionService.getAuctionByID(auctionId);
                setAuction((): IAuction => data);
            }
        })();
    }, [lot.id]);
    if (lot.id !== undefined) {
        let isGetAuction: boolean = false;
        if (!isGetAuction) {
            AuctionService.getAuctionByID(lot.auctionId).then(
                (res: AxiosResponse<IAuction>) =>
                    setAuction((): IAuction => res.data),
            );
            isGetAuction = true;
        }
    }
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
    return { dataUser, logicFormValue, loadingLot, err, baseLot, auction };
};

export default useEditLot;
