import { RouterProvider } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/context.ts';
import router from './routes/router.tsx';
import useApp from './hooks/useApp.ts';

function App() {
    const { userStore, stateApp } = useContext(Context);
    useApp();
    return (
        <Context.Provider value={{ userStore, stateApp }}>
            <RouterProvider router={router} />
        </Context.Provider>
    );
}

export default App;
