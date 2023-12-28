import { RouterProvider } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Context } from './context/context.ts';
import TokenLogic from './auxiliaryTools/tokenLogic/TokenLogic.ts';
import router from './routes/router.tsx';
import MetaMaskLogic from './metamask/MetaMaskLogic.ts';
import LocalStorageLogic from './auxiliaryTools/localStorageLogic/LocalStorageLogic.ts';

function App() {
    const { userStore, stateApp } = useContext(Context);
    useEffect((): void => {
        (async (): Promise<void> => {
            const process =
                LocalStorageLogic.getToStorage(
                    LocalStorageLogic.PROCESS_ADD_MONEY,
                ).toLowerCase() === 'true';
            const token: string | undefined = Cookies.get(TokenLogic.TOKEN);
            const bill: string = LocalStorageLogic.getToStorage(
                LocalStorageLogic.BILL,
            );
            token && userStore.setAuthByToken(token);
            bill && userStore.setBill(bill);
            if (process) {
                stateApp.setNotification(process);
                const balance = await MetaMaskLogic.getUserMoney();
                LocalStorageLogic.setToStorage(
                    LocalStorageLogic.PROCESS_ADD_MONEY,
                    false,
                );
                if (balance) {
                    LocalStorageLogic.setToStorage(
                        LocalStorageLogic.ADD_BALANCE,
                        balance,
                    );
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
