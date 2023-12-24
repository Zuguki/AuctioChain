import React, { FC, useState } from 'react';
import ElementTableCurrency from './ElementTableCurrency.tsx';
import LogicCurrency from '../../../metamask/LogicCurrency.ts';
import IGetDataCurrency from '../../../hooks/useGetDataCurrency/IGetDataCurrency.ts';
import styleTable from '../addMoney.module.css';
import up from '../../../design/icons/collapse.svg';
import close from '../../../design/icons/collapse close.svg';

const TableCurrency: FC<IGetDataCurrency> = ({ rubEth, Ac }) => {
    const [showTable, setShowTable] = useState<boolean>(false);
    return (
        <div>
            <h3 className={styleTable.mainTextTable}>Курс валют</h3>
            <button
                className={styleTable.showCurrency}
                onClick={() =>
                    setShowTable((prevState: boolean): boolean => !prevState)
                }
            >
                <img src={showTable ? close : up} alt="show-close" />
            </button>
            {showTable && (
                <>
                    <p className={styleTable.textUpdate}>
                        Обновление раз в 10 секунд.
                    </p>
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
                            value: 1 / rubEth,
                        }}
                        secondCurrency={{
                            name: LogicCurrency.Ac,
                            value: Ac / rubEth,
                        }}
                    />
                    <ElementTableCurrency
                        mainCurrency={{ name: LogicCurrency.Ac, value: 1 }}
                        firstCurrency={{
                            name: LogicCurrency.Rub,
                            value: rubEth / Ac,
                        }}
                        secondCurrency={{
                            name: LogicCurrency.Eth,
                            value: 1 / Ac,
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default TableCurrency;
