import { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetAPI = <Res>(
    response: () => Promise<AxiosResponse<Res>>,
    queryKey: unknown[],
    baseData: Res = {} as Res,
) => {
    const { data, isSuccess, isLoading, error, ...props } = useQuery({
        queryKey,
        queryFn: () => response(),
        retry: 3,
        staleTime: 1000,
    });

    return {
        data: data?.data ?? baseData,
        isLoading,
        isSuccess,
        error,
        headers: data?.headers,
        ...props,
    };
};

export default useGetAPI;
