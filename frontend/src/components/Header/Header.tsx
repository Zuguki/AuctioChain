import React, { FC, memo, useContext } from 'react';
import styleHeader from './header.module.css';
import { Context } from '../../context/context.ts';
import { observer } from 'mobx-react-lite';
import IUser from '../../API/interfaces/IUser.ts';
import LinksHeaders from './logicHeader/LinksHeaders.tsx';
import '../../App.css';

const Header: FC = memo(
    observer(() => {
        const { userStore } = useContext(Context);
        const auth: boolean = userStore.getAuth();
        const user: IUser = userStore.getUser();
        return (
            <header className={`${styleHeader.header} noSelect`}>
                <LinksHeaders auth={auth} user={user} />
            </header>
        );
    }),
);

export default Header;
