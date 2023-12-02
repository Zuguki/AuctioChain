import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../../context/context.ts';
import styleLink from '../../UI/CustomLink/customLink.module.css';
import { observer } from 'mobx-react-lite';

const LinkSearch = observer(() => {
    const { stateApp } = useContext(Context);
    const location = useLocation();
    const isSearch = stateApp.getSearch();
    const clickLink = (): void => {
        if (location.pathname !== '/auctions') {
            stateApp.setSearch(true);
            return;
        }
        stateApp.setSearch(!isSearch);
    };
    return (
        <Link
            className={`${styleLink.link} ${
                isSearch &&
                location.pathname === '/auctions' &&
                styleLink.active
            }`}
            to="/auctions"
            onClick={clickLink}
        >
            Поиск
        </Link>
    );
});

export default LinkSearch;
