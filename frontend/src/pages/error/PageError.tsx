import { FC } from 'react';
import errLogo from '../../design/404.png';
import { Link } from 'react-router-dom';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import styleErr from './pageError.module.css';
const PageError: FC = () => {
    return (
        <div className={styleErr.position}>
            <h1>Не найдено ;(</h1>
            <img className={styleErr.positionImg} src={errLogo} alt="error" />
            <p className={styleErr.textInformation}>
                Возникли несостыковки! Перейдите на главную!
            </p>
            <Link to="/">
                <BaseButton>На главную</BaseButton>
            </Link>
        </div>
    );
};

export default PageError;
