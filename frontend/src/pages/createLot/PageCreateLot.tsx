import React from 'react';
import FormInput from '../../components/UI/inputs/FormInput/FormInput.tsx';
import FormTextArea from '../../components/UI/inputs/FormTextArea/FormTextArea.tsx';
import ImageInput from '../../components/UI/inputs/ImageInput/ImageInput.tsx';

const PageCreateLot = () => {
    return (
        <div>
            <h1>Создание лота</h1>
            <FormInput
                title="Название лота"
                name="name"
                error={}
                changeValue={}
                blurError={}
            />
            <FormTextArea
                name="description"
                title="Описание товара"
                error={}
                blurError={}
                changeValue={}
            />
            <FormInput
                title="Начальная цена (Ac)"
                name={}
                error={}
                changeValue={}
                blurError={}
            />
            <FormInput
                title="Шаг лота (Ac)"
                name="betStep"
                error={}
                changeValue={}
                blurError={}
            />
        </div>
    );
};

export default PageCreateLot;
