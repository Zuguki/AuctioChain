import SelectsOption from "@/hooks/useSelectAuctions/ISelectsOption.ts";
import AuctionLogic from "@/appLogic/logicAuction/AuctionLogic.ts";

export const statusFilter: SelectsOption[] = [1, 2, 3, 4, 5].map(
    (status: number) => ({
        element: AuctionLogic.getTextStatus(status),
        value: status,
    }),
);
