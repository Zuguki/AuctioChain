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
import DataInput from "./components/UI/inputs/DataInput/DataInput.tsx";
import PageAuctions from "./pages/auctions/PageAuctions.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import PageOneAuction from "./pages/auction/PageOneAuction.tsx";
import logo from './pages/auctions/ListAuctions/CardAuction/testPhoto.png'
import PageLot from "./pages/PageLot/PageLot.tsx";

function App() {
    useEffect(() => {
        fetch('http://localhost:5121/api/v1/auctions', {
            method: 'GET',
            mode: 'no-cors'
        }).then(el => console.log(el))
    }, [])

    const auction = {name: 'base_auuctio',
        userName: 'user',
        countLots: 25,
        lots: [
            {name: 'hi', img: {logo}, description: 'dffd', price: 120},
            {name: 'hi', img: {logo}, description: 'dffd', price: 120},
            {name: 'hi', img: {logo}, description: 'dffd', price: 120}
        ]}
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<>
                    <PageLot nameAuction='haha' />
                </>} />
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
