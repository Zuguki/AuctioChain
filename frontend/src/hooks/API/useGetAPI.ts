import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

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
            nav('*');
        }
    }, [err]);
    return { data, loading, err };
};

export default useGetAPI;
