import { RouterProvider } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Context, stateApp } from './context/context.ts';
import CookiesLogic from './auxiliaryTools/tokenLogic/cookiesLogic.ts';
import router from './routes/router.tsx';
import MetaMaskLogic from './metamask/MetaMaskLogic.ts';

function App() {
    const { userStore } = useContext(Context);
    useEffect((): void => {
        (async (): Promise<void> => {
            console.log('reload', stateApp.getProcessAddMoney());
            const token: string | undefined = Cookies.get(CookiesLogic.TOKEN);
            const bill: string | undefined = Cookies.get(CookiesLogic.BILL);
            token && userStore.setAuthByToken(token);
            bill && userStore.setBill(bill);
            if (stateApp.getProcessAddMoney()) {
                const balance = await MetaMaskLogic.getUserMoney();
                stateApp.setProcessAddMoney(false);
                if (balance) {
                    Cookies.set(CookiesLogic.ADD_BALANCE, String(balance));
                }
            }
        })();
    }, []);

    return (
        <Context.Provider value={{ userStore, stateApp }}>
            <RouterProvider router={router} />
        </Context.Provider>
    );
}

export default App;
