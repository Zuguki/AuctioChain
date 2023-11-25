import { useCallback, useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

const usePostAPI = () => {
    const [err, setError] = useState<AxiosError | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const blurError = (): void => setError((): null => null);

    const postData = useCallback(
        async (request: Promise<AxiosResponse>): Promise<void> => {
            setLoading((): boolean => true);
            try {
                await request;
            } catch (errRequest) {
                if (errRequest instanceof AxiosError) {
                    setError((): AxiosError => errRequest);
                }
            } finally {
                setLoading((): boolean => false);
            }
        },
        [],
    );

    return { err, loading, blurError, postData };
};

export default usePostAPI;
