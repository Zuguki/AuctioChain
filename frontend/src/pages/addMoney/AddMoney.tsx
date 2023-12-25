import React, { useContext } from 'react';
import styleAddMoney from './addMoney.module.css';
import useGetDataCurrency from '../../hooks/useGetDataCurrency/useGetDataCurrency.tsx';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import MetaMaskLogic from '../../metamask/MetaMaskLogic.ts';
import { Context } from '../../context/context.ts';
import { observer } from 'mobx-react-lite';
import LocalStorageLogic from '../../auxiliaryTools/localStorageLogic/LocalStorageLogic.ts';
import FormSendEth from './FormSendEth.tsx';
import fox from '../../design/metamask-fox.jpg';

const AddMoney = observer(() => {
    /*  const {
          data: { balanceUser },
      } = useGetAPI(
          () => ProfileService.getBalanceUser(),
          {} as IResponseBalance,
      );*/
    const { userStore } = useContext(Context);
    const billUser: string = userStore.getBill();
    const { Ac } = useGetDataCurrency();
    return (
        <div className={styleAddMoney.position}>
            <div>
                <h1 className={styleAddMoney.title}>Пополнение счёта</h1>
                <img src={fox} className={styleAddMoney.fox} />
            </div>
            <h5>На вашем счёте: {0} Ac</h5>
            {billUser && <FormSendEth />}
            <div>
                {billUser && (
                    <>
                        <p>Кошлёк:</p>
                        <p>{billUser}</p>
                    </>
                )}
                <div
                    className={`${
                        !billUser && styleAddMoney.positionAddWallet
                    }`}
                >
                    <BaseButton onClick={MetaMaskLogic.handleClickMetamask}>
                        {billUser ? 'Обновить кошлёк' : 'Подключение кошелька'}
                    </BaseButton>
                </div>
            </div>
            {LocalStorageLogic.getToStorage(LocalStorageLogic.ADD_BALANCE) && (
                <h2>
                    Баланс:{' '}
                    {(
                        LocalStorageLogic.getToStorage(
                            LocalStorageLogic.ADD_BALANCE,
                        ) * Ac
                    ).toString()}
                </h2>
            )}
        </div>
    );
});

export default AddMoney;
