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
            <FormInput
                title={`Количество (${LogicCurrency.Eth}) на пополнение:`}
                name="eph"
                type="number"
                blockChars={numberChars}
                error={null}
                changeValue={(e: ChangeEvent<HTMLInputElement>): void =>
                    logicFormValue(e)
                }
                errorBlur={() => ({})}
            />
            <BaseButton type="submit">Пополнить</BaseButton>
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
        </Form>
    );
};
export default FormSendEth;
