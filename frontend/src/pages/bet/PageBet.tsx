import React, { FC } from 'react';
import Hr from '../../components/UI/Hr/Hr.tsx';
import FormInput from '../../components/UI/inputs/FormInput/FormInput.tsx';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import styleBet from './pageBet.module.css';
import CloseButton from '../../components/CloseButton/CloseButton.tsx';
import usePostAPI from '../../hooks/API/usePostAPI.ts';
import LotService from '../../API/service/LotService.ts';
import useDataUser from '../../hooks/useDataUser.ts';
import IPostBet from '../../API/interfaces/IPostBet.ts';
import LogicFormProcessing from '../../components/LogicFormProcessing/LogicFormProcessing.tsx';
import { Form } from 'react-router-dom';
import ILot from '../../API/interfaces/ILot.ts';
import { AxiosResponse } from 'axios';
import useGetAPI from '../../hooks/API/useGetAPI.ts';
import ProfileService from '../../API/service/ProfileService.ts';
import IResponseBalance from '../../API/interfaces/response/IResponseBalance.ts';
import LogicDownload from '../../components/LogicDownload/LogicDownload.tsx';

interface IPageBet {
    close: () => void;
    lot: ILot;
    setBet: (res: AxiosResponse) => void;
}

const PageBet: FC<IPageBet> = ({ close, lot, setBet }) => {
    const { id, currentMaxBet, initialPrice, betStep } = lot;
    const { error, blurError, postData } = usePostAPI();
    const { dataUser, logicFormValue } = useDataUser<IPostBet>();
    const {
        data: { balance },
        loading,
    } = useGetAPI(
        () => ProfileService.getBalanceUser(),
        {} as IResponseBalance,
    );
    const submitBet = async (): Promise<void> => {
        blurError();
        dataUser.lotId = id;
        const res = await postData(() => LotService.postBetInLot(dataUser));
        if (res) {
            setBet(res);
        }
    };

    return (
        <div className={styleBet.background}>
            <Form className={styleBet.form} onSubmit={submitBet}>
                <LogicDownload isLoading={loading}>
                    <>
                        <CloseButton logicClick={close} />
                        <h3>Ставка</h3>
                        <LogicFormProcessing loading={loading} err={error} />
                        <p className={styleBet.textBalance}>
                            На вашем счёте: {balance} Ac
                        </p>
                        <p className={styleBet.textInformation}>
                            Цена на данный момент:{' '}
                            {currentMaxBet ? currentMaxBet : initialPrice} Ac
                        </p>
                        <p className={styleBet.textInformation}>
                            Минимальный шаг: {betStep} Ac
                        </p>
                        <Hr width="small" />
                        <FormInput
                            title="Ваша ставка"
                            name="amount"
                            width="small"
                            type="number"
                            error={error}
                            changeValue={logicFormValue}
                            errorBlur={blurError}
                        />
                        <div className={styleBet.positionSubmit}>
                            <BaseButton type="submit">
                                Поставить ставку
                            </BaseButton>
                        </div>
                    </>
                </LogicDownload>
            </Form>
        </div>
    );
};

export default PageBet;
