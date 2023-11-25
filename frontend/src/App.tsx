import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Context, userStore } from './context/contextApp.ts';
import TokenLogic from './auxiliaryTools/tokenLogic/tokenLogic.ts';
import router from './routes/router.tsx';

function App() {
    useEffect(() => {
        const token = Cookies.get(TokenLogic.TOKEN);
        if (token) {
            userStore.setAuthByToken(token);
        }
    }, []);

    return (
        <Context.Provider value={{ userStore }}>
            <RouterProvider router={router} />
        </Context.Provider>
    );
}

export default App;
