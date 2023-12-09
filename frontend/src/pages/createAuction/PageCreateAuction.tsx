import FormInput from '../../components/UI/inputs/FormInput/FormInput.tsx';
import FormTextArea from '../../components/UI/inputs/FormTextArea/FormTextArea.tsx';
import DateInput from '../../components/UI/inputs/DataInput/DateInput.tsx';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import styleCreateAuction from './pageCreateAuction.module.css';
import useDataUser from '../../hooks/useDataUser.ts';
import IPostAuction from '../../API/interfaces/IPostAuction.ts';
import DateLogic from '../../auxiliaryTools/dateLogic/DateLogic.ts';
import AuctionService from '../../API/service/AuctionService.ts';
import usePostAPI from '../../hooks/API/usePostAPI.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import LogicFormProcessing from '../../components/LogicFormProcessing/LogicFormProcessing.tsx';

const PageCreateAuction = () => {
    const { dataUser, logicFormValue } = useDataUser<IPostAuction>();
    const { error, loading, blurError, postData } = usePostAPI();

    const postAuction = async (): Promise<void> => {
        blurError();
        const dataPostUser: IPostAuction = {
            ...dataUser,
            image: '',
            dateStart: DateLogic.getDateNowISO(),
            dateEnd: DateLogic.getDateByStringISO(dataUser?.dateEnd || '0'),
        };

        await postData(() => AuctionService.addAuction(dataPostUser));
    };
    return (
        <form
            onSubmit={e => e.preventDefault()}
            className={styleCreateAuction.position}
        >
            <div>
                <h1>Создание аукциона</h1>
                <LogicFormProcessing loading={loading} err={error} />
                <FormInput
                    title="Название аукциона"
                    name="name"
                    error={error}
                    changeValue={logicFormValue}
                    errorBlur={blurError}
                />
                <FormTextArea
                    title="Описание аукциона"
                    name="description"
                    error={error}
                    blurError={blurError}
                    changeValue={logicFormValue}
                />
                <DateInput
                    title="Дата окончания"
                    name="dateEnd"
                    error={error}
                    changeValue={logicFormValue}
                    errorBlur={blurError}
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
