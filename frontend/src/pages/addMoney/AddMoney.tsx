import React, { ChangeEvent, useContext } from 'react';
import styleAddMoney from './addMoney.module.css';
import useGetDataCurrency from '../../hooks/useGetDataCurrency/useGetDataCurrency.tsx';
import FormInput from '../../components/UI/inputs/FormInput/FormInput.tsx';
import { numberChars } from '../../auxiliaryTools/bloclnvalidChar.ts';
import useDataUser from '../../hooks/useDataUser.ts';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import MetaMaskLogic from '../../metamask/MetaMaskLogic.ts';
import { Context } from '../../context/context.ts';
import LogicCurrency from '../../metamask/LogicCurrency.ts';
import { observer } from 'mobx-react-lite';
import Cookies from 'js-cookie';
import CookiesLogic from '../../auxiliaryTools/tokenLogic/cookiesLogic.ts';

const AddMoney = observer(() => {
    /*  const {
          data: { balanceUser },
      } = useGetAPI(
          () => ProfileService.getBalanceUser(),
          {} as IResponseBalance,
      );*/
    const { userStore, stateApp } = useContext(Context);

    const {
        dataUser: { eph },
        logicFormValue,
    } = useDataUser<{ eph: string }>();

    const { rubEth, Ac } = useGetDataCurrency();
    return (
        <div className={styleAddMoney.position}>
            <h1>Пополнение счёта</h1>
            <h5>На вашем счёте: {0} Ac</h5>
            <FormInput
                title={`Количество (${LogicCurrency.Eth}) на пополнение:`}
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
            {userStore.getBill() && (
                <BaseButton
                    onClick={async () => {
                        stateApp.setProcessAddMoney(true);
                        const bal = await MetaMaskLogic.sendEth(eph);
                        stateApp.setProcessAddMoney(false);
                        if (bal) {
                            Cookies.set(CookiesLogic.ADD_BALANCE, String(bal));
                        }
                    }}
                >
                    Пополнить
                </BaseButton>
            )}
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
            {Cookies.get(CookiesLogic.ADD_BALANCE) !== undefined && (
                <h2>
                    Баланс:{' '}
                    {(+Cookies.get(CookiesLogic.ADD_BALANCE) * Ac).toString()}
                </h2>
            )}
        </div>
    );
});

export default AddMoney;
