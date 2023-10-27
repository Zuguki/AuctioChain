import FormInput from "./components/UI/inputs/FormInput/FormInput.tsx";
import BaseInput from "./components/UI/inputs/BaseInput/BaseInput.tsx";
import FormTextArea from "./components/UI/inputs/FormTextArea/FormTextArea.tsx";

function App() {

    return (
        <>


            <FormInput name="description" changeValue={() => ({})} />
            <BaseInput name='fdfd' changeValue={() => ({})} />
            <FormTextArea name="descr" changeValue={() => ({})}/>
        </>
    )
}

export default App
