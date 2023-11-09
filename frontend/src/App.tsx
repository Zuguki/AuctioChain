import {BrowserRouter, Link, NavLink, Route, Routes} from "react-router-dom";
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
import DataInput from "./components/UI/inputs/DataInput/DataInput.tsx";
import PageAuctions from "./pages/auctions/PageAuctions.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import PageOneAuction from "./pages/auction/PageOneAuction.tsx";
import logo from './pages/auctions/ListAuctions/CardAuction/testPhoto.png'

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Link to='/auctions'><button>click</button></Link>}/>
                <Route path='/auctions' element={<PageAuctions />} />
                <Route path='/auction/:id' element={<PageOneAuction />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
