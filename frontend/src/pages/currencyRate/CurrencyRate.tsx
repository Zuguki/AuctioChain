import React, { FC } from 'react';
import ElementTableCurrency from './ElementTableCurrency.tsx';
import LogicCurrency from '../../metamask/LogicCurrency.ts';
import styleTable from './currencyRate.module.css';
import useGetDataCurrency from '../../hooks/useGetDataCurrency/useGetDataCurrency.tsx';
import { isNaN, roundNumber } from '../../auxiliaryTools/mathOperations.ts';

const Ac = LogicCurrency.ValueAc;
const CurrencyRate: FC = () => {
    const { rubEth } = useGetDataCurrency();
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
                    value: roundNumber(isNaN(1 / rubEth), 10),
                }}
                secondCurrency={{
                    name: LogicCurrency.Ac,
                    value: roundNumber(isNaN(Ac / rubEth), 6),
                }}
            />
            <ElementTableCurrency
                mainCurrency={{ name: LogicCurrency.Ac, value: 1 }}
                firstCurrency={{
                    name: LogicCurrency.Rub,
                    value: roundNumber(isNaN(rubEth / Ac)),
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
