import { IResponseCreateAuction } from "./response/IResponseAuctions.ts";
import DateLogic from "../../auxiliaryTools/dateLogic/DateLogic.ts";

interface IPostAuction {
    name: string;
    description: string;
    image: string;
    dateStart: string; //2023-11-23T05:34:30.781Z
    dateEnd: string;
}

export interface IPutAuction extends IPostAuction, IResponseCreateAuction {}

const { getDateByStringISO } = DateLogic;
export const reformatAuction = <
    T extends {
        dateStart: string;
        dateEnd: string;
    },
>(
    dataUser: T,
    image: string,
): T => {
    const { dateStart, dateEnd } = dataUser;
    return {
        ...dataUser,
        image,
        dateStart: getDateByStringISO(dateStart),
        dateEnd: getDateByStringISO(dateEnd),
    };
};
export default IPostAuction;
