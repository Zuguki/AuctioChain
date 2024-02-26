import { AxiosResponse } from "axios";
import ILogicPagination from "./ILogicPagination.ts";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetPaginationAPI = <Res>(
    response: () => Promise<AxiosResponse<Res>>,
    queryKey: unknown[],
    baseData: Res,
) => {
    /*const [data, setData] = useState<T>(baseData);
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setError] = useState<AxiosError | null>(null);*/
    const [pagination, setPagination] = useState<ILogicPagination | null>(null);
    const { data, isLoading, error } = useQuery({
        queryKey,
        queryFn: async () => await response(),
        placeholderData: keepPreviousData,
        retry: 3,
        staleTime: 1000,
    });

    useEffect(() => {
        if (data != null) {
            const { headers } = data;
            headers && setPagination(() => JSON.parse(headers["x-pagination"]));
        }
    }, [data]);

    /* useEffect((): void => {
         setLoading((): boolean => true);
         response()
             .then((res: AxiosResponse): void => {
                 const { data, headers } = res;
                 setData((): T => data);
                 setPagination(() => JSON.parse(headers["x-pagination"]));
             })
             .catch((resError: unknown): void => {
                 if (resError instanceof AxiosError) {
                     setError((): AxiosError => resError);
                 }
             })
             .finally((): void => setLoading((): boolean => false));
     }, [currentPage, ...depends]);*/

    return { data: data?.data ?? baseData, isLoading, error, pagination };
};

export default useGetPaginationAPI;
