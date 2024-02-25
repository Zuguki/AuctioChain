import ProfileService from "../../API/service/ProfileService.ts";
import { useQuery } from "@tanstack/react-query";

const useGetUserName = (userId: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["username", userId],
        queryFn: async () => await ProfileService.getUserName(userId),
    });

    const username: string | null = data?.data.userName ?? null;
    return { username, isLoading, error };
    /*const [userName, setUserName] = useState<string | null>(null);
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
    return { userName, loading, err };*/
};

export default useGetUserName;
