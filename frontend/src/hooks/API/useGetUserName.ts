import { useEffect, useState } from 'react';
import ProfileService from '../../API/service/ProfileService.ts';
import { AxiosError } from 'axios';

const useGetUserName = (userId: string) => {
    const [userName, setUserName] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setError] = useState<AxiosError | null>(null);
    useEffect((): void => {
        if (!userId) {
            return;
        }
        const getUserName = async (): Promise<void> => {
            setLoading((): boolean => true);
            try {
                const { data } = await ProfileService.getUserName(userId);
                setUserName((): string => data.userName);
            } catch (errRes) {
                if (errRes instanceof AxiosError) {
                    setError((): AxiosError => errRes as AxiosError);
                }
            } finally {
                setLoading((): boolean => false);
            }
        };
        getUserName();
    }, [userId]);
    return { userName, loading, err };
};

export default useGetUserName;
