import React, { ChangeEvent, useContext } from 'react';
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
import { Context } from '../../context/context.ts';
import { roundNumber } from '../../auxiliaryTools/mathOperations.ts';
import { observer } from 'mobx-react-lite';

const Ac: number = LogicCurrency.ValueAc;
const FormSendEth = observer(() => {
    const { rubEth } = useGetDataCurrency();
    const {
        dataUser: { eph },
        logicFormValue,
    } = useDataUser<{ eph: string }>();

    const { stateApp } = useContext(Context);
    const submitEth = async (): Promise<void> => {
        if (Number.isNaN(+eph) || +eph <= 0) {
            alert('Некорректное значение!');
        }

        const addBalance = await MetaMaskLogic.sendEth(eph);

        LocalStorageLogic.setToStorage(
            LocalStorageLogic.PROCESS_ADD_MONEY,
            false,
        );

        stateApp.setNotification(false);

        if (addBalance) {
            LocalStorageLogic.setToStorage(
                LocalStorageLogic.ADD_BALANCE,
                addBalance,
            );
        }
    };

    return (
        <Form onSubmit={submitEth} className={styleFormEth.positionFormEth}>
            <h2 className={styleFormEth.textTitle}>Пополнение:</h2>
            <FormInput
                title={`Количество (${LogicCurrency.Eth}) на пополнение:`}
                name="eph"
                type="number"
                min={0.000001}
                step={0.000001}
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
                        {LogicCurrency.Rub}: {roundNumber(+eph * rubEth)}
                    </p>
                    <p className={styleFormEth.currency}>
                        {LogicCurrency.Ac}: {roundNumber(+eph * Ac)}
                    </p>
                </div>
            )}
            <BaseButton type="submit" disabled={stateApp.getNotification()}>
                Пополнить
            </BaseButton>
        </Form>
    );
});
export default FormSendEth;
