import BaseButton from "./components/UI/BaseButton/BaseButton.tsx";

function App() {
  console.log(document.documentElement.clientHeight)
  console.log(document.documentElement.clientWidth)
  return (
    <>
      <p>Lolo</p>
      <BaseButton onClick={() => console.log('button')}>Создать аукцион</BaseButton>
    </>
  )
}

export default App
