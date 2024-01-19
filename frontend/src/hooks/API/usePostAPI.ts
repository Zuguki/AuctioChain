import { useCallback, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

const usePostAPI = () => {
    const [error, setError] = useState<AxiosError | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const blurError = useCallback((): void => setError((): null => null), []);

    const postData = useCallback(
        async <T>(
            request: () => Promise<AxiosResponse<T>>,
        ): Promise<AxiosResponse<T> | undefined> => {
            setLoading((): boolean => true);
            try {
                return await request();
            } catch (err: unknown) {
                if (err instanceof AxiosError) {
                    setError(() => err as AxiosError);
                }
            } finally {
                setLoading((): boolean => false);
            }
        },
        [],
    );

    return { error, loading, blurError, postData };
};

export default usePostAPI;
