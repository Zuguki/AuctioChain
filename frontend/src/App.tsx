import FormInput from "./components/UI/inputs/FormInput/FormInput.tsx";
import BaseInput from "./components/UI/inputs/BaseInput/BaseInput.tsx";
import FormTextArea from "./components/UI/inputs/FormTextArea/FormTextArea.tsx";
import DataInput from "./components/UI/inputs/DataInput/DataInput.tsx";
import BaseButton from "./components/UI/BaseButton/BaseButton.tsx";
import React, {ChangeEvent, useEffect, useState} from "react";
import ImageInput from "./components/UI/inputs/ImageInput/ImageInput.tsx";
import Tag from "./components/UI/Tag/Tag.tsx";
import FormDiv from "./components/UI/FormDiv/FormDiv.tsx";
import FormAuthorization from "./pages/authorization/FormAuthorization/FormAuthorization.tsx";
import FormRegistration from "./pages/authorization/FormRegistration/FormRegistration.tsx";
import FormRecoverCode from "./pages/authorization/FormRecoverCode.tsx";


function App() {
   /* const [actio, setActio] = useState({
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
     }, [actio])*/

    return (
        <>
            <FormRecoverCode />
        </>
    )
}

export default App
