import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { useSearchParams } from "react-router-dom";

const useSearchInput = <T>(
    setParamsFilter: Dispatch<SetStateAction<T>>,
    nameURLSearch: string = "search",
    timeWait: number = 1_000,
) => {
    const [paramsURL, setParamsURL] = useSearchParams();
    const [stateSearch, setStateSearch] = useState<string>(
        paramsURL.get(nameURLSearch) || "",
    );
    const [isWrite, setIsWrite] = useState<boolean>(false);

    const changeSearch = (e: ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setIsWrite((): boolean => true);
        setStateSearch((): string => value);
    };

    useEffect(() => {
        const timeoutInput: NodeJS.Timeout = setTimeout((): void => {
            setParamsURL((prevParams) => {
                return new URLSearchParams({
                    ...Object.fromEntries(prevParams.entries()),
                    [nameURLSearch]: stateSearch,
                });
            });

            setParamsFilter(
                (prevDataUser: T): T => ({
                    ...prevDataUser,
                    [nameURLSearch]: stateSearch,
                }),
            );
            setIsWrite((): boolean => false);
        }, timeWait);
        return () => clearTimeout(timeoutInput);
    }, [stateSearch]);

    return { stateSearch, changeSearch, isWrite };

    /* const [stateSearch, setStateSearch] = useState<string | null>(search);
    const [isWrite, setIsWrite] = useState<boolean>(false);
    const changeSearch = (e: ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setIsWrite((): boolean => true);
        setStateSearch((): string => value);
    };

    useEffect(() => {
        const timeoutInput: NodeJS.Timeout = setTimeout((): void => {
            setParamsFilter(
                (prevDataUser: T): T => ({
                    ...prevDataUser,
                    search: stateSearch,
                }),
            );
            setIsWrite((): boolean => false);
        }, timeWait);
        return () => clearTimeout(timeoutInput);
    }, [setParamsFilter, stateSearch, timeWait]);

    return { isWrite, changeSearch, stateSearch };*/
};

export default useSearchInput;
