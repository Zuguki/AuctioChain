import FormInput from '../../components/UI/inputs/FormInput/FormInput.tsx';
import FormTextArea from '../../components/UI/inputs/FormTextArea/FormTextArea.tsx';
import DateInput from '../../components/UI/inputs/DataInput/DateInput.tsx';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import styleCreateAuction from './pageCreateAuction.module.css';
import useDataUser from '../../hooks/useDataUser.ts';
import IPostAuction from '../../API/interfaces/IPostAuction.ts';
import DateLogic from '../../auxiliaryTools/dateLogic/DateLogic.ts';
import AuctionService from '../../API/service/AuctionService.ts';
import usePostAPI from '../../API/hooks/usePostAPI.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import LogicFormProcessing from '../../components/LogicFormProcessing/LogicFormProcessing.tsx';

const PageCreateAuction = () => {
    const { dataUser, logicFormValue } = useDataUser<IPostAuction>();
    const { err, loading, blurError, postData } = usePostAPI();

    const postAuction = async (): Promise<void> => {
        blurError();
        const dataPostUser: IPostAuction = {
            ...dataUser,
            dateStart: DateLogic.getDateNowISO(),
            dateEnd: DateLogic.getDateByStringISO(dataUser?.dateEnd || '0'),
        };

        await postData(AuctionService.addAuction(dataPostUser));
    };
    return (
        <form
            onSubmit={e => e.preventDefault()}
            className={styleCreateAuction.position}
        >
            <div>
                <h1>Создание аукциона</h1>
                <LogicFormProcessing loading={loading} err={err} />
                <FormInput
                    title="Название аукциона"
                    name="name"
                    error={err}
                    changeValue={logicFormValue}
                    blurError={blurError}
                />
                <FormTextArea
                    title="Описание аукциона"
                    name="description"
                    error={err}
                    blurError={blurError}
                    changeValue={logicFormValue}
                />
                <DateInput
                    title="Дата окончания"
                    name="dateEnd"
                    error={err}
                    changeValue={logicFormValue}
                    blurError={blurError}
                />
                <div className={styleCreateAuction.positionButton}>
                    <BaseButton
                        disabled={loading}
                        type="submit"
                        onClick={postAuction}
                    >
                        Создать аукцион
                    </BaseButton>
                </div>
            </div>
        </form>
    );
};

export default PageCreateAuction;
