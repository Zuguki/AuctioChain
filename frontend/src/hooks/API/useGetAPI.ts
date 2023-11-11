import {useEffect, useState} from "react";
import axios, {AxiosError, AxiosResponse} from "axios";

const useGetAPI = <T>(url: string, baseData: T) => {
    const [data, setData] = useState<T>(baseData);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [err, setErr] = useState<AxiosError | null>(null);
    useEffect((): void => {
        setIsLoading((): boolean => true);
        axios.get(url)
            .then((result: AxiosResponse<T>): void => setData(() => result.data))
            .catch((errApi: AxiosError): void => setErr(errApi))
            .finally((): void => setIsLoading((): boolean => false))
    }, [url]);

    return {data, isLoading, err};
}

export default useGetAPI;