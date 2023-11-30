import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { ContextUser, userStore } from './context/contextUser.ts';
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
        <ContextUser.Provider value={{ userStore }}>
            <RouterProvider router={router} />
        </ContextUser.Provider>
    );
}

export default App;
