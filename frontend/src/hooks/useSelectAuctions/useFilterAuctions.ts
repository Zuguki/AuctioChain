import { ChangeEvent, Dispatch, SetStateAction, useMemo } from "react";
import SelectsOption from "./ISelectsOption.ts";
import AuctionLogic from "../../appLogic/logicAuction/AuctionLogic.ts";
import changeSelect from "./changeSelect.ts";

const useFilterAuctions = <T>(setParamsFilter: Dispatch<SetStateAction<T>>) => {
    const statusFilter: SelectsOption[] = useMemo(
        () =>
            [1, 2, 3, 4, 5].map((status: number) => ({
                element: AuctionLogic.getTextStatus(status),
                value: status,
            })),
        [],
    );
    return {
        statusFilter,
        changeFilter: (e: ChangeEvent<HTMLSelectElement>) =>
            changeSelect(e, setParamsFilter),
    };
};

export default useFilterAuctions;
