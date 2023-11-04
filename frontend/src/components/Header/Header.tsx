import React, {FC} from 'react';
import logo from '../../design/logo.png'
import styleHeader from './header.module.css'
import {NavLink} from "react-router-dom";
import './Link.css'
const Header: FC = () => {
    return (
        <header className={styleHeader.header}>
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
};

export default Header;