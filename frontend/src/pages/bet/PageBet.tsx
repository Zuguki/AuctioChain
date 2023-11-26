import React, { FC, FormEvent } from 'react';
import Hr from '../../components/UI/Hr/Hr.tsx';
import FormInput from '../../components/UI/inputs/FormInput/FormInput.tsx';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import styleBet from './pageBet.module.css';
import CloseButton from '../../components/UI/CloseButton/CloseButton.tsx';
import usePostAPI from '../../API/hooks/usePostAPI.ts';
import LotService from '../../API/service/LotService.ts';
import useDataUser from '../../hooks/useDataUser.ts';
import IPostBet from '../../API/interfaces/IPostBet.ts';
import LogicFormProcessing from '../../components/LogicFormProcessing/LogicFormProcessing.tsx';

interface IPageBet {
    close: () => void;
    lotId: string;
}
const PageBet: FC<IPageBet> = ({ close, lotId }) => {
    const { error, loading, blurError, postData } = usePostAPI();
    const { dataUser, logicFormValue } = useDataUser<IPostBet>();

    const submitBet = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        blurError();
        e.preventDefault();
        dataUser.lotId = lotId;
        await postData(() => LotService.postBetInLot(dataUser));
    };

    return (
        <div className={styleBet.background}>
            <form className={styleBet.form} onSubmit={submitBet}>
                <CloseButton logicClick={close} />
                <h3>Ставка</h3>
                <LogicFormProcessing
                    loading={loading}
                    err={error}
                    centerText={false}
                />
                <p className={styleBet.textBalance}>На вашем счёте: {}</p>
                <p className={styleBet.textInformation}>
                    Цена на данный момент: 30 Ac
                </p>
                <p className={styleBet.textInformation}>
                    Минимальный шаг: 1 Ac
                </p>
                <Hr width="small" />
                <FormInput
                    title="Ваша ставка"
                    name="amount"
                    width="small"
                    type="number"
                    error={error}
                    changeValue={logicFormValue}
                    blurError={blurError}
                />
                <BaseButton style={{ marginTop: 30 }} type="submit">
                    Поставить ставку
                </BaseButton>
            </form>
        </div>
    );
};

export default PageBet;
