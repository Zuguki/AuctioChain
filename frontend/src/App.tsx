import { RouterProvider } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Context, stateApp } from './context/context.ts';
import CookiesLogic from './auxiliaryTools/tokenLogic/cookiesLogic.ts';
import router from './routes/router.tsx';

function App() {
    const { userStore } = useContext(Context);
    useEffect((): void => {
        const token: string | undefined = Cookies.get(CookiesLogic.TOKEN);
        const bill: string | undefined = Cookies.get(CookiesLogic.BILL);
        token && userStore.setAuthByToken(token);
        bill && userStore.setBill(bill);
    }, []);

    return (
        <Context.Provider value={{ userStore, stateApp }}>
            <RouterProvider router={router} />
        </Context.Provider>
    );
}

export default App;
