import React from 'react';
import styleMain from './mainPage.module.css';
import logo from '../../design/logo symbol.svg';
import CardAdvantage from './CardAdvantage.tsx';
import BaseButton from '../../components/UI/BaseButton/BaseButton.tsx';
import { Link } from 'react-router-dom';
import PathApp from '../../routes/pathApp/PathApp.ts';

const MainPage = () => {
    return (
        <div className={styleMain.position}>
            <h1 className={styleMain.title}>О нас</h1>
            <div className={styleMain.cardAbout}>
                <img className={styleMain.logo} src={logo} alt="logo" />
                <p className={styleMain.textAbout}>
                    Добро пожаловать на <b>AuctioChain</b> — онлайн-аукциона по
                    продаже физических товаров. Здесь вы найдете широкий
                    ассортимент товаров. У нас вы можете приобрести товары
                    различных категорий, от обычных вещей быта до редких
                    предметов.
                </p>
            </div>
            <h3 className={styleMain.title}>Особенности нашего аукциона:</h3>
            <div className={styleMain.cardAdvantagePosition}>
                <CardAdvantage
                    title="Огромный выбор товаров:"
                    text="Товары различной категории"
                />
                <div className={styleMain.cardAdvantageRight}>
                    <CardAdvantage
                        title="Удобство использования:"
                        text="Удобная система поиска и фильтрации товаров по категориям, цене, состоянию и другим параметрам."
                    />
                </div>
                <div className={styleMain.cardAdvantageLeft}>
                    <CardAdvantage
                        title="Реальные торги:"
                        text="Возможность участвовать в торгах и делать ставки в реальном времени."
                    />
                </div>
                <div className={styleMain.cardAdvantageRight}>
                    <CardAdvantage
                        title="Аукцион с гарантией безопасности:"
                        text="Мы обеспечиваем защиту ваших личных данных и средств благодаря конвертации ваших средств в виртуальную валюту через блокчейн"
                    />
                </div>
            </div>
            <p className={styleMain.upToAuction}>
                Начните свое путешествие в мир увлекательного шопинга уже
                сегодня!
                <br /> Регистрируйтесь на нашем аукционе, просматривайте каталог
                товаров, делайте ставки и выигрывайте!
                <br /> Удачи на торгах!
            </p>
            <Link to={PathApp.registration}>
                <BaseButton>Зарегестрируйтесь!</BaseButton>
            </Link>
        </div>
    );
};

export default MainPage;
