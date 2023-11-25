import React, { FC, useContext } from 'react';
import logo from '../../design/logo.png';
import styleHeader from './header.module.css';
import { NavLink } from 'react-router-dom';
import './Link.css';
import { Context } from '../../context/contextApp.ts';
import { observer } from 'mobx-react-lite';

const Header: FC = observer(() => {
    const { userStore } = useContext(Context);
    return (
        <header className={styleHeader.header}>
            <div>
                <p>{userStore.getUser().name}</p>
            </div>
            {/*<ul className={styleHeader.ulHeader}>
                <li id='1'><NavLink className={styleHeader.link} to='/authorization/registration'>Условия соглашения</NavLink></li>
                <li><NavLink className={styleHeader.link} to='/authorization/recovery'>Аукционы</NavLink></li>
                <li>Поиск</li>
                <li>Вход/Регистрация</li>
            </ul>
            <div className={styleHeader.positionLogo}>
                <img src={logo} alt='logo'/>
            </div>*/}
        </header>
    );
});

export default Header;
