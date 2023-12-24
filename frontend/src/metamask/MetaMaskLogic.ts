import { ethers } from 'ethers';
import Cookies from 'js-cookie';
import { userStore } from '../context/context.ts';
import CookiesLogic from '../auxiliaryTools/tokenLogic/cookiesLogic.ts';

export default class MetaMaskLogic {
    private static contractAddress: string =
        '0x524043c049c5bDEdEB9A6014bc11Db4cA9dBDBD0';
    private static contractABI = [
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
    // открытие метамаска
    private static web3Provider = new ethers.BrowserProvider(window.ethereum);
    private static contract = new ethers.Contract(
        MetaMaskLogic.contractAddress,
        MetaMaskLogic.contractABI,
        MetaMaskLogic.web3Provider,
    );

    // подключить кошлек к сайту типо кнопки
    public static async handleClickMetamask(): Promise<string> {
        try {
            const [address] = await MetaMaskLogic.web3Provider.send(
                'eth_requestAccounts',
                [],
            );
            userStore.setBill(address);
            Cookies.set(CookiesLogic.BILL, address);
            return address;
        } catch (e) {
            alert(e);
            console.log(e);
            return '';
        }
    }

    // отправка денег
    public static async sendEth(eph: string) {
        try {
            const [address] = await MetaMaskLogic.web3Provider.send(
                'eth_requestAccounts',
                [],
            );
            console.log(address);
            console.log(Cookies.get('bill'));
            if (address !== Cookies.get('bill')) {
                alert('Кошлек не соот');
                return;
            }
            const signer = await MetaMaskLogic.web3Provider.getSigner();

            const contractWithSigner = MetaMaskLogic.contract.connect(signer);
            await contractWithSigner
                .getFunction('payForItem')
                .send({ value: ethers.parseEther(eph) }); // количество денег
            return await this.getUserMoney();
        } catch (error) {
            alert('Ошибка транзакции!');
        }
    }

    // деньги перевода проверять на пополнение
    public static async getUserMoney(): Promise<number | void> {
        return new Promise(resolve => {
            const requestBalance = setInterval(async () => {
                const balance = await this.requestUserMoney();
                const cookieBalance = +Cookies.get(CookiesLogic.BALANCE);
                console.log('b', balance);
                console.log('cb', cookieBalance);
                if (balance !== cookieBalance) {
                    console.log('prevBalance', cookieBalance);
                    Cookies.set(CookiesLogic.BALANCE, balance);
                    clearInterval(requestBalance);
                    console.log('bal', balance);
                    resolve(Number(balance - cookieBalance) / Math.pow(10, 18));
                }
            }, 1_000);
        });
    }

    private static async requestUserMoney() {
        try {
            const signer = await MetaMaskLogic.web3Provider.getSigner();
            const balance = await MetaMaskLogic.contract.getUserBalance(
                signer.address,
            );
            return Number(balance);
        } catch (e) {
            console.log('requestUserMoney err');
        }
    }

    // не используем
    /* public static async removeUserFromMap() {
         try {
             const signer = await MetaMaskLogic.web3Provider.getSigner();
             const contractWithSigner = MetaMaskLogic.contract.connect(signer);
             await contractWithSigner
                 .getFunction('payForItem')
                 .call(signer.address);
             console.log('Success');
         } catch (error) {
             console.error(error);
         }
     }*/
}
