import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

const useGetAPI = <T>(response: () => Promise<AxiosResponse>, baseData: T) => {
    const [data, setData] = useState<T>(baseData);
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setError] = useState<AxiosError | null>(null);

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
    }, []);

    return { data, loading, err };
};

export default useGetAPI;
