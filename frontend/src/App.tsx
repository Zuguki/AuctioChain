import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import FormAuthorization from "./pages/authorization/FormAuthorization/FormAuthorization.tsx";
import FormRegistration from "./pages/authorization/FormRegistration/FormRegistration.tsx";
import FormRecoveryEntry from "./pages/authorization/FormRecoveryEntry.tsx";
import FormRecoverCode from "./pages/authorization/FormRecoverCode.tsx";
import FormNewPassword from "./pages/authorization/FormNewPassword/FormNewPassword.tsx";
import Header from "./components/Header/Header.tsx";
import CardAuction from "./pages/auctions/ListAuctions/CardAuction/CardAuction.tsx";
import ListAuctions from "./pages/auctions/ListAuctions/ListAuctions.tsx";
import Pagination from "./components/UI/Pagination/Pagination.tsx";
import SearcherAuction from "./pages/auctions/SearcherAuction/SearcherAuction.tsx";


function App() {
    return (
        <BrowserRouter>
            <Header />
            {/*<div style={{margin: 150}}>
                <CardAuction />
                <CardAuction />
                <CardAuction />
                <CardAuction />
                <CardAuction />
                <CardAuction />
            </div>=*/}
            <Routes>
                <Route path='/' element={<div style={{marginLeft: 150, marginRight: 150}}>
                    <h1>Список аукционов</h1>
                    <SearcherAuction />
                    <ListAuctions />
                </div>} />
                <Route path='/authorization' element={<FormAuthorization />} />
                <Route path='/authorization/registration' element={<FormRegistration />} />
                <Route path='/authorization/recovery' element={<FormRecoveryEntry />} />
                <Route path='/authorization/recovery/code' element={<FormRecoverCode />} />
                <Route path='/authorization/recovery/newPassword' element={<FormNewPassword />} />
            </Routes>
            <Routes>
                <Route path='/test' element={<p>test</p>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
