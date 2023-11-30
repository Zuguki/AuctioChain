import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import IResponseAuction from '../interfaces/IResponseAuctions.ts';

const useGetAPIPagination = <T>(
    response: () => Promise<AxiosResponse>,
    currentPage: number,
    baseData: T,
) => {
    const [data, setData] = useState<T>(baseData);
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setError] = useState<AxiosError | null>(null);
    const [pagination, setPagination] = useState();

    useEffect((): void => {
        setLoading((): boolean => true);
        response()
            .then((res: AxiosResponse): void => {
                const { data, headers } = res;
                setData((): T => data);
                setPagination(() => JSON.parse(headers['x-pagination']));
            })
            .catch((resError: unknown): void => {
                if (resError instanceof AxiosError) {
                    setError((): AxiosError => resError);
                }
            })
            .finally((): void => setLoading((): boolean => false));
    }, [currentPage]);

    return { data, loading, err, pagination };
};

export default useGetAPIPagination;
