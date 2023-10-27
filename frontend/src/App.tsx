import FormInput from "./components/UI/inputs/FormInput/FormInput.tsx";
import BaseInput from "./components/UI/inputs/BaseInput/BaseInput.tsx";
import FormTextArea from "./components/UI/inputs/FormTextArea/FormTextArea.tsx";
import DataInput from "./components/UI/inputs/DataInput/DataInput.tsx";
import BaseButton from "./components/UI/BaseButton/BaseButton.tsx";
import {ChangeEvent, useState} from "react";

function App() {
    const [actio, setActio] = useState({
        name: '',
        description: '',
        price: 0,
        data: '',
        step: 0
    });
    const changeActio = (data: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = data.target;
        setActio(prevActio => ({...prevActio, [name]: value }));
        console.log(actio)
    }

    return (
        <div style={{padding: 30}}>
            <h1>Создание аукциона</h1>
            <p>Название аукциона</p>
            <FormInput name="name" changeValue={changeActio} />
            <p>Описание товара</p>
            <FormTextArea name="description" changeValue={changeActio} />
            <p>Начальная цена (₽)</p>
            <FormInput name="price" type="number" changeValue={changeActio} width="small"/>
            <p>Дата окончания</p>
            <DataInput name="data" changeValue={changeActio}/>
            <p>Шаг аукциона</p>
            <FormInput name="step" type="number" changeValue={changeActio} width="small"/>
            <div style={{padding: 20}}></div>
            <BaseButton>Создать аукцион</BaseButton>
        </div>
    )
}

export default App
