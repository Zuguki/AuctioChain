import React, { useContext } from 'react';
import { Context } from '../../context/context.ts';
import Hr from '../../components/UI/Hr/Hr.tsx';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import { observer } from 'mobx-react-lite';

const PageAccount = observer(() => {
    const { userStore } = useContext(Context);
    const userData = userStore.getUser();
    return (
        <div>
            <div>
                <h1>Аккаунт</h1>
                <h3>@{userData.name}</h3>
                <h3>123 Ac</h3>
                <BaseButton>Пополнить счёт</BaseButton>
                <Hr />
            </div>
        </div>
    );
});

export default PageAccount;
