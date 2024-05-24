import styles from "./mainPage.module.css";
import IconBackground from "@/pages/main/iconBack/IconBackground.tsx";
import plant from "../../design/mainBackground/plant.svg";
import HorizontalBlock from "@/pages/main/blockInfo/horizontalBlock/HorizontalBlock.tsx";
import VerticalBlock from "@/pages/main/blockInfo/verticalBlock/VerticalBlock.tsx";
import { Link } from "react-router-dom";
import PathApp from "@/routes/pathApp/PathApp.ts";
import BaseButton from "@/components/UI/BaseButton/BaseButton.tsx";

const MainPage = () => {
    return (
        <div>
            <div className={styles.blockTitle}>
                <IconBackground src={plant} />
                <h1 className={styles.title}>AuctioChain</h1>
                <h4 className={styles.infoTitle}>
                    Биржа аукционов с Web3 кошельком
                </h4>
            </div>
            <div className={styles.positionHorizontal}>
                <HorizontalBlock
                    title="Огромный выбор товаров"
                    animation="fade-right"
                    description="Мы гордимся огромным разнообразием товаров различных категорий, которые доступны на наших торгах. Независимо от ваших интересов или потребностей, вы обязательно найдете что-то подходящее среди нашего широкого ассортимента. Мы постоянно обновляем наш ассортимент, чтобы предложить вам самые актуальные и востребованные товары!"
                />
                <div className={styles.positionVertical}>
                    <VerticalBlock
                        title="Реальные торги"
                        description="Присоединяйтесь к нашим торгам и откройте для себя мир увлекательных возможностей! У нас вы найдете разнообразные товары и услуги: антиквариат, искусство, технику, коллекционные предметы. Участвуйте и делайте ставки для приобретения желаемых предметов по лучшим ценам!"
                        animation="fade-right"
                    />
                    <VerticalBlock
                        title="Удобство использования"
                        description="Мы предоставляем удобную платформу, где легко просматривать доступные лоты, следить за ставками и делать предложения. Наш процесс торгов прозрачен и основан на честной конкуренции. Присоединяйтесь к нам сегодня и погрузитесь в захватывающий мир реальных торгов!"
                        animation="fade-left"
                    />
                </div>
                <HorizontalBlock
                    title="Аукцион с гарантией безопасности"
                    animation="fade-left"
                    description="Кроме того, наша система обеспечивает надежную защиту ваших личных данных и средств путем конвертации ваших финансовых средств в виртуальную валюту через блокчейн. Это обеспечивает безопасность вашей финансовой информации и делает процесс торгов еще более безопасным и удобным для вас!"
                />
            </div>
            <div className={styles.positionInfo}>
                <Link to={PathApp.registration}>
                    <BaseButton>Зарегестрируйтесь!</BaseButton>
                </Link>
            </div>
        </div>
        /*<div className={styleMain.position}>
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
                        text="Мы обеспечиваем защиту ваших личных данных и средств благодаря конвертации ваших средств в виртуальную валюту через блокчейн."
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
        </div>*/
    );
};

export default MainPage;
