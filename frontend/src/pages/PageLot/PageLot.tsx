import React from 'react';
import imgLot from './test-lot.png';
import styleLot from './pageLot.module.css';
import BaseButton from "../../components/UI/BaseButton/BaseButton.tsx";
const PageLot = ({nameAuction}) => {
    return (
        <>
            <div className={styleLot.left}>
                <img className={styleLot.img} src={imgLot} alt='img-lot'/>
                <p className={styleLot.auxiliaryText}>Владелец: <span className={styleLot.textUser}>@user</span></p>
                <p className={styleLot.auxiliaryText}>Лот: {nameAuction}</p>
                <p className={styleLot.protectedText}>Все права защищены.</p>
            </div>
            <div className={styleLot.right}>
                <h1>Title</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque non tellus orci ac auctor. Eu nisl nunc mi ipsum faucibus vitae. Ac placerat vestibulum lectus mauris ultrices. Convallis posuere morbi leo urna molestie at elementum eu. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Dictum varius duis at consectetur lorem donec massa sapien faucibus. Massa tempor nec feugiat nisl. Auctor eu augue ut lectus arcu bibendum. Leo integer malesuada nunc vel risus. Tellus at urna condimentum mattis pellentesque id nibh tortor. Sit amet justo donec enim.</p>
                <h2>Цена на данный момент:  100000$</h2>
                <div className={styleLot.information}>
                    <p>Начальная цена: 100$</p>
                    <p>Шаг: 0.1$</p>
                    <p>Количество участников: 56</p>
                </div>
                <BaseButton>Поставить ставку</BaseButton>
            </div>
        </>
    );
};

export default PageLot;