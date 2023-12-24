import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Context } from '../context/context.ts';
import Cookies from 'js-cookie';
import { observer } from 'mobx-react-lite';

const MetaMask = observer(() => {
    const { stateApp } = useContext(Context);
    const [cash, setCash] = useState<number>();
    const addCash = (e: ChangeEvent<HTMLInputElement>) => {};
    useEffect(() => {
        const billCookie = Cookies.get('bill');
        if (billCookie) {
            stateApp.setBill(billCookie);
        }
    }, []);
    const contractAddress = '0x524043c049c5bDEdEB9A6014bc11Db4cA9dBDBD0';
    const contractABI = [
        {
            inputs: [],
            name: 'payForItem',
            outputs: [],
            stateMutability: 'payable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'userAddress',
                    type: 'address',
                },
            ],
            name: 'removeUserFromMap',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            stateMutability: 'nonpayable',
            type: 'constructor',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'userAddress',
                    type: 'address',
                },
            ],
            name: 'getUserBalance',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'result',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            name: 'payments',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
    ];
    // const providerSepolia = ethers.getDefaultProvider("sepolia", "9e6600e9937341278c03daeea0781dda");
    // открытие метамаска
    const web3Provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        web3Provider,
    );

    // подключить кошлек к сайту типо кнопки
    async function handleClickMetamask() {
        try {
            const address = await web3Provider.send('eth_requestAccounts', []);
            stateApp.setBill(address[0]);
            Cookies.set('bill', address[0]);
        } catch (e) {
            alert(e);
            console.log(e);
            return;
        }
    }

    // отправка денег
    async function sendEth() {
        try {
            const address = await web3Provider.send('eth_requestAccounts', []);
            console.log(address);
            console.log(Cookies.get('bill'));
            if (address[0] !== Cookies.get('bill')) {
                alert('Кошлек не соот');
                return;
            }
            const signer = await web3Provider.getSigner();

            const contractWithSigner = contract.connect(signer);
            await contractWithSigner
                .getFunction('payForItem')
                .send({ value: ethers.parseEther('0.00000001') }); // количество денег
            console.log('Success');
        } catch (error) {
            alert('Ошибка транзакции!');
        }
    }

    // деньги перевода проверять на пополнение
    async function getUserMoney() {
        try {
            const signer = await web3Provider.getSigner();
            const balance = await contract.getUserBalance(signer.address);
            console.log(`Balance: ${balance}`);
            console.log('Success');
        } catch (error) {
            console.error(error);
        }
    }

    // не используем
    async function removeUserFromMap() {
        try {
            const signer = await web3Provider.getSigner();
            const contractWithSigner = contract.connect(signer);
            await contractWithSigner
                .getFunction('payForItem')
                .call(signer.address);
            console.log('Success');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="App">
            <input type="number" onChange={e => addCash(e)} />
            <div>
                <button onClick={sendEth}>Send Eth</button>
            </div>
            <div>
                <button onClick={getUserMoney}>Get User Balance</button>
            </div>
            <div>
                <button onClick={removeUserFromMap}>
                    Remove User From HashMap
                </button>
            </div>
        </div>
    );
});
export default MetaMask;
