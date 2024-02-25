import useGetAPI from "../API/useGetAPI.ts";
import AuctionService from "../../API/service/AuctionService.ts";
import { useEffect, useMemo } from "react";
import { IPutAuction } from "@/API/interfaces/IPostAuction.ts";
import useDataUser from "../useDataUser.ts";

const useEditAuction = (id: string) => {
    const {
        data: auction,
        error,
        isLoading: loadingAuction,
    } = useGetAPI(() => AuctionService.getAuctionByID(id), ["auction", id]);

    const baseAuction = useMemo((): IPutAuction => {
        const {
            status,
            userId,
            id: auctionId,
            ...intermediateAuction
        } = auction;

        if (auctionId == null) {
            return {} as IPutAuction;
        }
        return { ...intermediateAuction, auctionId };
    }, [auction]);

    const { dataUser, logicFormValue, setDataUser } =
        useDataUser<IPutAuction>(baseAuction);

    useEffect((): void => {
        setDataUser((): IPutAuction => baseAuction);
    }, [baseAuction]);

    return { dataUser, logicFormValue, loadingAuction, auction, baseAuction };
};

export default useEditAuction;
