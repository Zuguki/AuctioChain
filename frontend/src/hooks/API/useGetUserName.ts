import ProfileService from "../../API/service/ProfileService.ts";
import { useQuery } from "@tanstack/react-query";

const useGetUserName = (userId: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["username", userId],
        queryFn: async () => await ProfileService.getUserName(userId),
    });

    const username: string | null = data?.data.userName ?? null;
    return { username, isLoading, error };
};

export default useGetUserName;
