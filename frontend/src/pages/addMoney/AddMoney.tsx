import React, { useContext } from 'react';
import styleAddMoney from './addMoney.module.css';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import MetaMaskLogic from '../../metamask/MetaMaskLogic.ts';
import { Context } from '../../context/context.ts';
import { observer } from 'mobx-react-lite';
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
    return (
        <div className={styleAddMoney.position}>
            <div>
                <h1 className={styleAddMoney.title}>Пополнение счёта</h1>
                <img src={fox} className={styleAddMoney.fox} />
            </div>
            <h4 className={styleAddMoney.balance}>На вашем счёте: {0} Ac</h4>
            {billUser && <FormSendEth />}
            {billUser && (
                <>
                    <h2 className={styleAddMoney.textTitle}>Кошлёк:</h2>
                    <p className={styleAddMoney.bill}>{billUser}</p>
                </>
            )}
            <div className={`${!billUser && styleAddMoney.positionAddWallet}`}>
                <BaseButton onClick={MetaMaskLogic.handleClickMetamask}>
                    {billUser ? 'Обновить кошлёк' : 'Подключение кошелька'}
                </BaseButton>
            </div>
        </div>
    );
});

export default AddMoney;
