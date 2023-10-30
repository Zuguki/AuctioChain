import FormInput from "./components/UI/inputs/FormInput/FormInput.tsx";
import BaseInput from "./components/UI/inputs/BaseInput/BaseInput.tsx";
import FormTextArea from "./components/UI/inputs/FormTextArea/FormTextArea.tsx";
import DataInput from "./components/UI/inputs/DataInput/DataInput.tsx";
import BaseButton from "./components/UI/BaseButton/BaseButton.tsx";
import React, {ChangeEvent, useEffect, useState} from "react";
import ImageInput from "./components/UI/inputs/ImageInput/ImageInput.tsx";
import Tag from "./components/UI/Tag/Tag.tsx";
import FormDiv from "./components/UI/FormDiv/FormDiv.tsx";
import FormRegistration from "./pages/registration/FormRegistration.tsx";


function App() {
    const [actio, setActio] = useState({
        name: '',
        description: '',
        price: 0,
        data: '',
        step: 0,
        image: ''
    });
    const [tags, setTags] = useState<string []>([]);
    const changeActio = (data: ChangeEvent<HTMLInputElement>): void => {
        const reader = new FileReader();
        let {name, value} = data.target;
        setActio(prevState => ({...prevState, [name]: value}))
    }

    const addTags = (tag) => {
        setTags((prevTags) => [...prevTags, tag.target.value])
    }

    useEffect(() => {
        console.log(tags)
    }, [tags])


     useEffect(() => {
        console.log(actio)
     }, [actio])

    return (
        <>
            <FormRegistration />

        {/*<ImageInput name="image" changeValue={changeActio} />
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
            <input type="file" name="image" onChange={changeActio} accept="image/jpeg,image/png" />
            <div style={{padding: 20}}></div>
            <div style={{display: "inline-block"}}>


            </div>
            <div style={{padding: 20}}></div>

            <img src={actio.image} />
            <div style={{padding: 20}}></div>
            <BaseButton>Создать аукцион</BaseButton>
        </div>*/}
            </>
    )
}

export default App
