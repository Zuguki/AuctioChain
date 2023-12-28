import React, { FC } from 'react';
import ElementTableCurrency from './ElementTableCurrency.tsx';
import LogicCurrency from '../../metamask/LogicCurrency.ts';
import styleTable from './currencyRate.module.css';
import useGetDataCurrency from '../../hooks/useGetDataCurrency/useGetDataCurrency.tsx';

const isNaN = (value: number): number => (Number.isNaN(value) ? 0 : value);

const CurrencyRate: FC = () => {
    const { rubEth, Ac } = useGetDataCurrency();
    return (
        <div className={styleTable.position}>
            <h1 className={styleTable.mainTextTable}>Курс валют</h1>
            <p className={styleTable.textUpdate}>Обновление раз в 10 секунд.</p>
            <ElementTableCurrency
                mainCurrency={{ name: LogicCurrency.Eth, value: 1 }}
                firstCurrency={{
                    name: LogicCurrency.Rub,
                    value: rubEth,
                }}
                secondCurrency={{ name: LogicCurrency.Ac, value: Ac }}
            />
            <ElementTableCurrency
                mainCurrency={{ name: LogicCurrency.Rub, value: 1 }}
                firstCurrency={{
                    name: LogicCurrency.Eth,
                    value: isNaN(1 / rubEth),
                }}
                secondCurrency={{
                    name: LogicCurrency.Ac,
                    value: isNaN(Ac / rubEth),
                }}
            />
            <ElementTableCurrency
                mainCurrency={{ name: LogicCurrency.Ac, value: 1 }}
                firstCurrency={{
                    name: LogicCurrency.Rub,
                    value: isNaN(rubEth / Ac),
                }}
                secondCurrency={{
                    name: LogicCurrency.Eth,
                    value: isNaN(1 / Ac),
                }}
            />
        </div>
    );
};

export default CurrencyRate;
