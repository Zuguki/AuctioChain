import { ChangeEvent, useContext, useState } from "react";
import FormInput from "../../../components/UI/inputs/FormInput/FormInput.tsx";
import LogicCurrency from "../../../appLogic/metamask/LogicCurrency.ts";
import { numberChars } from "@/auxiliaryTools/blockInvalidChar.ts";
import BaseButton from "../../../components/UI/BaseButton/BaseButton.tsx";
import LocalStorageLogic from "../../../appLogic/localStorageLogic/LocalStorageLogic.ts";
import MetaMaskLogic from "../../../appLogic/metamask/MetaMaskLogic.ts";
import useGetDataCurrency from "../../../hooks/useGetDataCurrency/useGetDataCurrency.tsx";
import useDataUser from "../../../hooks/useDataUser.ts";
import { Form } from "react-router-dom";
import styles from "./formEth.module.scss";
import { Context } from "@/context/context.ts";
import { roundNumber } from "@/auxiliaryTools/mathOperations.ts";
import { observer } from "mobx-react-lite";
import { NotificationAddMoney } from "@/appLogic/notificationLogic/VarietesNotifications.ts";
import { defaultErrorBlur } from "@/components/UI/inputs/IInput.ts";
import stateFormImg from "../../../design/icons/changeStateForm.svg";

const Ac: number = LogicCurrency.ValueAc;
type StateForm = "add" | "takeOf";

const FormEth = observer(() => {
    const { rubEth } = useGetDataCurrency();
    const {
        dataUser: { eph },
        logicFormValue,
    } = useDataUser<{ eph: string }>();

    const { stateApp } = useContext(Context);
    const [stateForm, setStateForm] = useState<StateForm>("add");
    const submitEth = async (): Promise<void> => {
        if (Number.isNaN(+eph) || +eph <= 0) {
            alert("Некорректное значение!");
        }

        switch (stateForm) {
            case "add": {
                const addBalance: number | undefined =
                    await MetaMaskLogic.sendEth(eph);
                LocalStorageLogic.endLoadingTransaction();
                if (addBalance) {
                    stateApp.notification = NotificationAddMoney(addBalance);
                }
                break;
            }
            case "takeOf": {
                alert("недоступно!");
            }
        }
    };

    const changeStateForm = (): void => {
        setStateForm((prevState): StateForm => {
            switch (prevState) {
                case "add":
                    return "takeOf";
                case "takeOf":
                    return "add";
                default:
                    return "add";
            }
        });
    };

    return (
        <Form onSubmit={submitEth} className={styles.positionFormEth}>
            <h2 className={styles.textTitle}>
                {stateForm === "add" ? "Пополнение:" : "Снятие:"}
            </h2>
            <button
                type="button"
                className={styles.buttonChangeForm}
                onClick={changeStateForm}
            >
                <img src={stateFormImg} alt="change-state" />
            </button>
            <FormInput
                title={`Количество (${LogicCurrency.Eth}) на ${stateForm === "add" ? "пополнение:" : "снятие:"}`}
                name="eph"
                type="number"
                min={0.000001}
                step={0.000001}
                blockChars={numberChars}
                error={null}
                changeValue={(e: ChangeEvent<HTMLInputElement>): void =>
                    logicFormValue(e)
                }
                errorBlur={defaultErrorBlur}
            />
            {eph && !Number.isNaN(+eph) && (
                <div>
                    <p className={styles.currency}>
                        {LogicCurrency.Rub}: {roundNumber(+eph * rubEth)}
                    </p>
                    <p className={styles.currency}>
                        {LogicCurrency.Ac}: {roundNumber(+eph * Ac)}
                    </p>
                </div>
            )}
            <BaseButton type="submit" disabled={stateApp.notification !== null}>
                {stateForm === "add" ? "Пополнить" : "Снять"}
            </BaseButton>
        </Form>
    );
});
export default FormEth;
