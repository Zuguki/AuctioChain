import React, { useContext } from "react";
import styleAddMoney from "./addMoney.module.css";
import BaseButton from "../../components/UI/BaseButton/BaseButton.tsx";
import MetaMaskLogic from "../../appLogic/metamask/MetaMaskLogic.ts";
import { Context } from "@/context/context.ts";
import { observer } from "mobx-react-lite";
import FormEth from "./formEth/FormEth.tsx";
import fox from "../../design/metamask-fox.jpg";
import PanelInformationBill from "@/pages/moneyManipulation/panelInformationBill/PanelInformationBill.tsx";

const MoneyManipulation = observer(() => {
    const { userStore } = useContext(Context);
    const billUser: string = userStore.bill;

    return (
        <div className={styleAddMoney.position}>
            <div className={styleAddMoney.titleBlock}>
                <h1 className={styleAddMoney.title}>Манипуляции со счётом</h1>
                <img src={fox} className={styleAddMoney.fox} alt="meta-fox" />
            </div>
            <div className={styleAddMoney.positionAddWallet}>
                <BaseButton onClick={MetaMaskLogic.handleClickMetamask}>
                    {billUser ? "Обновить кошлёк" : "Подключение кошелька"}
                </BaseButton>
            </div>
            {billUser && (
                <div className={styleAddMoney.panels}>
                    <PanelInformationBill bill={billUser} />
                    <FormEth />
                </div>
            )}
        </div>
    );
});

export default MoneyManipulation;
