import React, { FC, useContext } from 'react';
import styleHeader from './header.module.css';
import { Context } from '../../context/context.ts';
import { observer } from 'mobx-react-lite';
import IUser from '../../API/interfaces/IUser.ts';
import LinksHeaders from './logicHeader/LinksHeaders.tsx';

const Header: FC = observer(() => {
    const { userStore } = useContext(Context);
    const auth: boolean = userStore.getAuth();
    const user: IUser = userStore.getUser();
    return (
        <header className={styleHeader.header}>
            <ul className={styleHeader.position}>
                <LinksHeaders auth={auth} user={user} />
            </ul>
        </header>
    );
});

export default Header;
