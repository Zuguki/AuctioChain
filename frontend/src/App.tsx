import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Context, stateApp, userStore } from './context/context.ts';
import TokenLogic from './auxiliaryTools/tokenLogic/tokenLogic.ts';
import router from './routes/router.tsx';

function App() {
    useEffect((): void => {
        const token: string | undefined = Cookies.get(TokenLogic.TOKEN);
        if (token) {
            userStore.setAuthByToken(token);
        }
    }, []);

    return (
        <Context.Provider value={{ userStore, stateApp }}>
            <RouterProvider router={router} />
        </Context.Provider>
    );
}

export default App;
