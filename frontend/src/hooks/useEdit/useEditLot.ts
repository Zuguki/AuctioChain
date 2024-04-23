import useGetAPI from "../API/useGetAPI.ts";
import LotService from "../../API/service/LotService.ts";
import ILot from "../../API/interfaces/ILot.ts";
import { useEffect, useMemo, useState } from "react";
import { IPutLot } from "@/API/interfaces/request/IPostLot.ts";
import useDataUser from "../useDataUser.ts";
import IAuction from "../../API/interfaces/IAuction.ts";
import AuctionService from "../../API/service/AuctionService.ts";
import { AxiosResponse } from "axios";

const useEditLot = (id: string) => {
    const [auction, setAuction] = useState<IAuction | null>(null);
    const {
        data: lot,
        isLoading: loadingLot,
        error,
    } = useGetAPI<ILot>(() => LotService.getLotByID(id), ["lot"]);

    useEffect((): void => {
        (async (): Promise<void> => {
            const { id, auctionId } = lot;
            if (id != null) {
                const { data } = await AuctionService.getAuctionByID(auctionId);
                setAuction((): IAuction => data);
            }
        })();
    }, [lot.id]);
    if (lot.id != null) {
        AuctionService.getAuctionByID(lot.auctionId).then(
            (res: AxiosResponse<IAuction>) =>
                setAuction((): IAuction => res.data),
        );
    }
    const baseLot = useMemo((): IPutLot => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, currentMaxBet, auctionId, ...intermediateLot } = lot;
        if (id == null) {
            return {} as IPutLot;
        }
        return { ...intermediateLot, lotId: id };
    }, [lot]);

    const { dataUser, logicFormValue, setDataUser } =
        useDataUser<IPutLot>(baseLot);
    useEffect((): void => {
        setDataUser((): IPutLot => baseLot);
    }, [baseLot]);

    return { dataUser, logicFormValue, loadingLot, error, baseLot, auction };
};

export default useEditLot;
