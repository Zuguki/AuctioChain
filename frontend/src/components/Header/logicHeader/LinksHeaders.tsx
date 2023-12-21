import React, { FC } from 'react';
import CustomLink from '../../UI/CustomLink/CustomLink.tsx';
import { Link } from 'react-router-dom';
import logo from '../../../design/logo.svg';
import LinkUser from './LinkUser.tsx';
import ILinkLogicUser from './ILinkLogicUser.ts';
import LinkSearch from './LinkSearch.tsx';
import PathApp from '../../../routes/pathApp/PathApp.ts';

const LinksHeaders: FC<ILinkLogicUser> = ({ auth, user }) => {
    return (
        <ul>
            <li>
                <CustomLink to={PathApp.auctions}>Аукционы</CustomLink>
            </li>
            <li>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </li>
            <li>
                <LinkSearch />
            </li>
            <li>
                <CustomLink to="/build">Пополнение счета</CustomLink>
            </li>
            <li>
                <LinkUser auth={auth} user={user} />
            </li>
        </ul>
    );
};

export default LinksHeaders;
