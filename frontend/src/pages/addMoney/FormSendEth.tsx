import React, { ChangeEvent } from 'react';
import FormInput from '../../components/UI/inputs/FormInput/FormInput.tsx';
import LogicCurrency from '../../metamask/LogicCurrency.ts';
import { numberChars } from '../../auxiliaryTools/bloclnvalidChar.ts';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import LocalStorageLogic from '../../auxiliaryTools/localStorageLogic/LocalStorageLogic.ts';
import MetaMaskLogic from '../../metamask/MetaMaskLogic.ts';
import useGetDataCurrency from '../../hooks/useGetDataCurrency/useGetDataCurrency.tsx';
import useDataUser from '../../hooks/useDataUser.ts';
import { Form } from 'react-router-dom';
import styleFormEth from './addMoney.module.css';

const FormSendEth = () => {
    const { rubEth, Ac } = useGetDataCurrency();
    const {
        dataUser: { eph },
        logicFormValue,
    } = useDataUser<{ eph: string }>();
    const submitEth = async (): Promise<void> => {
        if (Number.isNaN(+eph) || +eph <= 0) {
            alert('Некорректное значение!');
        }

        LocalStorageLogic.setToStorage(
            LocalStorageLogic.PROCESS_ADD_MONEY,
            true,
        );

        const bal = await MetaMaskLogic.sendEth(eph);

        LocalStorageLogic.setToStorage(
            LocalStorageLogic.PROCESS_ADD_MONEY,
            false,
        );

        if (bal) {
            LocalStorageLogic.setToStorage(LocalStorageLogic.ADD_BALANCE, bal);
        }
    };

    return (
        <Form onSubmit={submitEth} className={styleFormEth.positionFormEth}>
            <h2 className={styleFormEth.textTitle}>Пополнение:</h2>
            <p className={styleFormEth.attention}>
                Внимание! Не выходите из аккаунта не дождавший поплнения счёта!
            </p>
            <FormInput
                title={`Количество (${LogicCurrency.Eth}) на пополнение:`}
                name="eph"
                blockChars={numberChars}
                error={null}
                changeValue={(e: ChangeEvent<HTMLInputElement>): void =>
                    logicFormValue(e)
                }
                errorBlur={() => ({})}
            />
            {eph && !Number.isNaN(+eph) && (
                <div>
                    <p className={styleFormEth.currency}>
                        {LogicCurrency.Rub}: {+eph * rubEth}
                    </p>
                    <p className={styleFormEth.currency}>
                        {LogicCurrency.Ac}: {+eph * Ac}
                    </p>
                </div>
            )}
            <BaseButton type="submit">Пополнить</BaseButton>
        </Form>
    );
};
export default FormSendEth;
