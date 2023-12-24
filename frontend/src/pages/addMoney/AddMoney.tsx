import React, { ChangeEvent, useContext, useState } from 'react';
import styleAddMoney from './addMoney.module.css';
import useGetDataCurrency from '../../hooks/useGetDataCurrency/useGetDataCurrency.tsx';
import FormInput from '../../components/UI/inputs/FormInput/FormInput.tsx';
import { numberChars } from '../../auxiliaryTools/bloclnvalidChar.ts';
import useDataUser from '../../hooks/useDataUser.ts';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import MetaMaskLogic from '../../metamask/MetaMaskLogic.ts';
import { Context } from '../../context/context.ts';
import LogicCurrency from '../../metamask/LogicCurrency.ts';
import TableCurrency from './TableCurrency/TableCurrency.tsx';
import { observer } from 'mobx-react-lite';

const AddMoney = observer(() => {
    /*  const {
          data: { balanceUser },
      } = useGetAPI(
          () => ProfileService.getBalanceUser(),
          {} as IResponseBalance,
      );*/
    const { userStore } = useContext(Context);

    const {
        dataUser: { eph },
        logicFormValue,
    } = useDataUser<{ eph: string }>();

    const [balance, setBalance] = useState<number>(0);
    const { rubEth, Ac } = useGetDataCurrency();
    return (
        <div className={styleAddMoney.position}>
            <h1>Пополнение счёта</h1>
            <h5>На вашем счёте: {0} Ac</h5>
            <TableCurrency rubEth={rubEth} Ac={Ac} />
            <FormInput
                title="Введите количество денег(ETH)"
                name="eph"
                type="number"
                min="0.00000001"
                blockChars={numberChars}
                error={null}
                changeValue={(e: ChangeEvent<HTMLInputElement>) => {
                    logicFormValue(e);
                }}
                errorBlur={() => ({})}
            />
            <BaseButton
                onClick={async () => {
                    const bal = await MetaMaskLogic.sendEth(eph);
                    setBalance(() => bal);
                }}
            >
                Пополнить
            </BaseButton>
            {eph && (
                <>
                    <p>
                        {LogicCurrency.Rub}: {+eph * rubEth}
                    </p>
                    <p>
                        {LogicCurrency.Ac}: {+eph * Ac}
                    </p>
                </>
            )}
            <BaseButton onClick={MetaMaskLogic.handleClickMetamask}>
                Подключение кошелька
            </BaseButton>
            <div>
                <p>Now wallet:</p>
                <p>{userStore.getBill()}</p>
            </div>
            {!!balance && <h2>Баланс: {(balance * Ac).toString()}</h2>}
        </div>
    );
});

export default AddMoney;
