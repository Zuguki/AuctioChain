import React, { FC } from 'react';
import styleElTable from '../addMoney.module.css';

type ObjectTableCurrency = {
    name: string;
    value: number;
};

interface ITableCurrency {
    mainCurrency: ObjectTableCurrency;
    firstCurrency: ObjectTableCurrency;
    secondCurrency: ObjectTableCurrency;
}

const ElementTableCurrency: FC<ITableCurrency> = ({
    mainCurrency,
    firstCurrency,
    secondCurrency,
}) => {
    return (
        <div className={styleElTable.positionElTable}>
            <h4>
                {mainCurrency.value} {mainCurrency.name}:
            </h4>
            <p>
                {firstCurrency.name}: {firstCurrency.value}
            </p>
            <p>
                {secondCurrency.name}: {secondCurrency.value}
            </p>
        </div>
    );
};

export default ElementTableCurrency;
