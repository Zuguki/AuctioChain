import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react';

const useSearchInput = <T>(
    setParamsFilter: Dispatch<SetStateAction<T>>,
    timeWait: number = 1_000,
) => {
    const [stateSearch, setStateSearch] = useState<string | null>(null);
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
    }, [stateSearch]);

    return { isWrite, changeSearch };
};

export default useSearchInput;
