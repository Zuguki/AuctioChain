import { ethers } from 'ethers';
import { userStore } from '../context/context.ts';
import LocalStorageLogic from '../auxiliaryTools/localStorageLogic/LocalStorageLogic.ts';

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
    public static async handleClickMetamask(): Promise<void> {
        try {
            const [address] = await MetaMaskLogic.web3Provider.send(
                'eth_requestAccounts',
                [],
            );
            userStore.setBill(address);
            LocalStorageLogic.setToStorage(LocalStorageLogic.BILL, address);
        } catch (e) {
            alert('He удалось подключить кошлёк!');
            console.log(e);
        }
    }

    // отправка денег
    public static async sendEth(eph: string) {
        try {
            const billUser: string = userStore.getBill();
            if (!billUser) {
                alert('Кошлек не подключён к сайту!');
                return;
            }
            const [address] = await MetaMaskLogic.web3Provider.send(
                'eth_requestAccounts',
                [],
            );
            console.log('addr', address);
            console.log(billUser);
            if (address !== billUser) {
                alert(
                    'Невозможно выполнить транзакцию! Проверьте номер кошлека в MetaMask!',
                );
                return;
            }

            const signer = await MetaMaskLogic.web3Provider.getSigner();
            const contractWithSigner = MetaMaskLogic.contract.connect(signer);
            await contractWithSigner
                .getFunction('payForItem')
                .send({ value: ethers.parseEther(eph) }); // количество денег
            return await this.getUserMoney();
        } catch (error) {
            console.log(JSON.stringify(error, null, 4));
            alert(`Ошибка транзакции! ${error?.info?.error?.message || ''}`);
            return;
        }
    }

    // деньги перевода проверять на пополнение
    public static async getUserMoney(): Promise<number | void> {
        return new Promise(resolve => {
            const requestBalance = setInterval(async () => {
                const balance = await this.requestUserMoney();
                if (balance === undefined) {
                    alert('Ошибка транзакции!');
                    return;
                }
                let localBalance: string | number =
                    LocalStorageLogic.getToStorage(LocalStorageLogic.BALANCE);
                if (!localBalance) {
                    LocalStorageLogic.setToStorage(
                        LocalStorageLogic.BALANCE,
                        balance,
                    );
                    localBalance = balance;
                } else {
                    localBalance = +localBalance;
                }
                console.log('b', balance);
                console.log('cb', localBalance);
                if (balance !== localBalance) {
                    console.log('prevBalance', localBalance);
                    LocalStorageLogic.setToStorage(
                        LocalStorageLogic.BALANCE,
                        balance,
                    );
                    clearInterval(requestBalance);
                    console.log('bal', balance);
                    resolve(Number(balance - localBalance) / Math.pow(10, 18));
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
