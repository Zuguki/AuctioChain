interface IPostLot {
    auctionId: string;
    name: string;
    description: string;
    initialPrice: number;
    betStep: number;
    image: string | null;
}

export type IPutLot = Omit<IPostLot, "auctionId" | "image"> & {
    lotId: string;
    image: string;
};

export const reformatLot = <
    T extends {
        initialPrice: string | number;
        betStep: string | number;
    },
>(
    dataUser: T,
    image: string,
): T => {
    const { initialPrice, betStep } = dataUser;
    return {
        ...dataUser,
        initialPrice: +initialPrice,
        betStep: +betStep,
        image,
    };
};

/*const dataPostUser: IPutLot = {
    ...dataUser,
    initialPrice: +initialPrice,
    betStep: +betStep,
    image,
};

const dataPostUser: IPostLot = {
    ...dataUser,
    auctionId: id as string,
    initialPrice: +initialPrice,
    betStep: +betStep,
    image,
};*/
export default IPostLot;
