import React from 'react';
import FormInput from '../../components/UI/inputs/FormInput/FormInput.tsx';
import FormTextArea from '../../components/UI/inputs/FormTextArea/FormTextArea.tsx';

const PageCreateLot = () => {
    return (
        <div>
            <h1>Создание лота</h1>
            <FormInput
                title="Название лота"
                name="name"
                error={null}
                changeValue={() => {}}
                errorBlur={() => {}}
            />
            <FormTextArea
                name="description"
                title="Описание товара"
                error={null}
                blurError={() => {}}
                changeValue={() => {}}
            />
            {/*<FormInput
                title="Начальная цена (Ac)"
                name=
                error={null}
                changeValue={}
                errorBlur={}
            />
            <FormInput
                title="Шаг лота (Ac)"
                name="betStep"
                error={}
                changeValue={}
                errorBlur={}
            />*/}
        </div>
    );
};

export default PageCreateLot;
