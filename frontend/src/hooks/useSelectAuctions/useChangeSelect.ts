import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";

const useChangeSelect = <T>(setParamsFilter: Dispatch<SetStateAction<T>>) => {
    const [, setSearchParams] = useSearchParams();
    const changeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value, name } = e.target;

        const filter: number | null = Number.parseInt(value) || null;

        setParamsFilter(
            (prevDataUser: T): T => ({
                ...prevDataUser,
                [name]: filter,
            }),
        );

        setSearchParams((prevParams) => {
            if (filter == null) {
                prevParams.delete(name);
                return prevParams;
            }

            return new URLSearchParams({
                ...Object.fromEntries(prevParams.entries()),
                [name]: String(filter),
            });
        });
    };

    return { changeSelect };
};

export default useChangeSelect;
