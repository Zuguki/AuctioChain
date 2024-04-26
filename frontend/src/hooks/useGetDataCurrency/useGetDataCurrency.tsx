import { useEffect, useState } from "react";
import axios from "axios";
import IGetDataCurrency from "./IGetDataCurrency.ts";

const { API_URL_CURRENCY, API_KEY_CURRENCY } = import.meta.env;

const API_KEY: string =
    API_KEY_CURRENCY ??
    "71972f41cf2f210b2a882f5304801376948d23906c885bdc32ab256fa40ec4b2";
const URL_CURRENCY: string =
    API_URL_CURRENCY ?? "https://min-api.cryptocompare.com/data/";

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
