import IResponseAuction from "./response/IResponseAuctions.ts";

type IAuction = Omit<IResponseAuction, "lotsCount">;

export default IAuction;
