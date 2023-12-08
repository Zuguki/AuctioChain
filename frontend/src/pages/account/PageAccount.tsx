import React, { useContext, useEffect } from 'react';
import { Context } from '../../context/context.ts';
import Hr from '../../components/UI/Hr/Hr.tsx';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import { observer } from 'mobx-react-lite';
import useGetAPI from '../../hooks/API/useGetAPI.ts';
import ProfileService from '../../API/service/ProfileService.ts';
import IProfile from '../../API/interfaces/IProfile.ts';

const PageAccount = observer(() => {
    const { userStore } = useContext(Context);
    const userData = userStore.getUser();
    const { data } = useGetAPI<IProfile>(
        () => ProfileService.getMyProfile(),
        {} as IProfile,
    );
    useEffect(() => {
        console.log(data);
    }, [data]);
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
