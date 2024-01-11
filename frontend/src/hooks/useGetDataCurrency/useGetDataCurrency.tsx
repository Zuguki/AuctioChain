import { useEffect, useState } from 'react';
import axios from 'axios';
import IGetDataCurrency from './IGetDataCurrency.ts';

const API_KEY: string =
    '71972f41cf2f210b2a882f5304801376948d23906c885bdc32ab256fa40ec4b2';
const URL_GET_CURRENCY: string = 'https://min-api.cryptocompare.com/data/';

const useGetDataCurrency = (): IGetDataCurrency => {
    const [rubEth, setRubEth] = useState<number>(0);
    const getCurrently = async () => {
        const { data } = await axios.get(
            `${URL_GET_CURRENCY}price?fsym=ETH&tsyms=RUB&api_key=${API_KEY}`,
        );
        setRubEth((): number => data['RUB']);
    };

    useEffect(() => {
        let timer: NodeJS.Timer;
        getCurrently();
        (async () => {
            timer = setInterval(async () => getCurrently(), 10_000);
        })();
        return () => clearTimeout(timer);
    }, []);

    return { rubEth };
};

export default useGetDataCurrency;
