import { useEffect, useState } from "react";
import axios from "axios";
import IGetDataCurrency from "./IGetDataCurrency.ts";

const { VITE_API_KEY_CURRENCY, VITE_API_URL_CURRENCY } = import.meta.env;

const API_KEY: string = VITE_API_KEY_CURRENCY;
const URL_CURRENCY: string = VITE_API_URL_CURRENCY;

const useGetDataCurrency = (): IGetDataCurrency => {
    const [rubEth, setRubEth] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const getCurrently = async () => {
        setIsLoading(() => true);
        const { data } = await axios.get(
            `${URL_CURRENCY}price?fsym=ETH&tsyms=RUB&api_key=${API_KEY}`,
        );
        setRubEth((): number => data["RUB"]);
        setIsLoading(() => false);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        getCurrently();
        (async () => {
            timer = setInterval(async () => getCurrently(), 10_000);
        })();
        return () => clearInterval(timer);
    }, []);

    return { rubEth, isLoading };
};

export default useGetDataCurrency;
