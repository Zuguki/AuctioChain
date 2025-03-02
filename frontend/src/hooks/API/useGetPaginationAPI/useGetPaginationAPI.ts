import { AxiosResponse } from "axios";
import ILogicPagination from "./ILogicPagination.ts";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetPaginationAPI = <Res>(
    response: () => Promise<AxiosResponse<Res>>,
    queryKey: unknown[],
    baseData: Res,
) => {
    const [pagination, setPagination] = useState<ILogicPagination | null>(null);
    const { data, isLoading, error } = useQuery({
        queryKey,
        queryFn: async () => await response(),
        placeholderData: keepPreviousData,
        retry: 3,
    });

    useEffect(() => {
        if (data != null) {
            const { headers } = data;
            headers && setPagination(() => JSON.parse(headers["x-pagination"]));
        }
    }, [data]);

    return { data: data?.data ?? baseData, isLoading, error, pagination };
};

export default useGetPaginationAPI;
