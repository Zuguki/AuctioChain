import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import PageAuctions from "./pages/auctions/PageAuctions.tsx";
import PageOneAuction from "./pages/auction/PageOneAuction.tsx";
import PageLot from "./pages/lot/PageLot.tsx";
import CloseButton from "./components/UI/CloseButton/CloseButton.tsx";
import UserStore from "./authorizationLogic/userStore.ts";
import {createContext, useEffect} from "react";
import FormAuthorization from "./pages/authorization/FormAuthorization/FormAuthorization.tsx";
import FormRegistration from "./pages/authorization/FormRegistration/FormRegistration.tsx";
import Cookies from "js-cookie";
import {Context, userStore} from "./context/contextApp.ts";
import TokenLogic from "./tokenLogic/tokenLogic.ts";

function App() {
    useEffect(() => {
        const token =  Cookies.get(TokenLogic.TOKEN);
        if (token) {
            userStore.setAuthByToken(token);
        }
    }, []);

    return (
        <Context.Provider value={{userStore}}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={
                        <Link to='/authorization'>
                            <button>click</button>
                        </Link>
                    }/>
                    <Route path='/authorization' element={<FormAuthorization />} />
                    <Route path='/authorization/registration' element={<FormRegistration />} />
                    <Route path='/auctions' element={<PageAuctions />} />
                    <Route path='/auction/:id' element={<PageOneAuction />} />
                    <Route path='/lot/:id' element={<PageLot />} />
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    )
}

export default App
