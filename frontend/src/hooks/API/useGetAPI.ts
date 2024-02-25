import { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
/*

const useGetAPI = <T>(
    response: () => Promise<AxiosResponse>,
    baseData: T,
    ...depends: unknown[]
) => {
    const [data, setData] = useState<T>(baseData);
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setError] = useState<AxiosError | null>(null);
    const nav = useNavigate();
    useEffect((): void => {
        setLoading((): boolean => true);
        response()
            .then((res: AxiosResponse): void => {
                setData(() => res.data);
            })
            .catch((resError: unknown): void => {
                if (resError instanceof AxiosError) {
                    setError((): AxiosError => resError);
                }
            })
            .finally((): void => setLoading((): boolean => false));
    }, [...depends]);
    useEffect((): void => {
        if (err?.response?.status === 404) {
            nav("*");
        }
    }, [err]);
    return { data, loading, err };
};
*/

const useGetAPI = <T>(
    response: () => Promise<AxiosResponse<T>>,
    queryKey: unknown[],
    baseData: T = {} as T,
) => {
    const { data, isSuccess, isLoading, error } = useQuery({
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
    };
};

export default useGetAPI;
