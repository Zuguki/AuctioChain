import SelectsOption from "./ISelectsOption.ts";
import { ChangeEvent, Dispatch, SetStateAction, useMemo } from "react";
import changeSelect from "./changeSelect.ts";

const useSortAuctions = <T>(setParamsFilter: Dispatch<SetStateAction<T>>) => {
    const statusSort: SelectsOption[] = useMemo(
        () => [
            {
                element: "A–Z",
                value: 0,
            },
            {
                element: "Z–A",
                value: 1,
            },
            {
                element: "Дате начала аукциона",
                value: 2,
            },
            {
                element: "Дате конца аукциона",
                value: 3,
            },
        ],
        [],
    );

    return {
        statusSort,
        changeSort: (e: ChangeEvent<HTMLSelectElement>) =>
            changeSelect(e, setParamsFilter),
    };
};

export default useSortAuctions;
