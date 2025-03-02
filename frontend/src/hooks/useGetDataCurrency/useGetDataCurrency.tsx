import axios from "axios";
import IGetDataCurrency from "./IGetDataCurrency.ts";
import { useQuery } from "@tanstack/react-query";

const { VITE_API_KEY_CURRENCY, VITE_API_URL_CURRENCY } = import.meta.env;

const API_KEY: string = VITE_API_KEY_CURRENCY;
const URL_CURRENCY: string = VITE_API_URL_CURRENCY;

const useGetDataCurrency = (): IGetDataCurrency => {
    const { data: rubEth, isLoading } = useQuery<number>({
        queryFn: async () => {
            const { data } = await axios.get(
                `${URL_CURRENCY}price?fsym=ETH&tsyms=RUB&api_key=${API_KEY}`,
            );
            return data["RUB"];
        },
        queryKey: ["currency"],
        refetchInterval: 10_000,
    });

    return { rubEth: rubEth ? rubEth : 0, isLoading };
};

export default useGetDataCurrency;
