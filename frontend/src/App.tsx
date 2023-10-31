import FormRecoverCode from "./pages/authorization/FormRecoverCode.tsx";
import FormNewPassword from "./pages/authorization/FormNewPassword/FormNewPassword.tsx";
import CardRequirementsPassword from "./pages/authorization/CardRequirementsPassword/CardRequirementsPassword.tsx";
import FormRegistration from "./pages/authorization/FormRegistration/FormRegistration.tsx";


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
            <FormNewPassword />
        </>
    )
}

export default App
