import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";

const useGetAPI = <T>(url: string, baseData: T) => {
    const [data, setData] = useState<T>(baseData);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [err, setErr] = useState<AxiosError<T> | null>(null);
    useEffect(() => {
        setIsLoading(() => true);
        axios.get(url)
            .then((result) => {
            setData(() => result.data);
            })
            .catch((errApi) => setErr(errApi))
            .finally(() => setIsLoading(false))
    }, [url]);

    return {data, isLoading, err};
}

export default useGetAPI;