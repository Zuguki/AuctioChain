import React, { FC } from "react";
import styles from "./panelInformationBill.module.scss";
import useGetDataCurrency from "@/hooks/useGetDataCurrency/useGetDataCurrency.tsx";
import useGetAPI from "@/hooks/API/useGetAPI.ts";
import BalanceService from "@/API/service/BalanceService.ts";
import Spinner from "@/components/UI/Spinner/Spinner.tsx";
import LogicCurrency from "@/appLogic/metamask/LogicCurrency.ts";
import { roundNumber } from "@/auxiliaryTools/mathOperations.ts";

interface IPanelInformationBill {
    bill: string;
}

const PanelInformationBill: FC<IPanelInformationBill> = ({ bill }) => {
    const { rubEth, isLoading } = useGetDataCurrency();
    const {
        data: { balance },
        isLoading: isLoadingBalance,
    } = useGetAPI(() => BalanceService.getBalanceUser(), ["balance"]);
    const isLoadingInfoBalance: boolean = !isLoading && !isLoadingBalance;

    return (
        <div className={styles.background}>
            <div className={styles.positionBlock}>
                <h2 className={styles.title}>Баланс:</h2>
                {isLoadingInfoBalance ? (
                    <p className={styles.balance}>
                        {balance} {LogicCurrency.Ac}
                        <span className={styles.balanceRub}>
                            &nbsp;≈&nbsp;
                            {roundNumber(
                                (balance * rubEth) / LogicCurrency.ValueAc,
                            ).toFixed(2)}
                            &nbsp;{LogicCurrency.Rub}
                        </span>
                    </p>
                ) : (
                    <Spinner style={{ margin: 0 }} form={true} />
                )}
            </div>
            <div className={styles.positionBlock}>
                <h2 className={styles.title}>Кошлёк:</h2>
                <p className={styles.text}>{bill}</p>
            </div>
        </div>
    );
};

export default PanelInformationBill;
