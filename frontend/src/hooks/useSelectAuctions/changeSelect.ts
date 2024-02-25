import { ChangeEvent, Dispatch, SetStateAction } from "react";

const changeSelect = <T>(
    e: ChangeEvent<HTMLSelectElement>,
    setParamsFilter: Dispatch<SetStateAction<T>>,
): void => {
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

export default changeSelect;
