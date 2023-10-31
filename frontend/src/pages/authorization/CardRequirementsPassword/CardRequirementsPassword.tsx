import {FC, ReactElement} from 'react';
import styleCard from './cardRequirementsPassword.module.css';

const requirementsPassword = {
    lengthPassword: 'Минимум 8 символов',
    haveUpCase:'Наличие верхнего регистра',
    haveNumber: 'Наличие одной цифры'
}

interface ICardCardRequirement {
    show?: boolean
}

const CardRequirementsPassword: FC<ICardCardRequirement> = ({ show = false, isCorrect}) => {
    return (
        <>
        {show && <div className={styleCard.card}>
            <p className={styleCard.title}>Требования к паролю:</p>
            <ol className={styleCard.olRequirement}>
                {Object.entries(requirementsPassword).map(([requirement, valueRequirement]): ReactElement<HTMLLIElement> =>
                    <li key={requirement}
                        className={`${styleCard.requirement} ${isCorrect[requirement] && styleCard.requirementDone}`} >
                        {valueRequirement}
                    </li>)}
            </ol>
        </div>}
        </>
    );
};

export default CardRequirementsPassword;