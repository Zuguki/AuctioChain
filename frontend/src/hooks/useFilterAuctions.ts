import { ChangeEvent, Dispatch, SetStateAction, useMemo } from 'react';
import AuctionLogic from '../logicAuction/AuctionLogic.ts';

const useFilterAuctions = <T>(setParamsFilter: Dispatch<SetStateAction<T>>) => {
    const statusFilter = useMemo(
        () =>
            [1, 2, 3, 4, 5].map((status: number) => ({
                element: AuctionLogic.getTextStatus(status),
                value: status,
            })),
        [],
    );
    const changeFilter = (e: ChangeEvent<HTMLSelectElement>): void => {
        const { value, name } = e.target;
        let filter: number | null = +value;
        if (Number.isNaN(filter)) {
            filter = null;
        }
        setParamsFilter(
            (prevDataUser: T): T => ({
                ...prevDataUser,
                [name]: filter,
            }),
        );
    };
    return { statusFilter, changeFilter };
};

export default useFilterAuctions;
